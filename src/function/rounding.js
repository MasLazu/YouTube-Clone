export function rounding(amount) {
  if (amount < 1000) {
    return `${amount}`;
  } else if (amount < 1000000) {
    return `${Math.floor(parseInt(amount) / 1000)} rb`;
  } else if (amount < 1000000000) {
    return `${Math.floor(parseInt(amount) / 1000000)} jt`;
  } else {
    return `${Math.floor(parseInt(amount) / 1000000000)} m`;
  }
}
