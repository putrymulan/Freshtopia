import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal } from 'react-native';
import SearchBar from './SearchBar';
import FeaturedImages from './FeaturedImages';
import CategoryList from './CategoryList';
import ModalDetail from './ModalDetail';
import BottomNav from './BottomNav';

const categories = [
  { name: 'Appetizer', image: { uri: 'https://sehatindofarm.com/wp-content/uploads/2023/03/12-Menu-Makanan-Vegetarian-yang-Enak-dan-Mudah-Didapat.webp' } },
  { name: 'Drink', image: { uri: 'https://i.pinimg.com/736x/ee/df/d5/eedfd5e42c0d362a0f3881252f7dee61.jpg' } },
  { name: 'Main Course', image: { uri: 'https://i.pinimg.com/736x/bf/fa/ba/bffabacb113cea54bbb0751f426517cb.jpg' } },
];

export default function Freshtopia() {
  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Freshtopia</Text>
      <SearchBar search={search} setSearch={setSearch} />
      <FeaturedImages />
      <FlatList
        data={categories}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <CategoryList category={item} onSelect={() => setSelectedItem(item)} />
        )}
      />
      <ModalDetail item={selectedItem} setSelectedItem={setSelectedItem} />
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD9D9',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});