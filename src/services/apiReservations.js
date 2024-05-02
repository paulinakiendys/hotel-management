import { supabase } from "./supabase";

export async function getReservations({ filterParams, sortParams }) {
  try {
    let query = supabase
      .from("reservations")
      .select(
        "id, check_in_date, check_out_date, status, total_price, is_paid, breakfast_price, number_of_guests, breakfast_included, room_rate, rooms(number), guests(first_name, last_name, email)",
        { count: "exact" }
      );

    if (filterParams && filterParams.value !== "all") {
      query = query.eq(filterParams.filter, filterParams.value);
    }

    if (sortParams) {
      query = query.order(sortParams.sort, {
        ascending: sortParams.direction === "asc",
      });
    }

    const { data: reservations, count, error } = await query;

    if (error) {
      throw error;
    }
    return { reservations, count };
  } catch (error) {
    console.error("Error fetching reservations:", error.message);
    throw error;
  }
}

export async function getReservationsAfterDate(date) {
  try {
    const currentDate = new Date();
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
      999
    );
    let query = supabase
      .from("reservations")
      .select("created_at, total_price, breakfast_price", { count: "exact" })
      .gt("created_at", date)
      .lt("created_at", endOfDay.toISOString());

    const { data: reservations, error } = await query;

    if (error) {
      throw error;
    }
    return reservations;
  } catch (error) {
    console.error("Error fetching reservations between dates:", error.message);
    throw error;
  }
}

export async function getStaysAfterDate(date) {
  try {
    const currentDate = new Date();
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
      999
    );
    let query = supabase
      .from("reservations")
      .select("*, guests(first_name, last_name)", { count: "exact" })
      .gt("check_in_date", date)
      .lt("check_out_date", endOfDay.toISOString());

    const { data: reservations, error } = await query;

    if (error) {
      throw error;
    }
    return reservations;
  } catch (error) {
    console.error("Error fetching stays between dates:", error.message);
    throw error;
  }
}

export async function getTodaysReservations() {
  try {
    const currentDate = new Date().toISOString().split("T")[0];
    let query = supabase
      .from("reservations")
      .select("*, guests(first_name, last_name)", { count: "exact" })
      .or(
        `and(status.eq.pending,check_in_date.lte.${currentDate} 23:59:59,check_in_date.gte.${currentDate} 00:00:00),and(status.eq.checked in,check_out_date.lte.${currentDate} 23:59:59,check_out_date.gte.${currentDate} 00:00:00)`
      )
      .order("created_at");

    const { data: reservations, error } = await query;

    if (error) {
      throw error;
    }
    return reservations;
  } catch (error) {
    console.error("Error fetching today's reservations:", error.message);
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

export async function updateReservation({
  reservationId,
  updatedReservationData,
}) {
  try {
    const { data, error } = await supabase
      .from("reservations")
      .update(updatedReservationData)
      .eq("id", reservationId)
      .select();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error updating reservation:", error.message);
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
