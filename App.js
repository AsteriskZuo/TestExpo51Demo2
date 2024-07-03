import * as React from "react";
import { SendbirdUIKitContainer } from "@sendbird/uikit-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  GroupChannelListScreen,
  GroupChannelCreateScreen,
  GroupChannelScreen,
} from "./OthersScreen";
import { SignInScreen } from "./SignInScreen";
import { platformServices } from "./services";
import {
  useSendbirdChat,
} from '@sendbird/uikit-react-native';
import firebase from "@react-native-firebase/app";

const RNfirebaseConfig = {
  apiKey: "",
  authDomain: "note-app-rn.firebaseapp.com",
  projectId: "note-app-rn",
  storageBucket: "note-app-rn.appspot.com",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(RNfirebaseConfig);

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(RNfirebaseConfig);
// } else {
//   app = firebase.app();
// }

const RootStack = createNativeStackNavigator();
const Navigation = () => {
  const { currentUser } = useSendbirdChat();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!currentUser ? (
          <RootStack.Screen name={"SignIn"} component={SignInScreen} />
        ) : (
          <>
            <RootStack.Screen
              name={"GroupChannelList"}
              component={GroupChannelListScreen}
            />
            <RootStack.Screen
              name={"GroupChannelCreate"}
              component={GroupChannelCreateScreen}
            />
            <RootStack.Screen
              name={"GroupChannel"}
              component={GroupChannelScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App = () => {
  return (
    <SendbirdUIKitContainer
      appId={"APP_ID"}
      chatOptions={{ localCacheStorage: AsyncStorage }}
      platformServices={platformServices}
    >
      <Navigation />
    </SendbirdUIKitContainer>
  );
};
