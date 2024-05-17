import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./pages/Onboarding/Onboarding";
import Signin from "./pages/Signin/Signin";
import Signup from "./pages/Signup/Signup";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import OpenDoor from "./pages/OpenDoor/OpenDoor";
import RegisterFace from "./pages/Register/RegisterFace";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Signin"
          component={Signin}
          options={{
            title: "Sign In",
            headerStyle: {
              backgroundColor: "#E5E5E5",
            },
            headerTintColor: "rgba(152, 94, 225, 1)",
          }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{
            title: "Sign Up",
            headerStyle: {
              backgroundColor: "#E5E5E5",
            },
            headerTintColor: "rgba(152, 94, 225, 1)",
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RegisterFace"
          component={RegisterFace}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OpenDoor"
          component={OpenDoor}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
