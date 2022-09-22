import { useContext, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

import Input from "./Input";
import Button from "../ui/Button";
import { ProductsContext } from "../../store/products-context";
import { storeProduct, updateProduct, deleteProduct } from "../../util/http";

function ProductForm({ defaultValues, navigation }) {
  const productsCtx = useContext(ProductsContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
    image: {
      value: defaultValues ? defaultValues.image : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const productData = {
      amount: +inputs.amount.value,
      description: inputs.description.value,
      image: inputs.image.value,
    };

    const amountIsValid = !isNaN(productData.amount) && productData.amount > 0;
    const descriptionIsValid = productData.description.trim().length > 0;
    const imageIsValid = productData.image.trim().length > 0;

    if (!amountIsValid || !imageIsValid || !descriptionIsValid) {
      // Alert.alert('Invalid input', 'Please check your input values');
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
          image: {
            value: curInputs.image.value,
            isValid: imageIsValid,
          },
        };
      });
      return;
    }
    console.log("Entrando na confirmação");
    confirmHandler(productData);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(productData) {
    setIsSubmitting(true);
    try {
      console.log("Salvando Produto");
        const id = await storeProduct(productData);
        console.log(id);
        productsCtx.addProduct({ ...productData, id: id });
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Novo Produto</Text>
      <View style={styles.inputContainer}>
        <Input
          label="Descrição"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
        />
        <Input
          label="Preço"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Imagem"
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "image"),
            value: inputs.image.value,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="flat" onPress={cancelHandler}>
            Cancelar
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} onPress={submitHandler}>
            Cadastrar
          </Button>
        </View>
      </View>
    </View>
  );
}

export default ProductForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
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
  errorText: {
    textAlign: "center",
    color: "##a11717",
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  buttonContainer: {
    margin: 10,
    width: 150,
  },
});
