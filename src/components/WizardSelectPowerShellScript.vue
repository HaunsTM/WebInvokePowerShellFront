<template>
  <article class="container column">
    <h1>Header</h1>
    <section class="container row">
      <div class="container column">
        <div v-for="registeredPowerShellScript in powerShellScripts_NameAndDescription" v-bind:key="registeredPowerShellScript.Name">
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
import axios from 'axios';

export default {
  name: "WizardProvideWPowerShellScriptParameters",
  data () {
      return {
        loading: false,
        powerShellScripts_NameAndDescription: [],
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
        this.loading = true
        const promises = [
            axios.get(this.$data.CONSTANTS.BASE_URL_WEBSERVICE_API + 'GetNamesForRegisteredPowerShellScripts')
        ];
         Promise.all(promises)
        .then((response) => {
            this.loading = false;
            this.powerShellScripts_NameAndDescription = response[0].data;
        })
        .catch((error) => {
            this.loading = false;
            console.log(error);
        });
    }
  },
  
  computed: {
    selectedPowerShellScript: function() {
      if (this.selectedPowerShellScriptName !== '') {
        return this.powerShellScripts_NameAndDescription.find( script => script.Name === this.selectedPowerShellScriptName)
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
