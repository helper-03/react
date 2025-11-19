import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  RefreshControl,
  Image,
} from "react-native";
import { getChatUsers, getUnreadCount } from "./database";
import Theme from "./theme";

const ChatListScreen = ({ currentUser, onSelectUser, onBack }) => {
  const [users, setUsers] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadUsers();
    loadUnreadCount();
  }, []);

  const loadUsers = async () => {
    const userList = await getChatUsers(currentUser.id);
    setUsers(userList);
  };

  const loadUnreadCount = async () => {
    const count = await getUnreadCount(currentUser.id);
    setUnreadCount(count);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadUsers();
    await loadUnreadCount();
    setRefreshing(false);
  };

  const renderUser = ({ item }) => (
    <TouchableOpacity
      style={styles.userCard}
      onPress={() => onSelectUser(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatarContainer}>
        {item.profile_picture ? (
          <Image source={{ uri: item.profile_picture }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.username.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.email} numberOfLines={1}>{item.email}</Text>
      </View>
      <View style={styles.chevron}>
        <Text style={styles.chevronText}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Messages</Text>
        {unreadCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{unreadCount}</Text>
          </View>
        )}
      </View>

      <FlatList
        data={users}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>💬</Text>
            <Text style={styles.emptyText}>No users available to chat</Text>
          </View>
        }
      />
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Theme.Colors.card,
    borderBottomWidth: 1,
    borderBottomColor: Theme.Colors.border,
    ...Theme.Shadows,
  },
  backButton: {
    marginRight: 12,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  backIcon: {
    fontSize: 28,
    color: Theme.Colors.primary,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: Theme.Typography.h2,
    fontWeight: Theme.Typography.weightBold,
    flex: 1,
    color: Theme.Colors.text,
  },
  badge: {
    backgroundColor: Theme.Colors.danger,
    borderRadius: 10,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  listContent: {
    padding: 12,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.Colors.card,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 14,
    ...Theme.Shadows,
  },
  avatarContainer: {
    marginRight: 14,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Theme.Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: Theme.Colors.text,
    marginBottom: 3,
  },
  email: {
    fontSize: 13,
    color: Theme.Colors.muted,
  },
  chevron: {
    marginLeft: 10,
  },
  chevronText: {
    fontSize: 24,
    color: Theme.Colors.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: Theme.Colors.muted,
    textAlign: 'center',
  },
});

export default ChatListScreen;
