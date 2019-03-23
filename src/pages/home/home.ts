import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { maptoken } from './../../../www/assets/maptoken';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 37.75;
  lng = -122.41;
  data =[[37.75, -122.41], [37.72, -122.41], [37.75, -122.31],];
  constructor(public navCtrl: NavController) {
    mapboxgl.accessToken = maptoken.accessToken;
  }

  ionViewDidLoad(){
this.buildMap();
console.log(mapboxgl.accessToken);
  }

  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });
    this.map.on('load', function() {

      this.map.addSource('trees', {
        type: 'geojson',
        data: './trees.geojson'
      });
      // add heatmap layer here
      // add circle layer here
    });

console.log(this.map);
    }
  }
