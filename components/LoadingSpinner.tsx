import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const LoadingSpinner = () => {
  const { colors } = useTheme();
  const homestyles = createHomeStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homestyles.container}
    >
      <View style={homestyles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={homestyles.loadingText}>Loading your todos...</Text>
      </View>
    </LinearGradient>
  );
};

export default LoadingSpinner;
