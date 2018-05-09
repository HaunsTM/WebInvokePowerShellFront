<template>

  <div class="page-container md-layout-column">
    
    <section v-if="loading===true">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </section>
    
    <section v-else>      

      <md-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Tieto PowerShell runner</span>

      </md-toolbar>

      <md-drawer :md-active.sync="showNavigation">
        <md-toolbar class="md-transparent" md-elevation="0">
          <span class="md-title">Tieto PowerShell runner</span>
        </md-toolbar>

        <md-list>
          <md-list-item>
            <md-icon>help</md-icon>
            <span class="md-list-item-text"><router-link :to="{name: 'Instructions'}">Instructions</router-link></span>
          </md-list-item>

          <md-list-item>
            <md-icon>arrow_forward</md-icon>
            <span class="md-list-item-text"><router-link :to="{name: 'Wizard'}">Start</router-link></span>	          
          </md-list-item> 
        </md-list>
      </md-drawer>

      <md-content>
          <article class="main-content">
            <router-view></router-view>
          </article>
      </md-content>

    </section>
    
  </div>
  
</template>

<script>

import Instructions from "./components/Instructions.vue";
import PowerShellWizard from "./components/PowerShellWizard.vue";

import axios from 'axios';

export default {
  name: 'App',
  components: {
    Instructions,
    PowerShellWizard
  },
  data: function data() {
    return {
      loading: false,
      showNavigation: false,
      showSidepanel: false
    }
  },
  
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  
  methods: {
    
    fetchData () {
        this.loading = true
        const promises = [
            axios.get(this.$data.CONSTANTS.BASE_URL_WEBSERVICE_API + 'GetRegisteredPowerShellScripts_NamesDescriptionsAndParameters')
        ];
         Promise.all(promises)
        .then((response) => {
            let registeredPowerShellScripts_NamesDescriptionsAndParameters = response[0].data;
            this.$session.set('registeredPowerShellScripts_NamesDescriptionsAndParameters', registeredPowerShellScripts_NamesDescriptionsAndParameters);
        
            this.loading = false;
        })
        .catch((error) => {
            this.loading = false;
            console.log(error);
        });
    }
  },
}
</script>

<style>
  .page-container {
    height: 100vh;
    position: relative;
  }
  .md-content{
    padding: 1rem 0.5rem 0.5rem 0.5rem;
    display: flex;
    justify-content: center;
  }
  .main-content {
    max-width: 800px;
    width: 800px; 
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }
</style>
