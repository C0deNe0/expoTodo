import { createHomeStyles } from "@/assets/styles/home.styles";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const { colors } = useTheme();
  const homestyles = createHomeStyles(colors);
  const todos = useQuery(api.todo.getTodos);
  const completedCount = todos
    ? todos.filter((todo) => todo.isCompleted).length
    : 0;
  const totalCount = todos ? todos.length : 0;

  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <View style={homestyles.header}>
      <View style={homestyles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={homestyles.iconContainer}
        >
          <Ionicons name="flash-outline" size={28} color="#ffffff" />
        </LinearGradient>
        <View style={homestyles.titleTextContainer}>
          <Text style={homestyles.title}>Today&apos;s Task 👀 </Text>
          <Text style={homestyles.subtitle}>
            {completedCount} of {totalCount} completed
          </Text>
        </View>
      </View>

      <View style={homestyles.progressContainer}>
        <View style={homestyles.progressBarContainer}>
          <View style={homestyles.progressBar}>
            <LinearGradient
              colors={colors.gradients.success}
              style={[
                homestyles.progressFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>
          <Text style={homestyles.progressText}>
            {" "}
            {Math.round(progressPercentage)}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
