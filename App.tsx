import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, View, Dimensions } from "react-native";
import Charectors from "./app/Screens/Charectors";
import store from "./app/redux/store";
import { Provider as ReduxProvider } from "react-redux";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        {/*filter to do*/}
        <Charectors />
      </SafeAreaView>
    </ReduxProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
