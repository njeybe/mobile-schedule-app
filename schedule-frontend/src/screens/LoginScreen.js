import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosConfig.js';

export default function LoginScreen({navigation}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await axiosInstance.post('user/login', {username, password});

            await AsyncStorage.setItem('userToken', res.data.token);
            navigation.replace('Home');
        }catch(err){
            console.log(err);
            Alert.alert('Login failed', 'Please check your username and password')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scheduler App</Text>

            <TextInput 
                style={styles.input}
                placeholder='Username'
                placeholderTextColor={'#808080'}
                onChangeText={setUsername}
                autoCapitalize='none'
                keyboardType='username'
            />

            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor={'#808080'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Button title='Login' onPress={handleLogin}/>

            <TouchableOpacity 
                onPress={() => navigation.navigate('Register')} 
                style={styles.linkContainer}>
                    
                    <Text style={styles.link}> Don't have an account?</Text>
            </TouchableOpacity>

        </View>
    ); 
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff'},
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#333' },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8, fontSize: 16 },
    linkContainer: { marginTop: 20, alignItems: 'center' },
    link: { color: '#007AFF', fontSize: 16 }
})
