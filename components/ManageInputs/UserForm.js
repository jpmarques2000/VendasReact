import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../ui/Button";

import InputData from "./InputData";

function UserForm({ headerTitle, onCancel, onSubmit, defaultValues }) {
  const [inputs, setInputs] = useState({
    name: {
      value: defaultValues ? defaultValues.name : "",
      isValid: true,
    },
    email: {
      value: defaultValues ? defaultValues.email : "",
      isValid: true,
    },
    contact: {
      value: defaultValues ? defaultValues.contact : "",
      isValid: true,
    },
    street: {
      value: defaultValues ? defaultValues.street : "",
      isValid: true,
    },
    district: {
      value: defaultValues ? defaultValues.district : "",
      isValid: true,
    },
    cep: {
      value: defaultValues ? defaultValues.cep : "",
      isValid: true,
    },
    userId: {
      value: "",
    },
  });

  const [userUid, setUserUid] = useState();

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        setUserUid(storedToken);
      }
    }
    fetchToken();
  }, []);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function cleanScreen() {
    setInputs(() => {
      return {
        ["name"]: { value: "", isValid: true },
        ["email"]: { value: "", isValid: true },
        ["contact"]: { value: "", isValid: true },
        ["street"]: { value: "", isValid: true },
        ["district"]: { value: "", isValid: true },
        ["cep"]: { value: "", isValid: true },
      };
    });
    onCancel();
  }
  function submitHandler() {
    console.log(userUid);

    const userData = {
      name: +inputs.name.value,
      email: inputs.email.value,
      contact: inputs.contact.value,
      street: +inputs.street.value,
      district: inputs.district.value,
      cep: inputs.cep.value,
      token: userUid,
    };

    const nameIsValid = userData.name.length > 0;
    const emailIsValid = userData.email.length > 8;
    const contactIsValid = !isNaN(userData.contact) && userData.contact > 0;
    const streetIsValid = userData.street.length > 5;
    const districtIsValid = userData.district.length > 5;
    const cepIsValid = !isNaN(userData.cep) && userData.cep > 0;

    if (
      !nameIsValid ||
      !emailIsValid ||
      !contactIsValid ||
      !streetIsValid ||
      !districtIsValid ||
      !cepIsValid
    ) {
      setInputs((curInputs) => {
        return {
          name: { value: curInputs.name.value, isValid: nameIsValid },
          email: {
            value: curInputs.email.value,
            isValid: emailIsValid,
          },
          contact: {
            value: curInputs.contact.value,
            isValid: contactIsValid,
          },
          street: {
            value: curInputs.street.value,
            isValid: streetIsValid,
          },
          district: {
            value: curInputs.district.value,
            isValid: districtIsValid,
          },
          cep: {
            value: curInputs.cep.value,
            isValid: cepIsValid,
          },
          userId: {
            value: userUid,
          },
        };
      });
      return;
    }
    onSubmit(userData);
  }

  const formIsInvalid =
    !inputs.name.isValid ||
    !inputs.email.isValid ||
    !inputs.contact.isValid ||
    !inputs.street.isValid ||
    !inputs.district.isValid ||
    !inputs.cep.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{headerTitle}</Text>
      <View style={styles.inputContainer}>
        <InputData
          label="Nome"
          invalid={!inputs.name.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "name"),
            value: inputs.name.value,
          }}
        />
        <InputData
          label="Email"
          invalid={!inputs.email.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "email"),
            value: inputs.email.value,
          }}
        />
        <InputData
          label="Telefone"
          invalid={!inputs.contact.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "contact"),
            value: inputs.contact.value,
          }}
        />
        <InputData
          label="Rua"
          invalid={!inputs.street.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "street"),
            value: inputs.street.value,
          }}
        />
        <InputData
          label="Bairro"
          invalid={!inputs.district.isValid}
          textInputConfig={{
            onChangeText: inputChangedHandler.bind(this, "district"),
            value: inputs.district.value,
          }}
        />
        <InputData
          label="Cep"
          invalid={!inputs.cep.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "cep"),
            value: inputs.cep.value,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="flat" onPress={cleanScreen}>
            Cancelar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={submitHandler}>
            Atualizar
          </Button>
        </View>
      </View>
    </View>
  );
}

export default UserForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 12,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 5,
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 4,
  },
  buttonContainer: {
    margin: 20,
    width: 150,
  },
});
