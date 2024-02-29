import { supabase } from "./supabase";

export async function getRooms() {
  try {
    const { data: rooms, error } = await supabase.from("rooms").select("*");

    if (error) {
      throw error;
    }

    return rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error.message);
    throw error;
  }
}
