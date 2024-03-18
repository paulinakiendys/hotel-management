import calculateNights from "../utils/calculateNights";

export default function calculateNightsText(checkInDate, checkOutDate) {
  const nights = calculateNights(checkInDate, checkOutDate);
  const nightText = nights === 1 ? "night" : "nights";
  return { nights, nightText };
}
