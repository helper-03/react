import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import Theme from "./theme";

const HomeScreen = ({ user, onLogout, onOpenChat, onOpenProfile }) => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.username}>{user.username}</Text>
        </View>
        {user.profile_picture ? (
          <Image source={{ uri: user.profile_picture }} style={styles.headerAvatar} />
        ) : (
          <View style={styles.headerAvatarPlaceholder}>
            <Text style={styles.headerAvatarInitial}>{user.username?.[0]?.toUpperCase()}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          {user.profile_picture ? (
            <Image source={{ uri: user.profile_picture }} style={styles.profileImage} />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileImageInitial}>{user.username?.[0]?.toUpperCase()}</Text>
            </View>
          )}
          <View style={styles.profileTextContainer}>
            <Text style={styles.profileName}>{user.username}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Username</Text>
            <Text style={styles.infoValue}>{user.username}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>User ID</Text>
            <Text style={styles.infoValue}>#{user.id}</Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.primaryButton} onPress={onOpenChat}>
            <Text style={styles.buttonIcon}>💬</Text>
            <Text style={styles.primaryButtonText}>Messages</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={onOpenProfile}>
            <Text style={styles.buttonIcon}>👤</Text>
            <Text style={styles.secondaryButtonText}>Profile</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.infoButton} onPress={() => setShowAboutModal(true)}>
          <Text style={styles.infoButtonIcon}>ℹ️</Text>
          <Text style={styles.infoButtonText}>About App</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutButtonText}>Sign out</Text>
        </TouchableOpacity>

        {/* About App Modal */}
        <Modal
          visible={showAboutModal}
          animationType="slide"
          transparent={false}
          onRequestClose={() => setShowAboutModal(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={() => setShowAboutModal(false)}
              >
                <Text style={styles.closeButtonText}>✕ Close</Text>
              </TouchableOpacity>

              <View style={styles.aboutAppCard}>
                {/* App Icon/Picture */}
                <Image 
                  source={require('./assets/rods.jpg')} 
                  style={styles.appIcon}
                />

                {/* App Name */}
                <Text style={styles.appName}>Rodriguez, John Paul, M</Text>

                {/* App Bio/Description */}
                <Text style={styles.appBio}>
                A man with simple taste
                </Text>

                {/* App Address/Info */} 
              

                <View style={styles.appInfoContainer}>
                  <Text style={styles.appInfoLabel}>Age</Text>
                  <Text style={styles.appInfoValue}>20</Text>
                </View>

               

                <View style={styles.appInfoContainer}>
                  <Text style={styles.appInfoLabel}>Address:</Text>
                  <Text style={styles.appInfoValue}>Bein Unido,Bohol</Text>
                </View>

              </View>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Theme.Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.Colors.border,
    ...Theme.Shadows,
  },
  greeting: {
    fontSize: 24,
    color: Theme.Colors.muted,
    fontWeight: '700',
    marginBottom: 4,
  },
  username: {
    fontSize: Theme.Typography.h2,
    fontWeight: Theme.Typography.weightBold,
    color: Theme.Colors.text,
  },
  headerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Theme.Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAvatarInitial: {
    fontSize: 20,
    color: '#fff',
    fontWeight: Theme.Typography.weightBold,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    ...Theme.Shadows,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: Theme.Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  profileImageInitial: {
    fontSize: 28,
    color: '#fff',
    fontWeight: Theme.Typography.weightBold,
  },
  profileTextContainer: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: Theme.Typography.weightBold,
    color: Theme.Colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: Theme.Colors.muted,
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    backgroundColor: Theme.Colors.card,
    borderRadius: 12,
    padding: 14,
    ...Theme.Shadows,
  },
  infoLabel: {
    fontSize: 12,
    color: Theme.Colors.muted,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: Theme.Typography.weightBold,
    color: Theme.Colors.text,
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: Theme.Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    ...Theme.Shadows,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: Theme.Colors.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    ...Theme.Shadows,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  buttonIcon: {
    fontSize: 18,
  },
  infoButton: {
    backgroundColor: Theme.Colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Theme.Colors.border,
  },
  infoButtonIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  infoButtonText: {
    color: Theme.Colors.text,
    fontSize: 15,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: Theme.Colors.danger,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    ...Theme.Shadows,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  closeButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 20,
    backgroundColor: Theme.Colors.danger,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  aboutAppCard: {
    backgroundColor: Theme.Colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    ...Theme.Shadows,
  },
  appIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  appName: {
    fontSize: Theme.Typography.h2,
    fontWeight: Theme.Typography.weightBold,
    color: Theme.Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  appBio: {
    fontSize: Theme.Typography.body,
    color: Theme.Colors.muted,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  appInfoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Theme.Colors.border,
  },
  appInfoLabel: {
    fontSize: Theme.Typography.body,
    color: Theme.Colors.muted,
    fontWeight: Theme.Typography.weightSemibold,
  },
  appInfoValue: {
    fontSize: Theme.Typography.body,
    color: Theme.Colors.text,
    fontWeight: Theme.Typography.weightSemibold,
    marginLeft: 12,
    flex: 1,
    textAlign: 'right',
  },
});

export default HomeScreen;
