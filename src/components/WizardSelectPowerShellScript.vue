<template>
  <article class="container column">
    <section class="container row content">
      
      <div class="container column width-40">

        <div v-for="registeredPowerShellScript in powerShellScriptsNamesDescriptionsAndParameters" v-bind:key="registeredPowerShellScript.Name">
          <md-radio name="registered" v-model="selectedPowerShellScriptName" v-bind:value="registeredPowerShellScript.Name" >{{registeredPowerShellScript.Name}}</md-radio>
        </div>
      </div>

      <div class="width-40">
        <div v-if="selectedPowerShellScript">       
          
          <div class="md-title">{{selectedPowerShellScript.Name}}</div>
          <p>{{selectedPowerShellScript.Description}}</p>
        </div>
        <div v-else>
          <md-icon class="md-size-5x">devices_other</md-icon>
        </div>        
      </div>

    </section>
    

  </article>
</template>

<script>

export default {
  name: "WizardProvidePowerShellScriptParameters",
  
  props: ['powerShellScriptsNamesDescriptionsAndParameters'],

  data () {
      return {
        selectedPowerShellScriptName: ""
    }
  },
  methods: {

    validate() {
      let isValid = this.selectedPowerShellScriptName !== null && this.selectedPowerShellScriptName !== '';
      this.$emit('on-validate', this.selectedPowerShellScript, isValid);
      return isValid;
    }
  },
  
  computed: {
    selectedPowerShellScript: function() {
      if (this.selectedPowerShellScriptName !== '') { 
        return this.powerShellScriptsNamesDescriptionsAndParameters.find( script => script.Name === this.selectedPowerShellScriptName);
      }
      return null;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .md-empty-state {
    margin: 0 !important;
    padding: 0 !important;
  }
  .container {
    display: flex;
  }

  .column {    
    flex-direction: column;
  }

  .row {     
    flex-direction: row;
  }

  .content {
    padding-top: 2em;
    justify-content: space-between;
  }
  .width-20 {
    width: 20%;
  }
  .width-40 {
    width: 40%;
  }
</style>
