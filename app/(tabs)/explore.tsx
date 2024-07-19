import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet, Button, TextInput } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect, useState } from "react";
import axios from "axios";
import { environment } from "@/environment";
import * as SecureStore from "expo-secure-store";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
}

export default function TabTwoScreen() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    SecureStore.getItemAsync("userId").then((userId) => {
      if (!userId) return;
      setUserId(userId);
    });
    SecureStore.getItemAsync("token").then((token) => {
      if (!token) return;
      setToken(token);
    });
  }, []);

  const getTasks = async () => {
    axios
      .get(environment.API_URL + "/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setTasks(response.data);
      });
  };

  async function addTask() {
    await axios.post(
      environment.API_URL + "/tasks/" + userId,
      {
        title: taskTitle,
        description: taskDescription,
        completed: false,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Ionicons size={310} name="add-circle" style={styles.headerImage} />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tasks</ThemedText>
      </ThemedView>
      <ThemedView>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <TextInput
          placeholder="Description"
          style={styles.input}
          value={taskDescription}
          onChangeText={setTaskDescription}
        />
        <Button title="Add" color={"green"} onPress={addTask} />
        <Button title="Get tasks" color={"blue"} onPress={getTasks} />
      </ThemedView>

      <ThemedView>
        {tasks.map((task) => (
          <ThemedText key={task.id}>
            {task.title} - {task.description}
          </ThemedText>
        ))}
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
    flexDirection: "row",
    gap: 8,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    color: "white",
  },
});
