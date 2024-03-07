import { supabase, supabaseUrl } from "./supabase";
import { v4 as uuidv4 } from "uuid";

export async function addRoom(roomData) {
  try {
    let imageUrl = roomData.image;

    if (roomData.image instanceof File) {
      const { data: fileData, error: fileError } = await supabase.storage
        .from("rooms")
        .upload(`image-${uuidv4()}`, roomData.image);

      if (fileError) {
        throw fileError;
      }

      imageUrl = `${supabaseUrl}/storage/v1/object/public/${fileData.fullPath}`;
    }

    const { data, error } = await supabase
      .from("rooms")
      .insert([
        {
          ...roomData,
          image: imageUrl,
        },
      ])
      .select();

    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error adding room:", error.message);
    throw error;
  }
}

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

export async function updateRoom(roomId, updatedRoomData) {
  try {
    if (updatedRoomData.image instanceof File) {
      const { data: fileData, error: fileError } = await supabase.storage
        .from("rooms")
        .upload(`image-${uuidv4()}`, updatedRoomData.image);

      if (fileError) {
        throw fileError;
      }

      updatedRoomData.image = `${supabaseUrl}/storage/v1/object/public/${fileData.fullPath}`;
    }

    const { data, error } = await supabase
      .from("rooms")
      .update(updatedRoomData)
      .eq("id", roomId)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating room:", error.message);
    throw error;
  }
}

export async function deleteRoom(roomId) {
  try {
    const { error } = await supabase.from("rooms").delete().eq("id", roomId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting room:", error.message);
    throw error;
  }
}
