import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import ProductsContextProvider from "./store/products-context";
import ProductForm from "./components/ManageProducts/ProductForm";

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Login",
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          title: "Registrar",
        }}
      />
    </Stack.Navigator>
  );
}

function BottomTabStack() {
  const authCtx = useContext(AuthContext);
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerStyle: { height: 80, backgroundColor: "#0606b4" },
        headerTintColor: "#white",
        tabBarStyle: { backgroundColor: "#0a0ace" },
        tabBarActiveTintColor: "##caca93",
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Perfil",
          tabBarLabel: "Pefil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: "Produtos",
          tabBarLabel: "Produtos",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="fast-food" color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{
          title: "Carrinho",
          tabBarLabel: "Carrinho",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" color={color} size={25} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Novo Produto"
        component={ProductForm}
        options={{
          tabBarShowLabel: false,
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="add" color={color} size={25} />
          )
        }}
      />
    </BottomTab.Navigator>
  );
}

// function AuthenticatedStack() {
//   <Stack.Navigator
//     screenOptions={{
//       headerStyle: { backgroundColor: "#blue" },
//       headerTintColor: "white",
//     }}
//   >
//     <Stack.Screen name="ProductsOverview" component={BottomTabStack} />
//     <Stack.Screen name="Home" component={HomeScreen} />
//   </Stack.Navigator>;
// }
function AuthenticatedStack() {
  <BottomTab.Navigator>
    <BottomTab.Screen name="ProductsOverview" component={ProfileScreen} />
    <BottomTab.Screen name="Home" component={ProductsScreen} />
  </BottomTab.Navigator>;
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <BottomTabStack />}
    </NavigationContainer>
  );
}

function Root() {
  //const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      //setIsTryingLogin(false);
    }
    fetchToken();
  }, []);

  return <Navigation />;
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ProductsContextProvider>
          <Root />
        </ProductsContextProvider>
      </AuthContextProvider>
    </>
  );
}
