import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, Alert, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axiosInstance from '../api/axiosConfig';

export default function AddScheduleScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isMedication, setIsMedication] = useState(false);

  const onChangeTime = (event, selectedDate) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      return Alert.alert('Missing Info', 'Please enter a title');
    }

    try {
      await axiosInstance.post('/schedule', {
        title,
        time: date,
        type: isMedication ? 'medication' : 'task'
      });
      navigation.goBack(); // Return to Home
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Could not save schedule');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title / Medicine Name</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. Ibuprofen 500mg" 
        value={title} 
        onChangeText={setTitle} 
      />

      <Text style={styles.label}>Time to take:</Text>
      
      {/* Time Picker Button */}
      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timeButton}>
        <Text style={styles.timeText}>
          {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="time"
          display="default"
          onChange={onChangeTime}
        />
      )}

      {/* Toggle Switch */}
      <View style={styles.switchRow}>
        <Text style={styles.switchLabel}>Is this a Medication?</Text>
        <Switch 
          value={isMedication} 
          onValueChange={setIsMedication}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isMedication ? "#007AFF" : "#f4f3f4"}
        />
      </View>

      <Button title="Save Schedule" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, marginTop: 20, marginBottom: 8, fontWeight: '600', color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 12, borderRadius: 8, fontSize: 16, backgroundColor: '#f9f9f9' },
  timeButton: { padding: 15, backgroundColor: '#eef', borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  timeText: { fontSize: 18, color: '#007AFF', fontWeight: 'bold' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30, padding: 15, backgroundColor: '#f0f0f0', borderRadius: 8 },
  switchLabel: { fontSize: 16 }
});