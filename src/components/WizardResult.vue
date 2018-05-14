<template>
  <article>
    <section v-if="loading===true">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </section>
    
    <section v-if="loading===false && error===''">
      {{result}}
    </section>
    
    <section v-if="loading===false  && error!==''">
    <md-empty-state 
      class="md-accent" 
      md-rounded md-icon="alarm_off" 
      md-label="Error" 
      v-bind:md-description="error">
    </md-empty-state>
    </section>

  </article>
</template>

<script>

import axios from 'axios';

export default {    
  name: "WizardResult",
  props: ['powerShellScript'],
  
  data: function () {
    return {
      loading: false,
      error: "",
      result: ""
    };
  },
  methods: {
    resetMemberVariables: function(){
      this.loading = false;
      this.error = "";
      this.result= "";
    },
    
    invokeServersidePowerShellScript: function(webServiceEndpoint) {
      var that = this;
      that.resetMemberVariables;

      const payload = {
        powerShellScriptName: this.powerShellScript.Name,
        args: that.parameterValues.join(","),
      };
      var timeOut = new Promise(function(resolve, reject) {
        setTimeout(resolve, 1000*1);
      });
      const promises = [
          axios.post(webServiceEndpoint, payload),
          timeOut
      ];
      Promise.all(promises)
      .then((response) => {
        that.result = response[0].data;
        that.loading = false;
      })
      .catch((error) => {
        that.error = error;
        that.loading = false;
      });
    }
  },
  computed: {
    parameterValues: function() {
      let paramValueArray = [];
      if (this.powerShellScript.Parameters) {
        
        this.powerShellScript.Parameters.forEach(parameter => {
          if (parameter.Value) {
            paramValueArray.push(parameter.Value);
          } else {
            paramValueArray.push("");
          }
        });
      }
      return paramValueArray;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
