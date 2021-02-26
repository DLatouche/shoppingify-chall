import { createPool } from "mysql"

const twoDigits = (d) => {
  if (d >= 0 && d < 10) return `0${d.toString()}`
  if (d > -10 && d < 0) return `-0${(-1 * d).toString()}`
  return d.toString()
}

const toMySQLDate = (date) =>
  `${date.getUTCFullYear()}-${twoDigits(1 + date.getUTCMonth())}-${twoDigits(date.getUTCDate())} ${twoDigits(
    date.getUTCHours()
  )}:${twoDigits(date.getUTCMinutes())}:${twoDigits(date.getUTCSeconds())}`

const objToArray = (obj) => Object.keys(obj).map((key) => obj[key])

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj))

export { twoDigits, toMySQLDate, objToArray, deepCopy }
