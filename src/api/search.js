import http from './_http'

/**
 * 地址解析
 * @param {String} address
 */
async function forwardGeocoding (address) {
  return mapboxForwardGeocoding(address)
}

/**
 * Mapbox地址解析接口
 * @param {String} address
 */
async function mapboxForwardGeocoding (address) { // https://api.mapbox.com/geocoding/v5/mapbox.places/%E5%8C%97%E4%BA%AC.json?access_token=pk.eyJ1Ijoid2luZHloIiwiYSI6ImNpbHdiazZyazAxcTV2Z2tzbnNwcG1xbTMifQ.jz162pjSUZ957Vv_wP6i1A
  const res = await http.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoid2luZHloIiwiYSI6ImNpbHdiazZyazAxcTV2Z2tzbnNwcG1xbTMifQ.jz162pjSUZ957Vv_wP6i1A`)

  if (res.status === 200) {
    return res.data
  }

  return {}
}

export {
  forwardGeocoding
}
