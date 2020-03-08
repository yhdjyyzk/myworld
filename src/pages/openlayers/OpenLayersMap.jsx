import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'
import { defaults as defaultControls, ScaleLine, FullScreen, ZoomSlider } from 'ol/control'
import * as proj from 'ol/proj'
import { Icon, Style } from 'ol/style'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import 'ol/ol.css'
import './index.scss'
import posImg from '../../assets/position.png'

import AddressSearch from '../../component/AddressSearch'

export default class OpenLayersMap extends Component {
  constructor (props) {
    super(props)
    this.el = React.createRef()

    this.onSelectPlace = this.onSelectPlace.bind(this)
    this.onClear = this.onClear.bind(this)
  }

  componentDidMount () {
    this.map = new Map({
      target: 'map',
      controls: defaultControls({
        zoomOptions: {
          className: 'my-ol-zoom'
        }
      }).extend([
        new ScaleLine({
          units: 'metric'
        }),
        new FullScreen(),
        new ZoomSlider({})
      ]),
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://mt{0-3}.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
          })
        })
      ],
      view: new View({
        center: proj.fromLonLat([116.5, 39]),
        zoom: 5
      })
    })

    this.vectorSource = new VectorSource()
    this.vectorLayer = new VectorLayer({
      source: this.vectorSource
    })

    this.map.addLayer(this.vectorLayer)
  }

  render () {
    return (
      <div className="map-container">
        <div id="map" ref={this.el} className="openlayers-map"></div>
        <AddressSearch onSelectPlace={this.onSelectPlace} onClear={this.onClear}/>
      </div>
    )
  }

  /**
   * 选择一个地点
   * @param {} item
   */
  onSelectPlace (item) {
    if (item) {
      this.map.getView().animate({
        duration: 1200,
        center: proj.fromLonLat(item.center),
        zoom: 16
      })

      const point = new Feature({
        geometry: new Point(proj.fromLonLat(item.center))
      })
      point.setStyle(new Style({
        image: new Icon({
          src: posImg,
          anchor: [0.5, 1],
          scale: 0.3
        })
      }))
      this.vectorSource.clear()
      this.vectorSource.addFeature(point)
    }
  }

  /**
   * 清除地点
   */
  onClear () {
    this.vectorSource.clear()
  }
}
