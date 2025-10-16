<template>
  <l-map style="height: 400px;" :zoom="6" :center="[50.4501, 30.5234]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="© OpenStreetMap"
    />
    <l-marker :lat-lng="[50.4501, 30.5234]">
      <l-popup>Київ — головний склад</l-popup>
    </l-marker>
  </l-map>
</template>

<script setup>
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import 'leaflet/dist/leaflet.css'
</script>