import { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
 

const Chat = ({ route, navigation }) => {
    const {name} = route.params;
    const {background} = route.params;

    useEffect (()=>{
        navigation.setOptions({
            title: name,
        }, [])
    });
    
    return(
        <View style={[styles.container, {backgroundColor: background}] }>
            <Text style={styles.text}>Welcome, {name}!</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#ffffff",
        fontSize: 30
        // fontFamily: "Poppins-Regular",
      },

});

export default Chat;