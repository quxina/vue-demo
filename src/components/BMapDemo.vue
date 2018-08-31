<template>
  <div class="map-main">
    <div class="type-bar"></div>
    <baidu-map :center="center" :zoom="12" @ready="init" :scroll-wheel-zoom="true" class="map-wrap" ak="wtb30HwfcKhNlr0kAVH3ZmbsNhjUXv6b">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false"></bm-geolocation>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      <bml-marker-clusterer>
        <bm-marker v-for="(point, index) in markers" @click="clickPoint" :key="index" :position="{lng: point.lng, lat: point.lat}"></bm-marker>
      </bml-marker-clusterer>
      <bm-info-window :show="infoWindow.showInfo" :position="infoWindow.checkedPoint" @clickclose="clickInfoWinBtn" :autoPan="true">
        <div class="info-wrap">
          <div class="info-title">
            金融街购物广场
            <span class="mes-num">{{10}}条消息</span>
          </div>
          <div class="info-content">
            商圈详情:{{infoWindow.checkedPoint.lng}}
          </div>
        </div>
      </bm-info-window>
    </baidu-map>
  </div>
</template>

<script>
import {BaiduMap, BmGeolocation, BmMarker, BmlMarkerClusterer, BmNavigation, BmInfoWindow} from 'vue-baidu-map'
import LocalInfo from './LocalInfo'
export default {
  data () {
    return {
      center: {
        lng: 116.331398,
        lat: 39.897445
      },
      initLocation: false,
      markers: [],
      infoWindow: {
        checkedPoint: {
          lng: 0,
          lat: 0
        },
        showInfo: false
      },
      
    }
  },
  components: {
    BaiduMap,
    BmGeolocation,
    BmMarker,
    BmlMarkerClusterer,
    BmNavigation,
    BmInfoWindow,
    LocalInfo
  },
  mounted() {
    this.addMarker()
    this.addMarker()
  },
  methods: {
    init({BMap, map}) {
      // console.log(BMap, map)
      const _this = this
      const geo = new BMap.Geolocation()
      geo.getCurrentPosition(function(r){
        console.log(r);
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          const convertor = new BMap.Convertor()
          const pointArr = [r.point]
          _this.center.lng = r.point.lng
          _this.center.lat = r.point.lat
        }
        else {

        }
      },{enableHighAccuracy: true})
    },
    addMarker() {
      for(let i = 0; i < 5; i ++) {
        const position = {lng: Math.random() * 20 + 105, lat: Math.random() * 5 + 28}
        this.markers.push(position)
      }
    },
    clickPoint(e) {
      console.log('click point', e.target.point)
      this.infoWindow.showInfo = true
      this.infoWindow.checkedPoint = Object.assign(this.infoWindow.checkedPoint, e.target.point)
    },
    clickInfoWinBtn() {
      this.infoWindow.showInfo = false
    }
  }
}
</script>

<style>
.map-main {
  width: 100%;
  height: 90vh;
}
.type-bar {
  height: 10vh;
}
.map-wrap {
  width: 100%;
  height: 80vh;
}
.anchorBL {
  display: none;
}
</style>
