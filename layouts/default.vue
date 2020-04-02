<template>
  <v-app app>
    <v-app-bar
      :color="color"
      dark
      fixed
      app
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <!-- <v-list-item @click="$router.push({ name: 'about' })">
            <v-list-item-action>
              <v-icon>mdi-information</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>About</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

          <v-list-item href="https://carlomigueldy.com" target="_blank">
            <v-list-item-content>
              <v-list-item-title>© {{ new Date().getFullYear() }} Carlo Miguel Dy</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-bottom-navigation
      app
      grow
      fixed
      color="primary"
    >
      <v-btn @click="$router.push({ name: page.to })" v-for="(page, index) in pages" :key="index">
        <span v-text="page.title"></span>
        <v-icon v-text="page.icon"></v-icon>
      </v-btn>
    </v-bottom-navigation>
    
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      pages: [
        // {
        //   title: 'Countries',
        //   icon: 'mdi-chart-bubble',
        //   to: 'countries'
        // },
        {
          title: 'Map',
          icon: 'mdi-map',
          to: 'map'
        },
        {
          title: 'Home',
          icon: 'mdi-home',
          to: 'index'
        },
        {
          title: 'Global',
          icon: 'mdi-globe-model',
          to: 'global'
        },
      ],
      title: 'COVID-19 Tracker',
      color: 'blue-grey darken-3'
    }
  }
}
</script>
