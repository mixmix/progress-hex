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

const r = 4
var n = 1

setInterval(
  () => {
    const newSvg = h('svg',
      {
        viewBox: '-300 -200 600 400',
        height: '100vh'
      },
      hexGrid({ r, n }).map((vec, i) => Circle({ vec, r, i }))
    )
    newSvg.style.setProperty('width', '100%')
    newSvg.style.setProperty('max-height', '100vh')

    document.body.replaceChild(newSvg, svg)
    svg = newSvg

    n++
  },
  50
)

function Circle ({ vec, r, i }) {
  return h('circle', {
    cx: vec[0],
    cy: vec[1],
    r: r - 1,
    // fill: 'rgb(255, 100, 255)',
    fill: `hsl(${(i / 4 + 180) % 360}, 70%, 70%)`
    // fill: 'rgb(0,0,0)',
    // 'data-dist': vecDist(vec)
  })
}

function vecDist (a, b = [0, 0]) {
  return Math.sqrt(
    (a[0] - b[0]) * (a[0] - b[0]) +
    (a[1] - b[1]) * (a[1] - b[1])
  )
}
