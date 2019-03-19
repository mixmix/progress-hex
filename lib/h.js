function h (tag, opts = {}, children = []) {
  if (Array.isArray(opts)) return h(tag, {}, opts)

  if (typeof tag !== 'string') throw Error('h require valid tag string')
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag)

  if (tag === 'svg') {
    if (!opts.viewBox) throw Error('svg objects require viewBox')
    if (!opts.height && !opts.width) throw Error('svg requires width or height')
    el.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  }

  for (var key in opts) {
    switch (key) {
      case 'style':
        Object.keys(opts[key])
          .forEach(attr => {
            el.style.setProperty(attr, opts[key][attr])
            // el.style[attr] = opts[key][attr]
          })
        break

      default:
        el.setAttribute(key, opts[key])
    }
  }

  children.forEach(child => {
    el.appendChild(child)
  })

  return el
}

module.exports = h
