<template>
  <article class="container column">
    <h1>Available scripts</h1>
    <section class="container row">
      
      <div class="container column">
        <div v-for="registeredPowerShellScript in powerShellScriptsNamesDescriptionsAndParameters" v-bind:key="registeredPowerShellScript.Name">
          <md-radio name="registered" v-model="selectedPowerShellScriptName" v-bind:value="registeredPowerShellScript.Name" >{{registeredPowerShellScript.Name}}</md-radio>
        </div>
      </div>
      <div>
        <div v-if="selectedPowerShellScript">
          <h1>{{selectedPowerShellScript.Name}}</h1>
          <p>{{selectedPowerShellScript.Description}}</p>
        </div>
        <div v-else>          
          <h1>Please select script!</h1>
        </div>
        
      </div>
    </section>
    

  </article>
</template>

<script>

export default {
  name: "WizardProvideWPowerShellScriptParameters",
  
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
  .container {
    display: flex;
  }

  .column {    
    flex-direction: column;
  }

  .row {     
    flex-direction: row;
  }

</style>
