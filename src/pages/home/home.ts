import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { maptoken } from './../../../www/assets/maptoken';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: mapboxgl.Map;
  peopleData: JSON;
  style = 'mapbox://styles/mapbox/outdoors-v9';
  lat = 35.4;
  lng = -81.8;
  constructor(public navCtrl: NavController, private httpClient: HttpClient) {
    mapboxgl.accessToken = maptoken.accessToken;
    this.map = null;
  }

  ionViewDidLoad(){
    this.getData();
    
  }
  getData(){
    
    this.httpClient.get('http://127.0.0.1:5002/people').subscribe(data => {
      var people = data as JSON;
      console.log(people);
      var map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
      });
  
      map.on('load', function () {
        map.addSource("point", {
          "type": "geojson",
          "data": {
              "type": "FeatureCollection",
              "features": people
          }
        });
        map.addLayer({
            "id": "point",
            "type": "circle",
            "source": "point",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#007cbf"
            }
        });
        console.log(map);
      });
      // this.buildMap();
    })
  }

  buildMap() {
    
    

    console.log(this.map);
    }
  }
