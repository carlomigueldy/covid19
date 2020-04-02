<template>
  <div>
    <v-card :loading="loading" outlined tile>
      <v-tabs grow show-arrows>
        <v-tab>List</v-tab>
        <v-tab>Table</v-tab>

        <v-tab-item>
          <v-list>
            <v-list-item 
              :key="index" 
              @click="showInfo(index)"
              v-for="(data, index) in formatData(countries)">
              <v-list-item-action>
                <v-img :src="data.flag" width="50" />
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="data.country"></v-list-item-title>
                <v-list-item-subtitle v-text="data.cases"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-tab-item>
        <v-tab-item>
          <v-card-title class="font-weight-regular">
            COVID-19 Cases In All Affected Countries
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              placeholder="Search"
              append-icon="mdi-magnify"
              hide-details
              outlined
              style="border-radius: 0"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="formatData(countries)"
            :search="search"
          >
            <template v-slot:item.flag="{ item }">
              <v-img :src="item.flag" width="50" />
            </template>
          </v-data-table>
        </v-tab-item>
        
      </v-tabs>
    </v-card>

    <v-bottom-sheet v-model="countryDialog" scrollable>
      <v-card flat tile>
        <v-img
          :src="country.countryInfo 
          && country.countryInfo.flag" 
          max-height="150"
        ></v-img>
        <v-card-title>
          {{ country.country }}
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="countryDialog = false" text>
            Close
          </v-btn>
        </v-card-title>
        <v-card-text>
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
import { mapGetters } from 'vuex'
const { NovelCovid } = require('novelcovid');
const track = new NovelCovid();

export default {
  async created() {
    await this.fetchAllCountries()
  },  

  methods: {
    formatData(data) {
      return data.map(item => {
        return {
          flag: item.countryInfo.flag,
          country: item.country,
          cases: this.numberFormat(item.cases),
          todayCases: this.numberFormat(item.todayCases),
          deaths: this.numberFormat(item.deaths),
          todayDeaths: this.numberFormat(item.todayDeaths),
          recovered: this.numberFormat(item.recovered),
          active: this.numberFormat(item.active),
          critical: this.numberFormat(item.critical),
          casesPerOneMillion: this.numberFormat(item.casesPerOneMillion),
          deathsPerOneMillion: this.numberFormat(item.deathsPerOneMillion),
          firstCase: item.firstCase,
        }
      })
    },

    async fetchAllCountries() {
      this.loading = true
      this.countries = await track.countries()
      this.loading = false
    },

    showInfo(index) {
      this.country = this.countries[index]
      this.countryDialog = true
    }
  },
  
  data: () => ({
    loading: false,
    countryDialog: false,
    countries: [],
    country: {},
    search: '',
    headers: [
      {
        text: 'Flag',
        value: 'flag',
        sortable: false,
      },
      {
        text: 'Country',
        value: 'country',
      },
      {
        text: 'Cases',
        value: 'cases',
      },
      {
        text: 'Cases Today',
        value: 'todayCases',
      },
      {
        text: 'Deaths',
        value: 'deaths',
      },
      {
        text: 'Deaths Today',
        value: 'todayDeaths',
      },
      {
        text: 'Recovered',
        value: 'recovered',
      },
      {
        text: 'Active',
        value: 'active',
      },
      {
        text: 'Critical',
        value: 'critical',
      },
    ]
  })
}
</script>