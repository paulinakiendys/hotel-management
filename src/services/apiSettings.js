import { supabase } from "./supabase";

export async function getSettings() {
  try {
    let { data: settings, error } = await supabase
      .from("settings")
      .select("*")
      .single();
    if (error) {
      throw error;
    }

    return settings;
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw error;
  }
}

export async function updateSettings(updatedSettingsData) {
  try {
    const { data, error } = await supabase
      .from("settings")
      .update(updatedSettingsData)
      .eq("id", 1)
      .select();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error updating settings:", error.message);
    throw error;
  }
}
