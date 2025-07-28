import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

const TodoInput = () => {
  const { colors } = useTheme();
  const homestyles = createHomeStyles(colors);

  const [newTodo, setNewTodo] = useState("");
  const addTodo = useMutation(api.todo.addTodo);
  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      try {
        await addTodo({ text: newTodo.trim() });
        setNewTodo("");
      } catch (error) {
        console.log("Error adding a todo", error);
        Alert.alert("error", "Failed to add todo");
      }
    }
  };
  return (
    <View style={homestyles.inputSection}>
      <View style={homestyles.inputWrapper}>
        <TextInput
          style={homestyles.input}
          placeholder="What needs to be done?"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          multiline
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              homestyles.addButton,
              !newTodo.trim() && homestyles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color={colors.text} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
