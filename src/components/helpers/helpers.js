import _ from 'lodash'

// Capitalize first character
export function cFC(string) {
  var capital = string.charAt(0).toUpperCase() + string.slice(1)
  return capital
}

// Get the unique values of a parameter
export function unique(Data, parameter) {
  const sortPar = _.chain(Data)
  const uniquePar = sortPar.map(function(par) {
    return par[parameter]
  })
    .sort()
    .flatten()
    .uniq()
    .value()
  return uniquePar
}
