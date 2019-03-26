const h = require('./lib/h')
const hexGrid = require('./lib/hex-grid')

module.exports = function Progress (opts) {
  var {
    r = 5, // the radius of each hex cell
    n, // how many dots to draw!
    progress = 0 // how many are "done"
  } = opts

  if (isNaN(n)) throw Error('progress-hex: n must be a Number', n)
  if (isNaN(progress)) throw Error('progress-hex: progress must be a Number', progress)

  n = Math.floor(n)
  progress = Math.floor(progress)

  if (progress > n) {
    console.error(`progress-hex: progress ${progress}, n ${n}`)
    progress = n
  }

  const svg = h('svg',
    {
      viewBox: '-300 -200 600 400',
      // height: '100vh'
      height: '400'
    },
    hexGrid({ r, n }).map((vec, i) => Circle({ vec, r, i, progress }))
  )
  svg.style.setProperty('width', '100%')
  svg.style.setProperty('max-height', '100vh')

  return svg
}

function Circle ({ vec, r, i, progress }) {
  return h('circle', {
    cx: vec[0],
    cy: vec[1],
    r: i <= progress ? r - 1 : 2,
    fill: `hsl(${(i / 4 + 180) % 360}, 70%, 70%)`
  })
}
