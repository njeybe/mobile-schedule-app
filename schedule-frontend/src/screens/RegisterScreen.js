import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axiosInstance from '../api/axiosConfig';

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!username || !email || !password) {
      return Alert.alert('Error', 'Please fill in all fields');
    }

    try {
      await axiosInstance.post('user/register', { username, email, password });
      Alert.alert('Success', 'Account created! Please log in.');
      navigation.navigate('Login');
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Registration failed. Try a different email.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        placeholderTextColor={'#808080'}
        value={username} 
        onChangeText={setUsername} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email"
        placeholderTextColor={'#808080'}
        value={email} 
        onChangeText={setEmail} 
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        placeholderTextColor={'#808080'}
        value={password} 
        onChangeText={setPassword} 
        secureTextEntry
      />

      <Button title="Register" onPress={handleRegister} color="#28a745" />

      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.linkContainer}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 15, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  linkContainer: { marginTop: 20, alignItems: 'center' },
  link: { color: '#007AFF', fontSize: 16 }
});