export default function calculateNights(checkInDate, checkOutDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const checkInTime = new Date(checkInDate).getTime();
  const checkOutTime = new Date(checkOutDate).getTime();

  const differenceDays = Math.round(
    Math.abs((checkOutTime - checkInTime) / oneDay)
  );
  return differenceDays;
}
