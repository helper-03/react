import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, SafeAreaView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Theme from './theme';

const ProfileScreen = ({ user, onBack, onUpdateProfile }) => {
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.6,
        base64: false,
      });

      let uri = null;
      if (result && result.assets && result.assets.length > 0) {
        uri = result.assets[0].uri;
      } else if (result && (result.uri || result.uri === '')) {
        uri = result.uri;
      } else if (result && typeof result.cancelled === 'boolean' && result.cancelled === false && result.uri) {
        uri = result.uri;
      }

      if (uri) {
        setLoading(true);
        const res = await onUpdateProfile(user.id, uri);
        setLoading(false);
        if (res.success) {
          Alert.alert('Success', 'Profile picture updated');
        } else {
          Alert.alert('Error', res.error || 'Failed to update profile');
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Could not pick image');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          {user.profile_picture ? (
            <Image source={{ uri: user.profile_picture }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Text style={styles.avatarPlaceholderText}>{user.username?.[0]?.toUpperCase()}</Text>
            </View>
          )}

          <Text style={styles.username}>{user.username}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>

        <TouchableOpacity style={styles.changeButton} onPress={pickImage} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.changeButtonText}>Change Profile Picture</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.Colors.background },
  content: { padding: 22, alignItems: 'center' },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  backText: { color: Theme.Colors.primary, fontSize: 16, fontWeight: '600' },
  header: { alignItems: 'center', marginTop: 10 },
  avatar: { width: Theme.Metrics.avatarLarge, height: Theme.Metrics.avatarLarge, borderRadius: Theme.Metrics.avatarLarge/2, marginBottom: 12, backgroundColor: Theme.Colors.card, ...Theme.Shadows },
  avatarPlaceholder: { backgroundColor: '#E6EEF8', alignItems: 'center', justifyContent: 'center' },
  avatarPlaceholderText: { fontSize: 44, color: Theme.Colors.muted },
  username: { fontSize: Theme.Typography.h2, fontWeight: Theme.Typography.weightBold, marginTop: 6, color: Theme.Colors.text },
  email: { fontSize: Theme.Typography.small, color: Theme.Colors.muted, marginTop: 4 },
  changeButton: { marginTop: 20, backgroundColor: Theme.Colors.primary, padding: 14, borderRadius: 999, ...Theme.Shadows },
  changeButtonText: { color: '#fff', fontSize: Theme.Typography.body, fontWeight: Theme.Typography.weightBold },
});

export default ProfileScreen;
