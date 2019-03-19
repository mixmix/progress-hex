const h = require('../../lib/h')
const hexGrid = require('../../lib/hex-grid')

document.body.style.setProperty('margin', 0)

var svg = h('svg', {
  viewBox: '-300 -200 600 400',
  height: '100vh'
})
svg.style.setProperty('width', '100%')
svg.style.setProperty('max-height', '100vh')
document.body.appendChild(svg)

const r = 5
// var n = 1
var n = 150
var progress = 75

setInterval(
  () => n++,
  50
)

setInterval(
  () => progress++,
  90
)

setInterval(
  () => {
    const newSvg = h('svg',
      {
        viewBox: '-300 -200 600 400',
        height: '100vh'
      },
      hexGrid({ r, n }).map((vec, i) => Circle({ vec, r, i, progress }))
    )
    newSvg.style.setProperty('width', '100%')
    newSvg.style.setProperty('max-height', '100vh')

    document.body.replaceChild(newSvg, svg)
    svg = newSvg
  },
  50
)

function Circle ({ vec, r, i, progress }) {
  return h('circle', {
    cx: vec[0],
    cy: vec[1],
    r: i <= progress ? r - 1 : 2,
    fill: `hsl(${(i / 4 + 180) % 360}, 70%, 70%)`
    // fill: i <= progress
    //   ? `hsl(${(i / 4 + 180) % 360}, 70%, 70%)`
    //   : 'none',
    // stroke: `hsl(${(i / 4 + 180) % 360}, 70%, 70%)`,
    // 'stroke-width': 1,
    // 'data-dist': vecDist(vec),
    // style: { opacity: i >= progress ? 0.2 : 1 }
  })
}

function vecDist (a, b = [0, 0]) {
  return Math.sqrt(
    (a[0] - b[0]) * (a[0] - b[0]) +
    (a[1] - b[1]) * (a[1] - b[1])
  )
}
