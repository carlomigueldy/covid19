import Vue from 'vue'

Vue.mixin({
  methods: {
    numberFormat(number) {
      return new Intl.NumberFormat().format(number)
    }
  }
})