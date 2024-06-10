// QuizScreen.js
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, SafeAreaView } from 'react-native';

const QuizScreen = () => {
    const { id } = useLocalSearchParams<{id:string}>();
    const operation = typeof id === 'string' ? id : 'addition'; // Provide a default operation if id is undefined or not a string
    const [num1, setNum1] = useState(0);
    const [num2, setNum2] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [time, setTime] = useState(10);

    useEffect(() => {
        console.log('Operation from params:', operation);
        generateQuestion();
    }, [operation]);

    const generateQuestion = () => {
        switch (operation) {
            case 'addition':
                setNum1(Math.floor(Math.random() * 100) + 1);
                setNum2(Math.floor(Math.random() * 100) + 1);
                break;
            case 'subtraction':
                setNum2(Math.floor(Math.random() * 100) + 1);
                setNum1(Math.floor(Math.random() * 100) + 1); // Adjusted to ensure num2 is generated properly
                break;
            case 'multiplication':
                setNum1(Math.floor(Math.random() * 100) + 1);
                setNum2(Math.floor(Math.random() * 10) + 1);
                break;
            case 'division':
                const divisor = Math.floor(Math.random() * 9) + 1;
                const quotient = Math.floor(Math.random() * 100) + 1;
                setNum2(divisor);
                setNum1(divisor * quotient);
                break;
            default:
                setNum1(0);
                setNum2(0);
        }
    };

    const handleAnswerChange = (text:string) => {
        setUserAnswer(text);
        const answer = calculateAnswer();
        const tolerance = 0.0001; // Adjust tolerance level as needed
        if (Math.abs(parseFloat(text) - answer) <= tolerance) {
            setScore(score + 1);
            handleNextQuestion();
        }
    };

    const calculateAnswer = () => {
        switch (operation) {
            case 'addition':
                return num1 + num2;
            case 'subtraction':
                return num1 - num2;
            case 'multiplication':
                return num1 * num2;
            case 'division':
                return num1 / num2; // Ensure it's a precise division
            default:
                return num1 + num2; // Default to addition
        }
    };

    const handleNextQuestion = () => {
        generateQuestion();
        setUserAnswer('');
        setTime(10);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    handleNextQuestion();
                    return 10; // Reset timer to 10 seconds for the next question
                }
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={{ fontWeight: 'bold', fontSize: 38 }}>Speed Math</Text>
            <View style={styles.topBar}>
                <View>
                    <Text style={styles.timer}><Text>⌛</Text> {time} sec</Text>
                </View>
                <Text style={styles.score}>Score: {score}</Text>
            </View>
            <Text style={styles.question}>
                {num1} {getOperationSymbol(operation)} {num2} =
            </Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={userAnswer}
                onChangeText={handleAnswerChange}
                autoFocus={true}
            />
        </SafeAreaView>
    );
};

const getOperationSymbol = (operation:string) => {
    switch (operation) {
        case 'addition':
            return '+';
        case 'subtraction':
            return '-';
        case 'multiplication':
            return '×';
        case 'division':
            return '÷';
        default:
            return '+';
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop:50,
        flex: 1,
        alignItems: 'center',
    },
    question: {
        fontSize: 20,
        marginTop: 200,
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        textAlign: 'center',
        width: 100,
    },
    timer: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    score: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 30,
        alignItems: 'center',
        width: 360,
    },
});

export default QuizScreen;
