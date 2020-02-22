import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import * as proj from 'ol/proj'
import 'ol/ol.css'
import './index.scss'

export default class OpenLayersMap extends Component {
  constructor (props) {
    super(props)
    this.el = React.createRef()
  }

  componentDidMount () {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
          })
        })
      ],
      view: new View({
        center: proj.fromLonLat([116.5, 39]),
        zoom: 5
      })
    })
  }

  render () {
    return <div id="map" ref={this.el} className="openlayers-map"></div>
  }
}
