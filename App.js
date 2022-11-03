/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {React, useRef, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */
const Section = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {

  const [isLogIn, setisLogIn] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [titleText, setTitleText] = useState("Log-In")
  const [logInError, setLogInError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [users, setUsers] = useState([{
    email: "t",
    password: "t"
  }])
  const [isPasswordHide, setIsPasswordHide] = useState(true)

  handleEmail = (text) => {
    setEmail(text)
  }
  handlePassword = (text) => {
    console.log(text)
    setPassword(text) 
  }
  handlename = (text) => {
    setName(text) 
  }

  signUpPress = () => {
    setTitleText("Sign-Up")
    setEmail("")
    setName("")
    setPassword("")
    setEmailError(false)
    setLogInError(false)
    setPasswordError(false)
    setSuccess(false)
    setisLogIn(false)
  }

  logInPress = () => {
    setTitleText("Log-In")
    setEmail("")
    setName("")
    setPassword("")
    setEmailError(false)
    setLogInError(false)
    setPasswordError(false)
    setSuccess(false)
    setisLogIn(true)
  }


  onSubmit = () => {
    setEmailError(false)
    setLogInError(false)
    setPasswordError(false)
    setSuccess(false)
    if(isLogIn) {
      console.log("inLog")
      let isSuccessful = false
      for(let i=0; i<users.length; i++) {
        user = users[i]
        console.log(user)
        if(email === user.email && password === user.password) {
        setSuccess(true)
        isSuccessful = true
        console.log("no")
        break
        }
      }
      if(isSuccessful === false) {
        console.log("yes")
        setLogInError(true)
      }

    } else {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if(reg.test(email) === false) {
        setEmailError(true)
      } else if(password.length < 5) {
        setPasswordError(true)
      } else {
        setUsers([...users, {
          email: email,
          password: password
        }])
        setSuccess(true)
      }
    }
    setEmail("")
    setName("")
    setPassword("")
  }

  reverseisPasswordHide = () => {
    setIsPasswordHide(!isPasswordHide)
  }


  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ color: "black", alignSelf: "center", fontWeight: 'bold', fontSize: 30 }}>To Do App</Text>
      </View>
      <View style={{ flex: 2, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "white"}}>
        <View style={{ width: 325, alignSelf: "center", flex: 1, justifyContent: "space-between"}}>
          <Text style={{ color: "black", alignSelf: "center", fontSize: 25}}>{titleText}</Text>
          <View style={{ justifyContent: "space-between"}}>

            <ScrollView>
              <View style={{}}>

              {
                !isLogIn && <ScrollView style={styles.inputText}>
                              <TextInput  onChangeText={text => handlename(text)}
                              placeholder="Enter Name"  value={name}
                              />
                            </ScrollView>
              }

              <ScrollView style={styles.inputText}>
                <TextInput  onChangeText={text => handleEmail(text)}
                placeholder="Enter email" value={email}
                />
              </ScrollView>

              <View style={{width: 325, alignSelf: "center", borderBottomColor: "black", borderBottomWidth: 2, margin: 10, flexDirection: "row"}}>
              <ScrollView style={{}}>
                <TextInput onChangeText={text => handlePassword(text)}
                placeholder="Enter Password" secureTextEntry={isPasswordHide} value={password}
                />
              </ScrollView>
              <TouchableOpacity style={styles.image} onPress={reverseisPasswordHide}>
              {!isPasswordHide && <Image style={styles.image} source={require('/home/tushar/TodoProject/images/view.png')}/>}
              {isPasswordHide && <Image style={styles.image} source={require('/home/tushar/TodoProject/images/hide.png')}/>}
              </TouchableOpacity>
              </View>
          </View>
          </ScrollView>
          </View>

          <View>
            {success && <Text style={{ color: "green", alignSelf: "center", fontSize: 15 }}>{titleText} successful!</Text>}
            {logInError && <Text style={{ color: "red", alignSelf: "center", fontSize: 15 }}>Credentials are invalid</Text>}
            {emailError && <Text style={{ color: "red", alignSelf: "center", fontSize: 15 }}>Email is invalid</Text>}
            {passwordError && <Text style={{ color: "red", alignSelf: "center", fontSize: 15 }}>Password length is less than 5</Text>}
            <TouchableOpacity onPress={onSubmit} style={styles.button}>
              <Text style={styles.buttonText}>{titleText}</Text>
            </TouchableOpacity>
            {isLogIn && <Text style={{ color: "black", alignSelf: "center", fontSize: 15 }}>Dont have an account? <Text onPress={signUpPress} style={{ color: "purple", fontSize: 15 }}>Sign Up</Text></Text>}
            {!isLogIn && <Text style={{ color: "black", alignSelf: "center", fontSize: 15 }}>Already have an account? <Text onPress={logInPress} style={{ color: "purple", fontSize: 15 }}>Log In</Text></Text>}
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  button: {
    backgroundColor: "purple",
    height: 50,
    borderRadius: 10,
    justifyContent: "center"
  },

  buttonText: {
    color: "white",
    alignSelf: "center"
  },


  inputText: {
    width: 325,
    alignSelf: "center", 
    borderBottomColor: "black",
    borderBottomWidth: 2,
    margin: 10
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  image: {
    width: 20,
    height: 20,
    alignSelf: "center"
  }
});

export default App;
