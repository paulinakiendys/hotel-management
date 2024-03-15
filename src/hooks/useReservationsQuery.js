import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../services/apiReservations";
import { useSearchParams } from "react-router-dom";

export default function useReservationsQuery() {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status") || "all";
  const sort = searchParams.get("sort") || "check_in_date";
  const dir = searchParams.get("dir") || "asc";

  const filterParams = { filter: "status", value: status };
  const sortParams = { sort: sort, direction: dir };

  const {
    isLoading,
    data: { reservations = [], count } = {},
    error,
  } = useQuery({
    queryKey: ["reservations", filterParams, sortParams],
    queryFn: () => getReservations({ filterParams, sortParams }),
  });

  return { isLoading, reservations, count, error };
}
