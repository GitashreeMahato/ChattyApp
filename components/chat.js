import { useState,useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
 

const Chat = ({ route, navigation, db }) => {
    const { name } = route.params;
    const { background } = route.params;
    const { userId } = route.params;
    const [messages, setMessages] = useState([]);


    // to save sent messages
    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
      }

      // function to change the background of the message
      const renderBubble = (props) => {
        return <Bubble 
        {...props}
        textStyle={{
            left: {
              color: 'white',
            },
            
        }}
        wrapperStyle={{
            right: {
                backgroundColor: "#0000FF",
            },
            left: {
                backgroundColor: "#414045",                
            },
        }}
        />
        
      };

// fetch messages from db in real-time
        useEffect(() =>{
          navigation.setOptions({title: name,});
          const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
          const unsubMessages= onSnapshot(q, (documentsSnapshot) =>{
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
              newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
          })
          setMessages(newMessages)
        });
         return()=>{
          if(unsubMessages) unsubMessages();
         }
        }, []);
  
    // render main chat UI 
    return(
        <View style={[styles.container, {backgroundColor: background}] }>
            {/* <Text style={styles.text}>Welcome, {name}!</Text> */}

            <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: userId,
        name: name
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
</View>
        
    )
};
// styling for the chat component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
    },
    // text: {
    //     color: "#ffffff",
    //     fontSize: 30
    //   },

});

export default Chat;

































































// 


// set the static message which displays in the chat screen
// useEffect(()=>{
//   setMessages([
//       {
//         _id: 1,
//         text: "Hello developer",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "React Native",
//           avatar: "https://placeimg.com/140/140/any",
//         },
//       },
//       // system message
//       {
//           _id: 2,
//           text: 'You joined the chat',
//           createdAt: new Date(),
//           system: true,
//         },
//     ]);
//   }, []);

// when sending a message
// const onSend = (newMessages) => {
//   setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
// }

 // useEffect (()=>{
      //   navigation.setOptions({title: name,});
      //   }, []);