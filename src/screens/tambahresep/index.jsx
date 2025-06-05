import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import notifee, { AndroidImportance } from '@notifee/react-native';

export default function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  // Minta izin notifikasi (Android 13+)
  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  // Tampilkan notifikasi sukses
  const showSuccessNotification = async (recipeName) => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    // Buat channel (khusus Android)
    await notifee.createChannel({
      id: 'resep-channel',
      name: 'Notifikasi Resep',
      importance: AndroidImportance.HIGH,
    });

    // Tampilkan notifikasi
    await notifee.displayNotification({
      title: '✅ Resep Tersimpan',
      body: `"${recipeName}" berhasil ditambahkan!`,
      android: {
        channelId: 'resep-channel',
        pressAction: {
          id: 'default',
        },
      },
    });
  };

  const handleSubmit = async () => {
    if (!title || !desc || !imageUrl) {
      Alert.alert('Gagal', 'Semua field wajib diisi!');
      return;
    }

    try {
      await firestore().collection('resep').add({
        title,
        description: desc,
        image: imageUrl,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      await showSuccessNotification(title);

      Alert.alert('Sukses', `Resep "${title}" berhasil ditambahkan ke Firebase!`);
      setTitle('');
      setDesc('');
      setImageUrl('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal mengirim data ke Firebase.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Tambah Resep Baru 🍽️</Text>

      <Text style={styles.label}>Nama Resep</Text>
      <TextInput
        style={styles.input}
        placeholder="Contoh: Salad Buah Segar"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Deskripsi</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Tuliskan cara membuat, bahan, dll"
        value={desc}
        onChangeText={setDesc}
        multiline
      />

      <Text style={styles.label}>Gambar (URL)</Text>
      <TextInput
        style={styles.input}
        placeholder="https://example.com/image.jpg"
        value={imageUrl}
        onChangeText={setImageUrl}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Simpan Resep</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF0F0',
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  submitButton: {
    backgroundColor: '#FF6F91',
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
