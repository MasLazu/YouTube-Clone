export function extractDuration(codeDuration) {
  if (codeDuration.length == 8) {
    return `${codeDuration.slice(2, 4)}.${codeDuration.slice(5, 7)}`;
  }
  if (codeDuration.length == 7) {
    if (parseInt(codeDuration.slice(2, 4)) < 10) {
      return `${codeDuration.slice(2, 3)}.${codeDuration.slice(4, 6)}`;
    } else {
      return `${codeDuration.slice(2, 4)}.${codeDuration.slice(5, 6)}`;
    }
  }
  if (codeDuration.length == 11) {
    return `${codeDuration.slice(2, 4)}.${codeDuration.slice(
      5,
      7
    )}.${codeDuration.slice(8, 10)}`;
  }
  if (codeDuration.length == 10) {
    if (parseInt(codeDuration.slice(2, 4)) < 10) {
      return `${codeDuration.slice(2, 3)}.${codeDuration.slice(
        4,
        6
      )}.${codeDuration.slice(7, 8)}`;
    } else if (parseInt(codeDuration.slice(5, 7)) < 10) {
      return `${codeDuration.slice(2, 4)}.${codeDuration.slice(
        5,
        6
      )}.${codeDuration.slice(7, 9)}`;
    } else {
      return `${codeDuration.slice(2, 4)}.${codeDuration.slice(
        5,
        7
      )}.${codeDuration.slice(8, 9)}`;
    }
  }
}
