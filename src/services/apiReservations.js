import { supabase } from "./supabase";

export async function getReservations() {
  try {
    const {
      data: reservations,
      count,
      error,
    } = await supabase
      .from("reservations")
      .select(
        "id, check_in_date, check_out_date, status, total_price, rooms(number), guests(first_name, last_name, email)",
        { count: "exact" }
      );

    if (error) {
      throw error;
    }
    return { reservations, count };
  } catch (error) {
    console.error("Error fetching reservations:", error.message);
    throw error;
  }
}

export async function getReservation(reservationId) {
  try {
    const { data: reservation, error } = await supabase
      .from("reservations")
      .select("*, rooms(*), guests(*)")
      .eq("id", reservationId)
      .single();

    if (error) {
      throw error;
    }

    if (!reservation) {
      throw new Error(`Reservation with ID ${reservationId} not found`);
    }

    return reservation;
  } catch (error) {
    console.error(
      `Error fetching reservation with ID ${reservationId}:`,
      error.message
    );
    throw error;
  }
}

export async function deleteReservation(reservationId) {
  try {
    const { error } = await supabase
      .from("reservations")
      .delete()
      .eq("id", reservationId);

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error("Error deleting reservation:", error.message);
    throw error;
  }
}
