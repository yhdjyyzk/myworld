import React, { Component } from 'react'

import * as Cesium from 'cesium/Cesium'
import 'cesium/Widgets/widgets.css'
import './cesiumGlobal.scss'

export default class CesiumGlobal extends Component {
  constructor (props) {
    super(props)
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(89.5, 20.4, 110.4, 61.2)
    this.viewer = null
  }

  componentDidMount () {
    this.viewer = new Cesium.Viewer('map', {
      timeline: false,
      vrButton: false,
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        url: 'https://mt2.google.cn/vt/lyrs=y&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}'
      })
    })

    this.viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(116.5, 39.8, 100000)
    })
  }

  render () {
    return <div id='map' className='map'></div>
  }
}
