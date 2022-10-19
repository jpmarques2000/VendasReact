import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Alert } from "react-native";

import InputData from "./InputData";
import Button from "../ui/Button";
import { ProductsContext } from "../../store/products-context";

function ProductForm({
  headerTitle,
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}) {
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

  const [previewImage, setPreviewImage] = useState({
    imagePreview: {
      value:
        "https://www.karendominique.com/wp-content/uploads/2016/12/Nothing-to-Display.png",
    },
  });

  function previewHandler() {
    if (inputs.image.value === "") {
      Alert.alert(
        "Falha ao carregar imagem",
        "Favor adicionar o endereço de imagem correto antes de visualizar preview"
      );
    } else {
      setPreviewImage(() => {
        return {
          ["imagePreview"]: { value: inputs.image.value },
        };
      });
    }
  }

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
        ["amount"]: { value: "", isValid: true },
        ["description"]: { value: "", isValid: true },
        ["image"]: { value: "", isValid: true },
      };
    });
    onCancel();
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
    onSubmit(productData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>{headerTitle}</Text>
      <View style={styles.inputContainer}>
        <InputData
          label="Descrição"
          invalid={!inputs.description.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputs.description.value,
          }}
        />
        <InputData
          label="Preço"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <InputData
          label="Imagem"
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "image"),
            value: inputs.image.value,
          }}
        />
      </View>
      <View style={styles.imagePreviewContainer}>
        <Image
          style={styles.image}
          source={{
            uri: previewImage.imagePreview.value,
          }}
        />
      </View>
      <View style={styles.buttonPreviewContainer}>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} mode="flat" onPress={previewHandler}>
            Preview
          </Button>
        </View>
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} mode="flat" onPress={cleanScreen}>
              Cancelar
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button style={styles.button} onPress={submitHandler}>
              {submitButtonLabel}
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProductForm;

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
  imagePreviewContainer: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    marginTop: 15,
    marginRight: 30,
    marginLeft: 80,
    height: 120,
    width: 250,
    borderWidth: 2,
    flexDirection: "row",
    textAlign: "center",
    justifyContent: "center",
  },
  image: {
    maxWidth: 235,
    maxHeight: 110,
    height: 100,
    width: 235,
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
  },
  button: {
    minWidth: 120,
    marginHorizontal: 4,
  },
  buttonContainer: {
    margin: 20,
    width: 150,
  },
  buttonPreviewContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
