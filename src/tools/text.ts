export function capitalizeFirstLetter(str: string) {
  if (str.length === 0) {
    return str;
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
