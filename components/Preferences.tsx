import { createSettingsStyles } from "@/assets/styles/settings.styles";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Switch, Text, View } from "react-native";

const Preferences = () => {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const settingsStyles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.surface}
      style={settingsStyles.section}
    >
      <Text style={settingsStyles.sectionTitle}>Preferences</Text>

      {/* Dark Mode */}
      <View style={settingsStyles.actionLeft}>
        {/* <View style={settingsStyles.settingLeft}> */}
        <LinearGradient
          colors={colors.gradients.primary}
          style={[settingsStyles.settingIcon, { marginBottom: 20 }]}
        >
          <Ionicons name="moon" size={20} color="#fff" style={{ padding: 4 }} />
        </LinearGradient>
        {/* </View> */}

        <Switch
          style={{ paddingLeft: 190, marginBottom: 0 }}
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? colors.primary : "#767577"}
          trackColor={{
            false: "#767577",
            true: colors.primary,
          }}
          ios_backgroundColor={"#3e3e3e"}
        />
      </View>
    </LinearGradient>
  );
};

export default Preferences;
