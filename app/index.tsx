// HomeScreen.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {router} from 'expo-router'

const HomeScreen = () => {

  const handleStartQuiz = (operation: string) => {
    router.push({pathname:'/quiz/[id]',
    params:{id:operation}

    }

    )
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose a Operation:</Text>
      <Button title="Addition" onPress={() => handleStartQuiz('addition')} />
      <Button title="Subtraction" onPress={() => handleStartQuiz('subtraction')} />
      <Button title="Multiplication" onPress={() => handleStartQuiz('multiplication')} />
      <Button title="Division" onPress={() => handleStartQuiz('division')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display:'flex',
    marginTop:60,
    justifyContent: 'center',
    // alignItems: 'center',
    rowGap:10,
    margin:20
  },
  title: {
    fontSize: 20,
    marginTop: 20,
  },
});

export default HomeScreen;
