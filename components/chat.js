import { useState,useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform } from "react-native";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const Chat = ({ route, navigation, db, isConnected }) => {
    const { name } = route.params;
    const { background } = route.params;
    const { userId } = route.params;
    const [messages, setMessages] = useState([]);

    //to get messages from storage
    const loadCachedLists = async () => {
      const cachedLists = await AsyncStorage.getItem("messages") || [];
      setLists(JSON.parse(cachedLists));
    }
// fetch messages from db
    const cacheMessages = async (listsToCache) => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(listsToCache));
      } catch (error) {
        console.log(error.message);
      }
    }

//to hide input field when user offline
    const renderInputToolbar = (props) => {
      if (isConnected) return <InputToolbar {...props} />;
      else return null;
     }

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

      let unsubMessages;
        useEffect(() =>{
          navigation.setOptions({title: name,});
           // when there is connection fetch data from db otherwise fetch from AsyncStorage
          if(isConnected === true){

// unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed.
          if(unsubMessages) unsubMessages();
          unsubMessages = null;

            // fetch messages from db in real-time
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
           unsubMessages= onSnapshot(q, (documentsSnapshot) =>{
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
              newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
          })
          cacheMessages(newMessages);
          setMessages(newMessages);
        });
          }else loadCachedLists();
          
         return()=>{
          if(unsubMessages) unsubMessages();
         }
        }, [isConnected]);
  
    // render main chat UI 
    return(
        <View style={[styles.container, {backgroundColor: background}] }>
            {/* <Text style={styles.text}>Welcome, {name}!</Text> */}

            <GiftedChat
              renderInputToolbar={renderInputToolbar}
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
        
    }
   
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