import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { getMessages, sendMessage, markMessagesAsRead } from "./database";
import Theme from "./theme";

const ChatScreen = ({ currentUser, selectedUser, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    loadMessages();
    markAsRead();

    // Refresh messages every 2 seconds
    const interval = setInterval(loadMessages, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadMessages = async () => {
    const msgs = await getMessages(currentUser.id, selectedUser.id);
    setMessages(msgs);
  };

  const markAsRead = async () => {
    await markMessagesAsRead(selectedUser.id, currentUser.id);
  };

  const handleSend = async () => {
    if (newMessage.trim()) {
      const result = await sendMessage(
        currentUser.id,
        selectedUser.id,
        newMessage.trim()
      );

      if (result.success) {
        setNewMessage("");
        await loadMessages();
        // Scroll to bottom after sending
        setTimeout(() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    }
  };

  const renderMessage = ({ item }) => {
    const isMyMessage = item.sender_id === currentUser.id;

    return (
      <View
        style={[
          styles.messageContainer,
          isMyMessage ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMyMessage ? styles.myBubble : styles.theirBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMyMessage ? styles.myText : styles.theirText,
            ]}
          >
            {item.message}
          </Text>
          <Text
            style={[
              styles.timeText,
              isMyMessage ? styles.myTimeText : styles.theirTimeText,
            ]}
          >
            {new Date(item.created_at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.headerUser}>
            {selectedUser.profile_picture ? (
              <Image source={{ uri: selectedUser.profile_picture }} style={styles.headerAvatarImage} />
            ) : (
              <View style={styles.headerAvatar}>
                <Text style={styles.headerAvatarText}>
                  {selectedUser.username.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text style={styles.headerTitle}>{selectedUser.username}</Text>
          </View>
        </View>

        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No messages yet. Start the conversation!
              </Text>
            </View>
          }
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#CBD5E1"
            value={newMessage}
            onChangeText={setNewMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!newMessage.trim()}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 12,
    paddingVertical: 12,
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
  headerUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Theme.Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  headerAvatarImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    resizeMode: 'cover',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: Theme.Colors.text,
  },
  messagesContainer: {
    padding: 14,
    flexGrow: 1,
  },
  messageContainer: {
    marginBottom: 12,
    maxWidth: '85%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    ...Theme.Shadows,
  },
  myBubble: {
    backgroundColor: Theme.Colors.primary,
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    backgroundColor: Theme.Colors.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  myText: {
    color: '#fff',
  },
  theirText: {
    color: Theme.Colors.text,
  },
  timeText: {
    fontSize: 11,
    marginTop: 4,
  },
  myTimeText: {
    color: 'rgba(255, 255, 255, 0.75)',
    textAlign: 'right',
  },
  theirTimeText: {
    color: Theme.Colors.muted,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: Theme.Colors.muted,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: Theme.Colors.card,
    borderTopWidth: 1,
    borderTopColor: Theme.Colors.border,
    alignItems: 'flex-end',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: Theme.Colors.border,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 15,
    backgroundColor: '#F5F7FA',
    color: Theme.Colors.text,
  },
  sendButton: {
    backgroundColor: Theme.Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
    ...Theme.Shadows,
  },
  sendButtonDisabled: {
    backgroundColor: '#CBD5E1',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default ChatScreen;
