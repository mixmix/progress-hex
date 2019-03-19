const { scale, add, subtract } = require('./vec2')

module.exports = function hexGrid ({ r, cx = 0, cy = 0, n, rings }) {
  if (n === undefined && rings === undefined) throw Error('hex-grid expects either n or rings')
  if (n && rings) throw Error('hex-grid expects either n or rings')
  if (n && !Number.isInteger(n)) throw Error('hex-grid expects integer value of n')
  if (rings && !Number.isInteger(rings)) throw Error('hex-grid expects integer value of rings')

  var results = [[0, 0]]

  const verticesPrototype = [
    [0, 2 * r],
    [Math.sqrt(3) * r, r],
    [Math.sqrt(3) * r, -r],
    [0, -2 * r],
    [-Math.sqrt(3) * r, -r],
    [-Math.sqrt(3) * r, r]
  ]

  function buildRing (ring) {
    const result = verticesPrototype
      .map(vec => scale(vec, ring))
      .reduce((soFar, _, j, vertices) => {
        var start = vertices[j]
        var end = vertices[j + 1] || vertices[0] // loop for last vertex!

        var step = scale(subtract(end, start), 1 / ring)

        for (var k = 0; k < ring; k++) {
          soFar.push(add(start, scale(step, k)))
        }
        return soFar
      }, [])
      // .sort((a, b) => Math.random() > 0.5 ? -1 : +1)
    const one = result.shift()
    result.push(one)
    return result
  }

  if (rings) {
    for (var i = 1; i <= rings; i++) {
      results = [...results, ...buildRing(i)]
    }
  }
  if (n) {
    for (var j = 1; results.length < n; j++) {
      results = [...results, ...buildRing(j).slice(0, n - results.length)]
    }
  }

  return results.map(coord => [coord[0] + cx, coord[1] + cy])
}
