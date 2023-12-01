import { useState,useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { KeyboardAvoidingView, Platform } from "react-native";
 

const Chat = ({ route, navigation }) => {
    const {name} = route.params;
    const {background} = route.params;
    const [messages, setMessages] = useState([]);

    // when sending a message
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
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
                left: -20
                
            },
        }}
        />
        
      };

      useEffect (()=>{
        navigation.setOptions({
            title: name,
        });
        }, []);

// set the static message which displays in the chat screen
    useEffect(()=>{
        setMessages([
            {
              _id: 1,
              text: "Hello developer",
              createdAt: new Date(),
              user: {
                _id: 2,
                name: "React Native",
                avatar: "https://placeimg.com/140/140/any",
              },
            },
            // system message
            {
                _id: 2,
                text: 'You joined the chat',
                createdAt: new Date(),
                system: true,
              },
          ]);
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
        _id: 1
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