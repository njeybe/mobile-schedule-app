import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../api/axiosConfig';

export default function HomeScreen({ navigation }) {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch data
  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/schedule');
      setSchedules(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout Function
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  // Refresh whenever screen comes into focus
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchSchedules();
    });
    return unsubscribe;
  }, [navigation]);

  // UI for a single schedule item
  const renderItem = ({ item }) => (
    <View style={[styles.card, item.type === 'medication' ? styles.medCard : styles.taskCard]}>
      <View>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardTime}>
          {new Date(item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
        <Text style={styles.cardDate}>
          {new Date(item.time).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.type.toUpperCase()}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Logout" color="#ff4444" onPress={handleLogout} />
        <Button title="+ Add" onPress={() => navigation.navigate('AddSchedule')} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={schedules}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={<Text style={styles.emptyText}>No schedules yet.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
  },
  medCard: { borderLeftWidth: 5, borderLeftColor: '#007AFF' },
  taskCard: { borderLeftWidth: 5, borderLeftColor: '#28a745' },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardTime: { fontSize: 14, color: '#666', marginTop: 4 },
  cardDate: { fontSize: 12, color: '#999' },
  badge: { backgroundColor: '#eee', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5 },
  badgeText: { fontSize: 10, fontWeight: 'bold', color: '#555' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#999', fontSize: 16 }
});