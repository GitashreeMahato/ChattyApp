import { useState } from "react";
import { TextInput, ImageBackground, TouchableOpacity, View, Text, StyleSheet, Alert, Platform, KeyboardAvoidingView  } from "react-native";
import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation })=>{
    const auth = getAuth();
    //creates state for name input so that content is updated dynamically 
    const [name, setName] = useState("");
  //creates state for background selection so that background is populated dynamically
    const [background, setBackground] = useState("");

    // allows user to sign in anonymously
    const signInUser = () => {
        signInAnonymously(auth)
          .then(result => {
            navigation.navigate("Chat", {name:name, background:background,userId: result.user.uid });
            Alert.alert("Signed in Successfully!");
          })
          .catch((error) => {
            Alert.alert("Unable to sign in, try later again.");
          })
      }

    return(
        // background image for chatty app
        <ImageBackground 
        source={require("../assets/Background-Image.png")} 
        style={styles.container}
        >
            {/* title of the app */}
            <View style={styles.titleView} >
                <Text style={styles.appTitle}>Welcome to Chatty App !!</Text>
            </View>
            <View style={styles.mainView} >
                {/* input field to enter user's name*/}
            <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            />
            <View>
            <Text style={styles.chooseBackgroundText} >Choose background color :</Text>
            {/* color containers */}
            <View style={styles.colorsContainer}>
                {/* color 1 */}
                <TouchableOpacity 
                style={[styles.selectStyleColor, styles.selectColor1]}
                accessible={true}
                accessibilityLabel="color-black" 
                accessibilityRole="button"
                onPress={()=> setBackground(styles.selectColor1.backgroundColor)}
                >
                </TouchableOpacity>
                {/* color 2 */}
                <TouchableOpacity 
                style={[styles.selectStyleColor, styles.selectColor2]}
                onPress={()=> setBackground(styles.selectColor2.backgroundColor)}
                accessible={true}
                accessibilityLabel="color-dark violet" 
                accessibilityRole="button"
                >
                </TouchableOpacity>
                {/* color 3 */}
                <TouchableOpacity
                style={[styles.selectStyleColor, styles.selectColor3]} 
                onPress={()=> setBackground(styles.selectColor3.backgroundColor)}
                accessible={true}
                accessibilityLabel="color-light blue" 
                accessibilityRole="button"
                >
                </TouchableOpacity>
                {/* color 4 */}
                <TouchableOpacity
                style={[styles.selectStyleColor, styles.selectColor4]} 
                onPress={()=> setBackground(styles.selectColor4.backgroundColor)}
                accessible={true}
                accessibilityLabel="color-light green" 
                accessibilityRole="button"
                >
                </TouchableOpacity>
            </View>
            </View>
            {/* button to go chat screen */}
            <TouchableOpacity 
                style={styles.buttonStart}
                // onPress={() => navigation.navigate('Chat', {name: name, background: background})}
                onPress={signInUser}
                accessible={true}
                accessibilityLabel="Get start chatting"
                accessibilityHint="Navigates to the chat screen." 
                accessibilityRole="button"
                >
                <Text style={styles.buttonText} >Start Chatting</Text>
            </TouchableOpacity>
        </View>
        {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior = "padding" /> : null}
        </ImageBackground>
        
    )
}
// style sheet for each container
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    titleView: {
        flex: 2,
        justifyContent: 'space-around'
    },
    appTitle:{
        fontSize: 25,
        fontWeight: 600,
        color: "#FFFFFF"
    },
    mainView: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        width: '88%',
        height: '44%',
        marginBottom: 60,
        justifyContent: 'space-evenly',
        borderRadius: 10,
    },
    textInput: {
        fontSize: 20,
        fontWeight: 300,
        width: '88%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#757083',
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 7
    },

    chooseBackgroundText: {
        fontSize: 18,
        fontWeight: 300,
        color: "#757083",
        opacity: 100,
        marginBottom: 20,
        marginLeft: 50,
        
    },
    colorsContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: "space-between",
        alignItems: 'center',
        marginLeft: 20,
        // borderColor: '#9C007A'
    },
    selectStyleColor: {
        width: 60,
        height: 60,
        borderRadius: "50%"
    },
    selectColor1:{
        backgroundColor: "#090C08"
    },
    selectColor2:{
        backgroundColor: "#474056"
    },
    selectColor3:{
        backgroundColor: "#8A95A5"
    },
    selectColor4:{
        backgroundColor: "#B9C6AE"
    },
    buttonStart: {
        width: '70%',
        margin: 20,
        padding: 20,
        alignItems: 'center',
        backgroundColor: "#757083",
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FFFFFF',
        textAlign: 'center'
      },
})

export default Start;