export const truncate = data => {
  return data.toString().length < 30
    ? data.toString()
    : `${data.toString().slice(0, 30)} ...`
}
