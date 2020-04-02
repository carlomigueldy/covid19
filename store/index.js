import axios from 'axios'

const state = () => ({
	global: {},
	philippines: {},
	countries: [],
})

const getters = {
	GET_GLOBAL_CASES: state => state.global,
	GET_COUNTRY_CASES: state => state.countries,
	GET_PH_CASES: state => state.philippines,
}

const mutations = {
	SET_GLOBAL_CASES: (state, payload) => state.global = payload,
	SET_COUNTRY_CASES: (state, payload) => state.countries = payload,
	SET_PH_CASES: (state, payload) => state.philippines = payload,
}

const actions = {
	async fetchAll({ commit }) {
		try {
			const { data } = await axios.get('https://coronavirus-19-api.herokuapp.com/all')

			commit('SET_GLOBAL_CASES', data)
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	},

	async fetchCountries({ commit }) {
		try {
			const { data } = await axios.get('https://coronavirus-19-api.herokuapp.com/countries')
			
			commit('SET_COUNTRY_CASES', data)
			console.log(data)
		} catch (err) {
			console.log(err)
		}
	},

	async fetchPhilippines({ commit }) {
		try {
			const { data } = await axios.get('https://coronavirus-19-api.herokuapp.com/countries/philippines')

			commit('SET_PH_CASES', data)
		} catch (err) {
			console.log(err)
		}
	}
}

export default {
	state,
	getters,
	mutations,
	actions,
}