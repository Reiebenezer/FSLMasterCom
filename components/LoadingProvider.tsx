import defaultLevels from "@/scripts/level-data";
import { Level } from "@/scripts/level-schema";
import { Storage } from "expo-sqlite/kv-store";
import { useContext as _useContext, createContext, ReactNode, useCallback, useState } from "react";

const context = createContext<{
  show(): void;
  hide(): void;
  readonly visible: boolean;
  readonly levels: Map<number, Level>;
  updateLevels(): void;
  fetchLevelsFromDatabase(): void;
  updateLevelDatabase(): void;
  resetLevelDatabase(): void;
}>({
  show() { },
  hide() { },
  visible: false,
  levels: new Map(),
  updateLevels() { },
  fetchLevelsFromDatabase() { },
  updateLevelDatabase() { },
  resetLevelDatabase() { },
});

export default function LoadingProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(false);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  const [levels, setLevels] = useState(new Map<number, Level>(
    defaultLevels.map((d) => [d.id, d])
  ));

  const updateLevels = useCallback(() => {
    setLevels(new Map(levels));
  }, [levels]);

  const fetchLevelsFromDatabase = useCallback(() => {
    for (const level of JSON.parse(Storage.getItemSync('userLevels') ?? '[]') as Level[]) {
      levels.set(level.id, level);
    }
  }, [levels])

  const updateLevelDatabase = useCallback(() => {
    Storage.setItemSync('userLevels', JSON.stringify([...levels.values()]));
  }, [levels])

  const resetLevelDatabase = useCallback(() => {
    levels?.forEach((level) => {
      level.questions.forEach((q) => (q.completed = false));
      level.completed = false;
    });

    updateLevelDatabase();
    Storage.removeItemSync('completedTutorial');
  }, [levels]);

  return (
    <context.Provider value={{ show, hide, visible, levels, updateLevels, fetchLevelsFromDatabase, updateLevelDatabase, resetLevelDatabase }}>
      {children}
    </context.Provider>
  )
}

export const useContext = () => _useContext(context);