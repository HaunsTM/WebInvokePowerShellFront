<template>

  <div class="page-container md-layout-column">    

      <md-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="showNavigation = true">
          <md-icon>menu</md-icon>
        </md-button>
        <span class="md-title">Tieto PowerShell runner</span>
      </md-toolbar>
      <section v-if="loading===true">
        <md-progress-bar md-mode="indeterminate"></md-progress-bar>
      </section>
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
            <section v-if="loadingError">

              <md-card>
                <md-card-header class="fatal-error">
                  <md-avatar>
                    <md-icon class="md-size-4x">error_outline</md-icon>
                  </md-avatar>

                  <div class="md-title">Error</div>
                  <div class="md-subhead">{{loadingError.message}}</div>
                </md-card-header>

                <md-card-content class="fatal-error">
                  {{loadingError.stack}}
                  <br/>
                  <br/>
                  <i>(That probably means that the server connection has been lost or that the server is down. Please try later...)</i>
                </md-card-content>
              </md-card>

            </section>
            <section v-else>              
              <router-view></router-view>
            </section>

          </article>
      </md-content>

  </div>
  
</template>

<script>

import Instructions from "./components/Instructions.vue";
import PowerShellWizard from "./components/PowerShellWizard.vue";
import { EventBus } from './components/event-bus.js';

export default {
  name: 'App',
  components: {
    Instructions,
    PowerShellWizard
  },
  data: function data() {
    return {
      showNavigation: false,
      showSidepanel: false,
      loading: false,
      loadingError: null
    }
  },
  created(){
    EventBus.$on('loading', this.setLoadingState);
  },
  methods: {
    setLoadingState(data) {
      this.loading = data.isLoading;
      this.loadingError=data.error;
    }
  }  
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
  .fatal-error {
    background-color: #B00020;
    color: white;
  }
</style>
