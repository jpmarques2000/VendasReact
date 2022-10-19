import { useContext, useState } from "react";
import { Alert } from "react-native";

import AuthContent from "../components/auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";
import { login } from "../util/auth";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const userResponse = await login(email, password);
      // authCtx.storeUserId(userResponse.userUid); // Metodo caso esteja utilizando token temporario
      authCtx.authenticate(userResponse.token);
    } catch (error) {
      Alert.alert(
        "Falha no Login!",
        "Não foi possível logar-se ! Por favor verifique as suas informações de login e tente novamente mais tarde !!!!!!!!"
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Realizando o Login..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
