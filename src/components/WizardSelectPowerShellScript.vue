<template>
  <article class="container column">
    <h1>Header</h1>
    <section class="container row">
      <div class="container column">
        <div v-for="registeredPowerShellScript in registeredPowerShellScripts_NamesDescriptionsAndParameters" v-bind:key="registeredPowerShellScript.Name">
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

  data () {
      return {
        registeredPowerShellScripts_NamesDescriptionsAndParameters: [],
        selectedPowerShellScriptName: ""
    }
  },

  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },

  methods: {
    fetchData () {
      this.registeredPowerShellScripts_NamesDescriptionsAndParameters = this.$session.get('registeredPowerShellScripts_NamesDescriptionsAndParameters');        
      this.$session.get('selectedPowerShellScriptName');   
    },

    validate() {
      let isValid = this.selectedPowerShellScriptName !== null && this.selectedPowerShellScriptName !== '';
      this.$emit('on-validate', this.selectedPowerShellScriptName, isValid);
      return isValid;
    }
  },
  
  computed: {
    selectedPowerShellScript: function() {
      if (this.selectedPowerShellScriptName !== '') {
        this.$session.set('selectedPowerShellScriptName', this.selectedPowerShellScriptName);   
        return this.registeredPowerShellScripts_NamesDescriptionsAndParameters.find( script => script.Name === this.selectedPowerShellScriptName);
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
