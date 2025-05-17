import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  Edit2,
  Heart,
  ClipboardText,
  ArrowRight2,
  LogoutCurve,
} from 'iconsax-react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Profile */}
      <View style={styles.profileHeader}>
        <Image
          source={{
            uri: 'https://i.pinimg.com/564x/04/87/4f/04874fbda0e761a7f7b4b70d78501887.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Putri Mulan</Text>
        <Text style={styles.email}>PutriMulan.freshtopia@email.com</Text>

        <TouchableOpacity style={styles.editBtn}>
          <Edit2 size={16} color="#fff" />
          <Text style={styles.editText}>Edit Profil</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <View style={styles.menuSection}>
        <MenuItem icon={<Heart size={20} color="#F06292" />} label="Favorit Saya" />
        <MenuItem icon={<ClipboardText size={20} color="#4CAF50" />} label="Resepku" />
        <MenuItem icon={<ArrowRight2 size={20} color="#2196F3" />} label="Pengaturan Akun" />
        <MenuItem icon={<LogoutCurve size={20} color="#EF5350" />} label="Keluar" />
      </View>
    </ScrollView>
  );
}

function MenuItem({ icon, label }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F0',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFE4E1',
    padding: 20,
    borderRadius: 20,
    elevation: 3,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 18,
    gap: 6,
    marginTop: 8,
  },
  editText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuSection: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 20,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  iconContainer: {
    backgroundColor: '#FFF0F0',
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    marginRight: 12,
  },
  menuLabel: {
    fontSize: 15,
    color: '#333',
  },
});
