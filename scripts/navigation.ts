import { Href, router } from 'expo-router';
import { InteractionManager } from 'react-native';
import { delay } from './utils';

interface NavigationParams {
  show: () => void;
  hide: () => void;
  logic?: () => void | Promise<void>;
}

export const ANIMATION_DURATION = 500;

export async function navigate(
  route: Href,
  { show, hide, logic = () => delay(10) }: NavigationParams
) {
  show();
  await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION));

  let result = logic();
  router.navigate(route);

  function _hide() {
    hide();
  }

  InteractionManager.runAfterInteractions(() =>
    setTimeout(() => (result ? result.then(_hide) : _hide()), 100)
  );
}
