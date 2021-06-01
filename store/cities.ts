import { GetterTree, ActionTree, MutationTree } from 'vuex';
import {getCities} from '@/utils/api';

export const state = () => ({
  cities: [] as string[],
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {

}

export const mutations: MutationTree<RootState> = {
  SET_CITIES: (state, items: []) => (state.cities = items),
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchCities({ commit }) {
    let response = getCities();
    commit('SET_CITIES', response.data)
  },
}
