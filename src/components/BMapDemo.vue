<template>
  <div class="map-main">
    <div class="type-bar"></div>
    <baidu-map :center="center" :zoom="12" @ready="init" class="map-wrap" ak="wtb30HwfcKhNlr0kAVH3ZmbsNhjUXv6b">
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="false"></bm-geolocation>
      <bm-marker :position="center" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
      <bml-marker-clusterer>
        <bm-marker v-for="(point, index) in markers" @click="clickPoint" :key="index" :position="{lng: point.lng, lat: point.lat}"></bm-marker>
      </bml-marker-clusterer>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-info-window :show="true" :position="center">
        <local-info></local-info>
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
      checkedPoint: {
        lng: 0,
        lat: 0
      }
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
          convertor.translate(pointArr, 1, 5, _this.translateCb.bind(_this))
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
    translateCb(data) {
      console.log('converte finish', data)
      if(data.status === 0) {
        console.log('finish', data.points[0])
        this.center.lng = data.points[0].lng
        this.center.lat = data.points[0].lat
      }
    },
    clickPoint(e) {
      console.log(e)
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
