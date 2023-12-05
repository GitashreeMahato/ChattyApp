import { useState, useEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
 
const Chat = ({ route, navigation, db, isConnected, storage }) => {
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

        // Query Firestore for messages, ordered by their creation date.
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            // Listen for real-time changes in messages collection.
           unsubMessages= onSnapshot(q, (documentsSnapshot) =>{
            let newMessages = [];
            documentsSnapshot.forEach(doc => {
              newMessages.push({ id: doc.id, ...doc.data(), createdAt: new Date(doc.data().createdAt.toMillis())})
          })
          cacheMessages(newMessages); // Cache the fetched messages
          setMessages(newMessages); // Update state with new messages
        });
          }else loadCachedLists();
          
         return()=>{
          if(unsubMessages) unsubMessages();
         }
        }, [isConnected]);

        // creating action (circle) button 
        const renderCustomActions = (props) =>{
          return <CustomActions storage={storage} {...props} />
        }
// render mapView
        const renderCustomView = (props) => {
          const { currentMessage} = props;
          if (currentMessage.location) {
            return (
                <MapView
                  style={{width: 150,
                    height: 100,
                    borderRadius: 13,
                    margin: 3}}
                  region={{
                    latitude: currentMessage.location.latitude,
                    longitude: currentMessage.location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
            );
          }
          return null;
        }

    // render main chat UI 
    return(
        <View style={[styles.container, {backgroundColor: background}] }>
            {/* <Text style={styles.text}>Welcome, {name}!</Text> */}

            <GiftedChat
              messages={messages}
              renderBubble={renderBubble}
              renderInputToolbar={renderInputToolbar}
              renderActions={renderCustomActions}
              renderCustomView={renderCustomView}
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