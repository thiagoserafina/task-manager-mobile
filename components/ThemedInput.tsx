import { StyleSheet, TextInput, type TextInputProps } from "react-native";

export function ThemedTextInput({ style, ...rest }: TextInputProps) {
  return <TextInput style={[style, styles.default]} {...rest} />;
}

const styles = StyleSheet.create({
  default: {
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    color: "white",
  },
});
