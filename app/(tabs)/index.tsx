import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";

import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { toggleDarkMode, colors } = useTheme();

  const homestyles = createHomeStyles(colors);
  const todos = useQuery(api.todo.getTodos);
  const toggleTodo = useMutation(api.todo.toggleTodo);
  const deleteTodo = useMutation(api.todo.deleteTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;
  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      console.log("Error toggling todo", error);
      Alert.alert("Error", "Failed to toggle todo");
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const renderTodoItem = ({ item }: { item: Todo }) => {
    return (
      <View style={homestyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homestyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={homestyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
              style={[
                homestyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={homestyles.todoTextContainer}>
            <Text
              style={[
                homestyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.6,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={homestyles.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homestyles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homestyles.actionButton}
                >
                  <Ionicons name="trash" size={14} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homestyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homestyles.safeArea}>
        <Header />
        <TodoInput />
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={renderTodoItem}
          style={homestyles.todoList}
          contentContainerStyle={homestyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsHorizontalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
