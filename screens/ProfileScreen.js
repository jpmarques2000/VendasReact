import { useState } from "react";
import { View } from "react-native";

import UserForm from "../components/ManageInputs/UserForm";

function ProfileScreen() {
  const [error, setError] = useState();
  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(userData) {
    try {
      const response = await updateUser(userData);
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  return (
    <View>
      <UserForm
        headerTitle="Perfil do Usuário"
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
      />
    </View>
  );
}

export default ProfileScreen;
