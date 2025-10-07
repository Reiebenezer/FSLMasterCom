import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

export default function Button(props: TouchableOpacityProps & { colors?: LinearGradient['props']['colors']; gradientClassName?: string }) {
  let colors: LinearGradient['props']['colors'] = 
    props.disabled
      ? ['#888', '#ccc']
      : props.colors ?? ["#9d2b2b", "#fd7f2e"];

  return (
    <TouchableOpacity {...props} className={`overflow-hidden ${props.className}`}>
      <LinearGradient className={`px-6 py-3 ${props.gradientClassName}`} colors={colors}>
        {props.children}
      </LinearGradient>
    </TouchableOpacity>
  )
}