<template>
  <div>
		<v-list>
			<v-list-item v-for="(country, index) in countries" :key="index">
				<v-list-item-action>
					<span class="red--text">{{ country.cases }}</span>
				</v-list-item-action>
				<v-list-item-content>
					<v-list-item-title>
						{{ country.country }}
					</v-list-item-title>
					<v-list-item-subtitle>
					</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
		</v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	async fetch({ store }) {
		await store.dispatch('fetchCountries')
	},

	computed: {
		...mapGetters({
			countries: 'GET_COUNTRY_CASES'
		})
	}
}
</script>