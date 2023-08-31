import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IndexScreen from "./src/screens/IndexScreen";
import ShowScreen from "./src/screens/ShowScreen";
import { Provider } from "./src/context/BlogContext";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

// Define os parâmetros de rota para cada tela
type RootStackParamList = {
  IndexScreen: undefined;
  ShowScreen: { id: number, state: { content: string, id: number, title: string }[] };
  CreateScreen: undefined
  EditScreen: { id: number }
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="IndexScreen"
        screenOptions={{
          title: 'Blogs'
        }}
      >
        <Stack.Screen
          name="IndexScreen"
          component={IndexScreen}
        />
        <Stack.Screen
          name="ShowScreen"
          component={ShowScreen}
        />
        <Stack.Screen
          name="CreateScreen"
          component={CreateScreen}
        />
        <Stack.Screen
          name="EditScreen"
          component={EditScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
};