<template>
  <div style="top: 0; bottom: 0; left: 0; right: 0; position: absolute; z-index: 0; width: 100%">
    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: 100%; width: 100%;"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer
        :url="url"
        :attribution="attribution"
      />

      <l-marker 
        :key="index" 
        v-for="(data, index) in mappedData(countries)" 
        :lat-lng="data.coordinates"
        @click="showInfo(index)"
      ></l-marker>
    </l-map>

    <v-bottom-sheet v-model="infoDialog" >
      <v-card tile flat>
        <v-img
          :src="country.countryInfo 
          && country.countryInfo.flag" 
          max-height="150"
        ></v-img>
        <v-card-title>
          {{ country.country }}
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="infoDialog = false" text>
            Close
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="mb-5"></div>
          Last updated {{ new Date(country.updated) | moment('calendar') }}

          <v-row>
            <v-col>
              <v-card-title 
                v-text="numberFormat(country.todayCases)"
              ></v-card-title>
              <v-card-subtitle 
                class="primary--text font-weight-regular">
                Cases Today
              </v-card-subtitle>
            </v-col>
            <v-col>
              <v-card-title 
                v-text="numberFormat(country.todayDeaths)"
              ></v-card-title>
              <v-card-subtitle 
                class="red--text font-weight-regular">
                Deaths Today
              </v-card-subtitle>
            </v-col>
          </v-row>
          <v-simple-table>
            <tr>
              <th>Confirmed Cases</th>
              <td v-text="numberFormat(country.cases)"></td>
            </tr>
            <tr>
              <th>Deaths</th>
              <td v-text="numberFormat(country.deaths)"></td>
            </tr>
            <tr>
              <th>Recovered</th>
              <td v-text="numberFormat(country.recovered)"></td>
            </tr>
            <tr>
              <th>Active</th>
              <td v-text="numberFormat(country.active)"></td>
            </tr>
            <tr>
              <th>Critical</th>
              <td v-text="numberFormat(country.critical)"></td>
            </tr>
          </v-simple-table>
          
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { latLng } from "leaflet";

const { NovelCovid } = require('novelcovid');
const track = new NovelCovid();

export default {
  created() {
    this.fetchAllCountries()
  },

  data() {
    return {
      zoom: 2,
      center: latLng(47.41322, -1.219482),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5
      },
      countries: [],
      country: {},
      infoDialog: false,
    };
  },

  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },

    showInfo(index) {
      this.country = this.countries[index]
      this.infoDialog = true
    },

    async fetchAllCountries() {
      try {
        const countries = await track.countries()
        this.countries = countries
        console.log(countries)
      } catch (err) {
        console.log(err)
      }
    },

    mappedData(data) {
      return data.map(item => {
        return {
          dialog: false,
          country: item.country,
          cases: item.cases,
          deaths: item.deaths,
          recovered: item.recovered,
          coordinates: latLng(item.countryInfo.lat, item.countryInfo.long),
        }
      })
    },
  }
};
</script>

<style>
.fullscreen {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
}

.icon-marker {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
  width: 3.6em;
  height: 3.6em;
  font-size: .7em;
  font-weight: bold;
  background-color: 'red';
  border-radius: 100%;
  box-shadow: 0 2px 5px rgba(black, .9);
}
</style>