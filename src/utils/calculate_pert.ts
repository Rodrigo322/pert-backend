export function calculate_pert(
  optimistic: number,
  nominal: number,
  pessimistic: number
) {
  let calculate_nominal = nominal * 4;
  let calculate_optimistic = optimistic + calculate_nominal;
  let result = (calculate_optimistic + pessimistic) / 6;
  return result;
}
