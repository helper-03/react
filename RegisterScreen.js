import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Theme from "./theme";

const RegisterScreen = ({ onRegister, onNavigateToLogin }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters long");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await onRegister(
        username.trim(),
        email.trim(),
        password,
        profilePicture
      );
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permissions required", "Permission to access media library is required to set a profile picture.");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.6,
        base64: false,
      });

      // Handle both new and older result shapes:
      // New: { canceled: boolean, assets: [{ uri, ... }] }
      // Old: { cancelled: boolean, uri: '...' }
      if (result && result.assets && result.assets.length > 0) {
        setProfilePicture(result.assets[0].uri);
      } else if (result && (result.uri || result.uri === '')) {
        setProfilePicture(result.uri);
      } else if (result && typeof result.cancelled === 'boolean' && result.cancelled === false && result.uri) {
        setProfilePicture(result.uri);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Could not pick image");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Create account</Text>
          <Text style={styles.subtitle}>Start connecting with others</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#CBD5E1"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#CBD5E1"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#CBD5E1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#CBD5E1"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.avatar} />
            ) : (
              <Text style={styles.imagePickerText}>Add profile photo</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Registering..." : "Register"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={onNavigateToLogin}
          >
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    padding: 26,
    backgroundColor: Theme.Colors.card,
    margin: 18,
    borderRadius: Theme.Metrics.radius,
    ...Theme.Shadows,
  },
  title: {
    fontSize: Theme.Typography.h1,
    fontWeight: Theme.Typography.weightBold,
    marginBottom: 6,
    textAlign: "center",
    color: Theme.Colors.text,
  },
  subtitle: {
    fontSize: Theme.Typography.small,
    color: Theme.Colors.muted,
    textAlign: 'center',
    marginBottom: 18,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.Colors.border,
    padding: 14,
    marginBottom: 14,
    borderRadius: 999,
    fontSize: Theme.Typography.body,
    backgroundColor: Theme.Colors.card,
  },
  button: {
    backgroundColor: Theme.Colors.primary,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 10,
    ...Theme.Shadows,
  },
  buttonDisabled: {
    backgroundColor: "#cbd5e1",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  linkButton: {
    marginTop: 18,
    alignItems: "center",
  },
  linkText: {
    color: Theme.Colors.primary,
    fontSize: 14,
  },
  imagePicker: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: Theme.Metrics.radius,
    borderWidth: 1,
    borderColor: Theme.Colors.border,
    backgroundColor: Theme.Colors.card,
    padding: 12,
    ...Theme.Shadows,
  },
  imagePickerText: {
    color: Theme.Colors.muted,
    fontSize: 14,
    fontWeight: '600',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
});

export default RegisterScreen;
