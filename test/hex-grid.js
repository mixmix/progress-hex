const test = require('tape')
const hexGrid = require('../lib/hex-grid')

test('hex-grid: some rings', t => {
  const zero = hexGrid({ r: 1, rings: 0 })
  t.deepEqual(zero, [[0, 0]], 'zero rings = a single dot')

  const one = hexGrid({ r: 1, rings: 1 })
  t.deepEqual(one[0], [0, 0], 'one rings, starting with center')
  t.equal(one.length, 7, 'one rings = 7 points')
  t.end()
})

test('hex-grid: n points', t => {
  const one = hexGrid({ r: 1, n: 1 })
  t.deepEqual(one, [[0, 0]], 'zero rings = a single dot')

  const six = hexGrid({ r: 1, n: 6 })
  t.deepEqual(six[0], [0, 0], 'n 6, starting with center')
  t.equal(six.length, 6, 'n 6 = 6 points')

  const many = hexGrid({ r: 1, n: 36 })
  t.equal(many.length, 36, 'n 36 = 36 points')
  t.end()
})

test('hex-grid: cx cy', t => {
  const one = hexGrid({ r: 1, n: 1, cx: 3, cy: 4 })
  t.deepEqual(one, [[3, 4]], 'zero rings = a single dot')

  t.end()
})
