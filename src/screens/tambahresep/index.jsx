import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import axios from 'axios';

export default function AddRecipeForm() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async () => {
    if (!title || !desc || !imageUrl) {
      Alert.alert('Gagal', 'Semua field wajib diisi!');
      return;
    }

    try {
      const response = await axios.post('https://68353315cd78db2058c08b0d.mockapi.io/api/resep', {
        title,
        description: desc,
        image: imageUrl,
      });

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Sukses', `Resep "${title}" berhasil ditambahkan ke server!`);
        setTitle('');
        setDesc('');
        setImageUrl('');
      } else {
        Alert.alert('Gagal', 'Terjadi kesalahan saat mengirim data!');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Gagal mengirim data ke server.');
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
