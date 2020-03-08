import React, { PureComponent } from 'react'
// antd
import { Select } from 'antd'

// ol
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

// custom
import AddressSearch from '../../component/AddressSearch'
import './index.scss'
import posImg from '../../assets/position.png'

const { Option } = Select

// 地图风格
const mapStyle = [
  {
    name: '街道',
    s: 'm'
  },
  {
    name: '带地形街道',
    s: 'p'
  },
  {
    name: '不带地形街道',
    s: 'r'
  },
  {
    name: '无标注卫星地图',
    s: 's'
  },
  {
    name: '地形图',
    s: 't'
  },
  {
    name: '有标注卫星地图',
    s: 'y'
  }
]

const defaultStyle = 'y'

/**
 * OpenLayers 加载地图的组件
 */
export default class OpenLayersMap extends PureComponent {
  constructor (props) {
    super(props)
    this.el = React.createRef()

    this.onSelectPlace = this.onSelectPlace.bind(this)
    this.onClear = this.onClear.bind(this)
    this.onSelectStyle = this.onSelectStyle.bind(this)
  }

  componentDidMount () {
    this.tileLayer = new TileLayer({
      source: new XYZ({
        url: this.getMapUrl(defaultStyle)
      })
    })
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
        this.tileLayer
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
        <div className='header'>
          <AddressSearch onSelectPlace={this.onSelectPlace} onClear={this.onClear} />
          <Select defaultValue={defaultStyle} style={{ width: '160px' }} onChange={this.onSelectStyle}>
            {
              mapStyle.map(item => {
                return <Option value={item.s} key={item.s}>{item.name}</Option>
              })
            }
          </Select>
        </div>
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

  /**
   * 设置地图的风格
   * @param {String} value 地图style
   */
  onSelectStyle (value) {
    this.tileLayer.getSource().setUrl(this.getMapUrl(value))
  }

  // -----------
  /**
   * 生成地图的url
   * @param {Style}} style
   */
  getMapUrl (style) {
    return `https://mt{0-3}.google.cn/vt/lyrs=${style}&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}`
  }
}
