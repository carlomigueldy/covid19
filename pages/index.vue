<template>
  <div>
    <v-row>
      <v-col lg="4" md="4" sm="12" cols="12">
        <v-card>
          <v-card-title class="font-weight-regular">(PH) Confirmed</v-card-title>
          <v-card-subtitle>Total number of confirmed cases</v-card-subtitle>
          <v-card-text>
            <div class="info--text display-2">
              <number
                ref="number1"
                :from="0"
                :to="philippines.cases"
                :format="numberFormat"
                :duration="0.5"
                easing="Power1.easeOut"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col lg="4" md="4" sm="12" cols="12">
        <v-card>
          <v-card-title class="font-weight-regular">(PH) Died</v-card-title>
          <v-card-subtitle>Total number of deaths</v-card-subtitle>
          <v-card-text>
            <div class="error--text display-2">
              <number
                ref="number1"
                :from="0"
                :to="philippines.deaths"
                :format="numberFormat"
                :duration="0.5"
                easing="Power1.easeOut"
              />
            </div>
          </v-card-text>
        </v-card>  
      </v-col>
      <v-col lg="4" md="4" sm="12" cols="12">
        <v-card>
          <v-card-title class="font-weight-regular">(PH) Recovered</v-card-title>
          <v-card-subtitle>Total number of recoveries</v-card-subtitle>
          <v-card-text>
            <div class="success--text display-2">
              <number
                ref="number1"
                :from="0"
                :to="philippines.recovered"
                :format="numberFormat"
                :duration="0.5"
                easing="Power1.easeOut"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="font-weight-regular">
            COVID-19 Cases Across All Countries
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              placeholder="Search"
              append-icon="mdi-magnify"
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="countries"
            :search="search"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('fetchPhilippines')
  },

  created() {
    $nuxt.$store.dispatch('fetchCountries')
  },

  computed: {
    ...mapGetters({
      philippines: 'GET_PH_CASES',
      countries: 'GET_COUNTRY_CASES'
    })
  },
  
  methods: {
    numberFormat(number) {
      return new Intl.NumberFormat().format(number)
    }
  },

  data: () => ({
    search: '',
    headers: [
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
