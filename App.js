import { useState } from 'react';
// import { StyleSheet } from 'react-native';
// import the screens
import Start from './components/start';
import Chat from './components/chat';
// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const [text, setText] = useState("");

  const alertMyText = () => {
    Alert.alert(text);
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Start"
      >
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
  </NavigationContainer>
    
  );
  }
  // const styles = StyleSheet.create({
  //   container: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //   }
  // });

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

