// cFC - capitalize First Character
export function cFC(string) {
  var capital = string.charAt(0).toUpperCase() + string.slice(1)
  return capital
}