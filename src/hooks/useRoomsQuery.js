import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../services/apiRooms";

export default function useRoomsQuery() {
  const {
    isLoading,
    data: rooms = [],
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  return { isLoading, rooms, error };
}
