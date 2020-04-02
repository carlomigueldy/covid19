<template>
  <div>
    <v-card :loading="loading" class="mb-5" outlined tile>
      <v-card-title 
        class="font-weight-regular">
        <span>COVID-19 Pandemic</span>
        <v-spacer></v-spacer>
        <v-chip color="red" label dark>
          Afftected Countries: {{ numberFormat(global.affectedCountries) }}
        </v-chip>
      </v-card-title>
      <v-card-subtitle>
        The total number of confirmed cases, deaths, & recoveries from COVID-19
      </v-card-subtitle>
      <v-card-text>
        <v-row dense>
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-card-title 
              class="red--text font-weight-regular">
              Total Confirmed Cases
            </v-card-title>
            <v-card-title 
              v-text="numberFormat(global.cases)"
            ></v-card-title>
          </v-col>
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-card-title 
              class="red--text font-weight-regular">
              Total Deaths
            </v-card-title>
            <v-card-title 
              v-text="numberFormat(global.deaths)"
            ></v-card-title>
          </v-col>
          <v-col lg="4" md="4" sm="12" cols="12">
            <v-card-title 
              class="green--text font-weight-regular">
              Total Recoveries
            </v-card-title>
            <v-card-title 
              v-text="numberFormat(global.recovered)"
            ></v-card-title>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    
    <Global/>
  </div>
</template>

<script>
import Global from '@/components/Global'

export default {
  async fetch({ store }) {
		await store.dispatch('fetchCountries')
  },
  
  data: () => ({
    global: {},
    loading: false,
  }),
  
  components: {
    Global,
  },

  created() {
    this.all()
  },

  methods: {
    async all() {
      this.loading = true
      const { NovelCovid } = require('novelcovid');
      const track = new NovelCovid();
      const data = await track.all()
      this.global = data
      this.loading = false
    }
  }
}
</script>