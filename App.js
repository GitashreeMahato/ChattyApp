// import the screens 
import Start from './components/start';
import Chat from './components/chat';
import { useNetInfo }from '@react-native-community/netinfo';
import { useEffect } from 'react';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Create the navigator
const Stack = createNativeStackNavigator();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore"

import { Alert, LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// import storage for image
import { getStorage } from 'firebase/storage';

const App = () => {

  // network connectivity status
  const connectionStatus = useNetInfo();

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDh4ATGmVex9BS5M5-SmCWlw7Pj0fUb1O8",
  authDomain: "chattyapp-fac9e.firebaseapp.com",
  projectId: "chattyapp-fac9e",
  storageBucket: "chattyapp-fac9e.appspot.com",
  messagingSenderId: "448282688366",
  appId: "1:448282688366:web:f12b043d372f7c6f689f7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app); // initialize the storage handler

// display an alert popup when connection is disable and enable
useEffect(() => {
  if (connectionStatus.isConnected === false){
    Alert.alert("Connection lost!");
    disableNetwork(db);
  } else if (connectionStatus.isConnected === true){
    enableNetwork(db);
  }
}, [connectionStatus.isConnected]);   // Whether to fetch data from AsyncStorage or to render the “add” form


  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Welcome"
      >
        <Stack.Screen name="Welcome" component={Start} />
        <Stack.Screen name="Chat">
        {props => <Chat isConnected={connectionStatus.isConnected} db={db} storage={storage} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
  </NavigationContainer>
    
  );
  }
  
export default App;




















































// =========================================== for my reference===================================
// const App = () => {
  // const [text, setText] = useState('');
  // const alertMyText = () => {
  //   Alert.alert(text);
// }


//   return (

/* <View style={styles.container} >
      <TextInput 
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        placeholder='Type something here'
      />
      <Text style={styles.textDisplay}>You wrote : {text}
      </Text>
      <Button 
      onPress={ ()=> {
        alertMyText();
      } }
      title= "Press me"
      />
      <ScrollView>
        <Text style={{fontSize:110}}>This text is so big! And so long! You have to scroll!</Text>
      </ScrollView>

    </View> */

    // <View style={styles.container}>
    //   <Text style={styles.blue}>Hello World!!</Text>
    //   <Text style={styles.bigRed}>Let's meet!</Text>
    //   <Text style={[styles.blue, styles.bigRed]}>Have fun and enjoy your everyday.</Text>
    //   <View style={styles.box}></View>
    //   {/* <StatusBar style="auto" /> */}
    // </View>
  // );
// }

// const styles = StyleSheet.create({

// container:{
//   flex: 1,
//   justifyContent: 'center',
//   alignItems: 'center'
// },
// textInput: {
//   width: '88%',
//   borderWidth: 1,
//   height: 50,
//   padding: 10
//   },
  // textDisplay:{
  //   height: 50,
  //   lineHeight: 50
  // }

  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // blue: {
  //   color: 'blue',
  //   fontWeight: '600',
  // },
  // bigRed:{
  //   color: 'red',
  //   fontSize: 30,
  // },
  // bigRedBold:{
  //   color: 'red',
  //   fontSize: 30,
  //   fontWeight: '600',
  // }
  // box: {
  //   width: 60,
  //   height: 60,
  //   backgroundColor: 'blue',
  // }
// });

