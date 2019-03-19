function scale (a, k) {
  return [k * a[0], k * a[1]]
}

function add (a, b) {
  return [a[0] + b[0], a[1] + b[1]]
}

function subtract (a, b) {
  return add(a, scale(b, -1))
}

module.exports = {
  scale,
  add,
  subtract
}
