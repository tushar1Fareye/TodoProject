import {React, useState, useEffect} from 'react';
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
  Button,
  KeyboardAvoidingView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';


const Login = ({ navigation }) => {



    const [isLogIn, setisLogIn] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [role, setRole] = useState("")
    const [titleText, setTitleText] = useState("Log-In")
    const [logInError, setLogInError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [users, setUsers] = useState([{
      email: "test@gmail.com",
      password: "testPassword"
    }])
    const [isPasswordHide, setIsPasswordHide] = useState(true)
  
    handleEmail = (text) => {
      setEmail(text)
    }
    handlePassword = (text) => {
      console.log(text)
      setPassword(text) 
    }
    handleFirstName = (text) => {
      setFirstName(text) 
    }
    handleLastName = (text) => {
        setLastName(text) 
      }
    handleRole = (text) => {
        setRole(text) 
      }
  
    signUpPress = () => {
      setTitleText("Sign-Up")
      setRole("")
      setEmail("")
      setFirstName("")
      setLastName("")
      setPassword("")
      setEmailError(false)
      setLogInError(false)
      setPasswordError(false)
      setisLogIn(false)
    }
  
    logInPress = () => {
      setTitleText("Log-In")
      setRole("")
      setEmail("")
      setFirstName("")
      setLastName("")
      setPassword("")
      setEmailError(false)
      setLogInError(false)
      setPasswordError(false)
      setisLogIn(true)
    }
  
  
    onSubmit = () => {
      setEmailError(false)
      setLogInError(false)
      setPasswordError(false)
      if(isLogIn) {
        console.log("inLog")
        let isSuccessful = false
        for(let i=0; i<users.length; i++) {
          user = users[i]
          console.log(user)
          if(email === user.email && password === user.password) {
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


          AsyncStorage.setItem("user", JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "email": email,
            "password": password,
            "role": role
          }), () => {
            console.log("done")
          })
                    navigation.navigate('todo')

        }
      }
      logInPress()
    }
  
    reverseisPasswordHide = () => {
      setIsPasswordHide(!isPasswordHide)
    }
  
  
    
  
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "black", alignSelf: "center", fontWeight: 'bold', fontSize: 30 }}>To Do App</Text>
        </View>
        <KeyboardAvoidingView behavior='padding'  keyboardVerticalOffset={isLogIn ? -100 : -100} style={{ flex: 2, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "white"}}>
          <View style={{ width: 325, alignSelf: "center", flex: 1, justifyContent: "space-between"}}>
            <Text style={{ color: "black", alignSelf: "center", fontSize: 25}}>{titleText}</Text>
            <View style={{ justifyContent: "space-between"}}>
  
              <ScrollView>
                <View style={{}}>
  
                {
                  !isLogIn && <ScrollView style={styles.inputText}>
                                <TextInput  onChangeText={text => handleFirstName(text)}
                                placeholder="Enter First Name"  value={firstName}
                                />
                              </ScrollView>
                }
                {
                  !isLogIn && <ScrollView style={styles.inputText}>
                                <TextInput  onChangeText={text => handleLastName(text)}
                                placeholder="Enter Last Name"  value={lastName}
                                />
                              </ScrollView>
                }
                {
                  !isLogIn && <ScrollView style={styles.inputText}>
                                <TextInput  onChangeText={text => handleRole(text)}
                                placeholder="Enter Role"  value={role}
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
        </KeyboardAvoidingView>
        
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

  export default Login
  