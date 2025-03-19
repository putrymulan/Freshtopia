import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList, Modal } from 'react-native';

const featuredImages = [
  { uri: 'https://asset.kompas.com/crops/68zpq5KSYXJYXj3sr0DlVVGcVy8=/0x0:1000x667/750x500/data/photo/2021/11/03/618208c630321.jpg' },
  { uri: 'https://allofresh.id/blog/wp-content/uploads/2023/05/makanan-vegetarian-1-780x470.jpg' },
  { uri: 'https://images.tokopedia.net/img/KRMmCm/2022/7/18/b05c6eb9-79ca-4fae-8da2-f5ba6adb9303.jpg' },
  { uri: 'https://media.istockphoto.com/id/1369489882/id/foto/berbagai-vegan-makanan-protein-nabati.jpg?s=612x612&w=0&k=20&c=6aqoD1GT8PxKzURAquwr3LOzO_lwcbiPzufA2asNmTM=' },
];

const categories = [
  { name: 'Appetizer', image: { uri: 'https://sehatindofarm.com/wp-content/uploads/2023/03/12-Menu-Makanan-Vegetarian-yang-Enak-dan-Mudah-Didapat.webp' } },
  { name: 'Drink', image: { uri: 'https://i.pinimg.com/736x/ee/df/d5/eedfd5e42c0d362a0f3881252f7dee61.jpg' } },
  { name: 'Main Course', image: { uri: 'https://i.pinimg.com/736x/bf/fa/ba/bffabacb113cea54bbb0751f426517cb.jpg' } },
  { name: 'Side Dish', image: { uri: 'https://i.pinimg.com/736x/1e/02/e2/1e02e23f8e4cfe659794efb7f7bcf155.jpg' } },
  { name: 'Snack', image: { uri: 'https://i.pinimg.com/736x/f8/52/d5/f852d541ab1499d6a40c9200336dad26.jpg' } },
  { name: 'Dessert', image: { uri: 'https://i.pinimg.com/736x/25/b6/1e/25b61e3be7aac700560e4cf2cffcde42.jpg' } },
];

export default function Freshtopia() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const openModal = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Freshtopia</Text>
      </View>



      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari bahan-bahan"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Featured Image - Scroll Horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
        {featuredImages.map((item, index) => (
          <Image key={index} source={item} style={styles.featuredImage} />
        ))}
      </ScrollView>

      {/* Categories - Scroll Horizontal */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              categoryStyles.item,
              selectedCategory === item.name && categoryStyles.selectedItem,
            ]}
            onPress={() => handleCategorySelect(item.name)}
          >
            <Text
              style={[
                categoryStyles.title,
                selectedCategory === item.name && categoryStyles.selectedTitle,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Categories - Scroll Vertical */}
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem} onPress={() => openModal(item)}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.categoriesContainer}
      />

      {/* Modal untuk Deskripsi Item */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image source={selectedItem.image} style={styles.modalImage} />
                <Text style={styles.modalTitle}>{selectedItem.name}</Text>
                <Text style={styles.modalDescription}>Deskripsi makanan ini akan segera tersedia!</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Tutup</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>ResepKu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD9D9',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchBar: {
    backgroundColor: 'pink',
    borderRadius: 40,
    paddingHorizontal: 15,
    justifyContent: 'center',
    marginVertical: 15,
  },
  searchInput: {
    height: 40,
  },
  featuredScroll: {
    marginBottom: 15,
  },
  featuredImage: {
    width: 280,
    height: 180,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingBottom: 20, // Supaya tidak tertutup bottom navigation
    paddingHorizontal: 5,
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryItem: {
    flex: 1, // Biar lebih fleksibel
    maxWidth: '48%', // Agar pas 2 kolom
    borderRadius: 12,
    padding: -50, // Tambahkan padding
    marginVertical: 10, // Jarak antar item
    alignItems: 'center',
  },
  categoryImage: {
    width: 150,
    height: 110,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10, // Jarak antara gambar dan teks
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'pink',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalDescription: {
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    backgroundColor: '#FF7676',
    padding: 10,
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  
});

const categoryStyles = StyleSheet.create({
  item: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
    marginBottom: 10,
    minWidth: 100,
  },
  selectedItem: {
    backgroundColor: '#FF7676',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D6D6D',
    textAlign: 'center',
  },
  selectedTitle: {
    color: '#FFFFFF',
  },
});