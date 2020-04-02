<template>
  <div>
    <v-card outlined tile>
      <v-card-title 
        class="font-weight-regular">
        Cases of COVID-19 in the Philippines
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-card-title class="font-weight-regular">(PH) Confirmed</v-card-title>
            <v-card-subtitle>Total number of confirmed cases</v-card-subtitle>
            <v-card-text>
              <div class="red--text display-2">
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
          </v-col>
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-card-title class="font-weight-regular">(PH) Died</v-card-title>
            <v-card-subtitle>Total number of deaths</v-card-subtitle>
            <v-card-text>
              <div class="red--text text--darken-3 display-2">
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
          </v-col>
          <v-col lg="4" md="4" sm="12" cols="12">
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  async fetch({ store }) {
    await store.dispatch('fetchPhilippines')
  },

  computed: {
    ...mapGetters({
      philippines: 'GET_PH_CASES',
    })
  },
}
</script>
