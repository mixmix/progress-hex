const h = require('../../lib/h')
const hexGrid = require('../../lib/hex-grid')

document.body.style.setProperty('margin', 0)

const r = 5
var svg = Progress({ r, n: 0 })
document.body.appendChild(svg)

// var n = 1
var n = 150
var progress = 75

function render () {
  const newSvg = Progress({ r, n })
  document.body.replaceChild(newSvg, svg)
  svg = newSvg
}
setInterval(render, 50)
setInterval(() => n++, 50)
setInterval(() => progress++, 90)

function Progress ({ r, n, progress = 0 }) {
  if (progress > n) {
    progress = n
    console.error('progress-hex: look out, your progress should not be exeeding your n')
  }

  const svg = h('svg',
    {
      viewBox: '-300 -200 600 400',
      height: '100vh'
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
    // fill: i <= progress
    //   ? `hsl(${(i / 4 + 180) % 360}, 70%, 70%)`
    //   : 'none',
    // stroke: `hsl(${(i / 4 + 180) % 360}, 70%, 70%)`,
    // 'stroke-width': 1,
    // 'data-dist': vecDist(vec),
    // style: { opacity: i >= progress ? 0.2 : 1 }
  })
}
