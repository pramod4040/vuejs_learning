import Vue from 'vue';
import Vuex from 'vuex';
import dynamicTable from './modules/dynamic_table.js';
import wizardForm from './modules/wizard_form.js';
import campaignCreation from './modules/campaign_creation.js'
import calculator from './modules/calculator'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
     dynamicTable: dynamicTable,
     wizardForm: wizardForm,
     campaignCreation: campaignCreation,
     calculator: calculator
  },
});
