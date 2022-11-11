import { React, useState, useEffect } from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-community/async-storage';
import { postTodo, getAllTodo, filterTodo } from './Realm';

export default function Todo() {

  useEffect(() => {

    // AsyncStorage.getItem("user", (error, result) => {
    //   resultObject = JSON.parse(result)
    //   setName(resultObject.firstName)
    //   })

    postTodo("title", "body", "status", new Date())
    setTodos(getAllTodo())
    console.log(todos)
  }, [])

    const [todos, setTodos] = useState([])
    const [name, setName] = useState("")
    const [filterType, setFilterType] = useState("todos")

    todosPress = () => {
      setTodos(getAllTodo())
      setFilterType("todos")
    }

    donePress = () => {
      setTodos(filterTodo("status = done"))
      setFilterType("done")
    }

    doingPress = () => {
      setTodos(filterTodo("status = \"doing\""))
      setFilterType("doing")
    }

    overDuePress = () => {
      setTodos(filterTodo("dueDate < " + new Date()))
      setFilterType("overDue")
    }

    addTodo = () => {

    }


    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "grey" }}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ color: "black", alignSelf: "center", fontWeight: 'bold', fontSize: 25 }}>Welcome {name}</Text>
        </View>
        <View style={{ flex: 2, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: "white" }}>
          <View style={styles.rectangle}>
            <Text style={[styles.filterText, { color: filterType == "todos" ? "purple" : "grey" }]} onPress={todosPress}>Todos</Text>
            <Text style={[styles.filterText, { color: filterType == "done" ? "purple" : "grey" }]} onPress={donePress}>Done</Text>
            <Text style={[styles.filterText, { color: filterType == "doing" ? "purple" : "grey" }]} onPress={doingPress}>Doing</Text>
            <Text style={[styles.filterText, { color: filterType == "overDue" ? "purple" : "grey" }]} onPress={overDuePress}>OverDue</Text>
          </View>
          <ScrollView>
            {todos.forEach((todo) => {
              return (
                <TouchableOpacity>
                  <View style={styles.todoRow}>
                    <Text>
                      {todo.title}
                    </Text>
                    <Text>
                      {todo.body}
                    </Text>
                    <Text>
                      {todo.duedate}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <TouchableOpacity onPress={addTodo} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }

const styles = StyleSheet.create({

    rectangle: {
      width: 350,
      height: 75,
      // flex: 1,
      alignSelf: "center",
      flexDirection: "row",
      backgroundColor: "white",
      justifyContent: "space-evenly",
      elevation: 3,
      borderRadius: 20,
      position: "relative",
      bottom: 30
    },

    filterText: {
      color: "grey",
      fontWeight: 'bold',
      fontSize: 15,
      alignSelf: "center",
    },

    button: {
      backgroundColor: "purple",
      width: 60,
      height: 60,
      borderRadius: 50,
      position: "relative",
      elevation: 3,
      bottom: -350,
      right: -300,
      justifyContent: "center"
    },
  
    buttonText: {
      color: "white",
      alignSelf: "center",
      fontSize: 30
    },

    todoRow: {
      elevation: 3,
      width: 100,
      height: 100,
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between"
    }



  })

