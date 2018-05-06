<template>

  <div class="page-container md-layout-column">
    
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
          <span class="md-list-item-text"><router-link :to="{name: 'WizardSelectPowerShellScript'}">Start</router-link></span>	          
        </md-list-item> 
      </md-list>
    </md-drawer>

    <md-content>
        <article class="main-content">
          <router-view></router-view>
        </article>
    </md-content>
    
  </div>

</template>

<script>

import Instructions from "./components/Instructions.vue";
import PowerShellWizard from "./components/PowerShellWizard.vue";

export default {
  name: 'App',
  components: {
    Instructions,
    PowerShellWizard
  },
  data: function data() {
    return {
      showNavigation: false,
      showSidepanel: false
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
</style>
