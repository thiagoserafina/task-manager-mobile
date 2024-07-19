import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedTextInput } from "@/components/ThemedInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { environment } from "@/environment";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";
import * as SecureStore from "expo-secure-store";

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios
      .post(environment.API_URL + "/auth/login", {
        username: username,
        password: password,
      })
      .then(async (response) => {
        await SecureStore.setItemAsync("userId", response.data.id);
        await SecureStore.setItemAsync("token", response.data.token);
        onLogin();
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="person" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Login</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText>Username</ThemedText>
        <ThemedTextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />

        <ThemedText>Password</ThemedText>
        <ThemedTextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
        />
        <Button title="Login" color={"green"} onPress={login} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
});
