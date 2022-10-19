import { StyleSheet, Text, TextInput, View } from "react-native";

function Input({ label, invalid, style, textInputConfig }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 18,
    color: "##082046",
    marginBottom: 4,
    marginLeft: 25,
  },
  input: {
    paddingVertical: 6,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#f53c3c",
    fontSize: 14,
    marginLeft: 25,
    marginRight: 25,
  },
  inputMultiline: {
    minHeight: 40,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "#red",
  },
  invalidInput: {
    backgroundColor: "#red",
  },
});
