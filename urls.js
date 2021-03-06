const grid = require('ol/tilegrid').createXYZ()

const populateTemplate = (template, zxy) => {
  let url = template
  zxy.forEach((n, i) => {
    url = url.replace(new RegExp(`\\$\\{${i}\\}`, 'g'), n)
  })
  return url
}

const invert = (tileCoord, templates, urls) => {
  const inverted = [tileCoord[0], tileCoord[1], Math.pow(2, tileCoord[0]) - tileCoord[2] - 1]
  templates.forEach(template => {
    urls.push(populateTemplate(template, inverted))
  })
}

const xyz = (tileCoord, templates, urls) => {
  templates.forEach(template => {
    urls.push(populateTemplate(template, tileCoord))
  })
}

module.exports = (request, response) => {
  const urls = {tms: [], wmts: [], xyz: []}
  const params = request.body
  const templates = params.templates
  for (let z = params.minz; z <= params.maxz; z++) {
    grid.forEachTileCoord(params.extent, z, tileCoord => {
      const coord = [tileCoord[0], tileCoord[1], - tileCoord[2] - 1]
      invert(coord, templates.tms, urls.tms)
      xyz(coord, templates.wmts, urls.wmts)
      xyz(coord, templates.xyz, urls.xyz)
    })
  }
  response.json(urls)
}