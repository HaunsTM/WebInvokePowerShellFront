<template>
  <article>
    Select powershell script to run
    <md-field>
      <md-select v-model="selectedPowerShellScriptName" name="mediaSource">
        <md-option v-for="(option, index) in namesForRegisteredPowerShellScripts" v-bind:value="option" v-bind:key="index">
        {{ option }}
        </md-option>
      </md-select>
    </md-field>
    <div>
      
      <md-radio v-for="(option, index) in namesForRegisteredPowerShellScripts" v-bind:value="option" v-bind:key="index">{{option}}</md-radio>
    </div>
  </article>
</template>

<script>
import axios from 'axios';

export default {
  name: "WizardProvideWPowerShellScriptParameters",
  
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  data () {
      return {
        loading: false,
        namesForRegisteredPowerShellScripts: [],
        selectedPowerShellScriptName: ""

    }
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
            this.namesForRegisteredPowerShellScripts = response[0].data;
            debugger;
        })
        .catch((error) => {
            this.loading = false;
            console.log(error);
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
