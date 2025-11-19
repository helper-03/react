import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import Theme from "./theme";

const LoginScreen = ({ onLogin, onNavigateToRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await onLogin(username.trim(), password);
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>

        <Image
            source={require("./assets/rods.jpg")}
            style={styles.logo}
            resizeMode="contain"
          />
        <View style={styles.formContainer}>
          
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

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
            placeholder="Password"
            placeholderTextColor="#CBD5E1"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={onNavigateToRegister}
          >
            <Text style={styles.linkText}>Don't have an account? Register</Text>
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
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.Colors.border,
    padding: 14,
    marginBottom: 14,
    borderRadius: 999,
    fontSize: Theme.Typography.body,
    backgroundColor: Theme.Colors.card,
    ...Theme.Shadows,
  },
  button: {
    backgroundColor: Theme.Colors.primary,
    padding: 14,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 8,
    ...Theme.Shadows,
  },
  buttonDisabled: {
    backgroundColor: "#cbd5e1",
  },
  buttonText: {
    color: "#fff",
    fontSize: Theme.Typography.body,
    fontWeight: Theme.Typography.weightBold,
  },
  linkButton: {
    marginTop: 18,
    alignItems: "center",
  },
  linkText: {
    color: Theme.Colors.primary,
    fontSize: 14,
  },
  formContainer: {
    padding: 26,
    backgroundColor: Theme.Colors.card,
    margin: 18,
    borderRadius: Theme.Metrics.radius,
    ...Theme.Shadows,
  },
  logo: {
    width: 130,
    height: 130,
    alignSelf: "center",
    marginBottom: 12,
    borderRadius: 70,
  },
});

export default LoginScreen;
