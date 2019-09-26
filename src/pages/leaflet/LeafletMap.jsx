import React, { Component } from 'react'
import './leaflet-map.scss'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default class LeafletMap extends Component {
  constructor (...args) {
    super(...args)

    this.map = null
    this.el = React.createRef()
  }

  componentDidMount () {
    this.map = L.map(this.el.current, {
      center: [39, 116.5],
      zoom: 5
    })

    const layer = L.tileLayer('https://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}')
    layer.addTo(this.map)
  }

  render () {
    return <div ref={this.el} className="map"></div>
  }
}
