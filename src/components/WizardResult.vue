<template>
  <article class="container column">
    <section v-if="loading===true">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </section>
    
    <section v-if="loading===false && error!==''">
      <md-empty-state 
        class="md-accent" 
        md-rounded md-icon="alarm_off" 
        md-label="Error">
      </md-empty-state>
    </section>
    

    <section class="container row terminal">
      <section v-if="loading===false && error===''">
        
      <pre>
        PowerShell
        PS [SERVER]:\PowerShell> {{scriptToRunWithParameters}}<span class="blinking-cursor">_</span>
      </pre>
        {{result}}
      </section>
      <section v-if="loading===false && error!==''">
        
      <pre>
        ---<span class="blinking-cursor">_</span>
      </pre>
        {{error}}
      </section>
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
      
    
      const payload1 = {
        Name: that.powerShellScript.Name,
        Parameters: that.powerShellScript.Parameters
      };
      const payload = {
        Name: that.powerShellScript.Name,
        Parameters: this.parameterValues
      };

      var timeOut = new Promise(function(resolve, reject) {
        setTimeout(resolve, 2000*1);
      });

      const promises = [
          axios.post(webServiceEndpoint, this.powerShellScript),
          timeOut
      ];
      
      Promise.all(promises)
      .then((response) => {
        debugger;
        that.result = response[0].data;
        that.loading = false;
      })
      .catch((error) => {
        debugger;
        that.error = error;
        that.loading = false;
      });
    }
  },
  computed: {    
    scriptToRunWithParameters: function() {
      if (this.selectedPowerShellScriptName !== '') {
        let powerShellScriptFile = this.powerShellScript.Name + ".ps1";
        let currentParametersSpaceSeparated = this.parameterValues.map(
          p => (p.UserProvidedValue ? " -" + p.Name + " " + p.UserProvidedValue : "")
        ).join('');

        return (powerShellScriptFile + currentParametersSpaceSeparated).trim();
      }
    },
    parameterValues: function() {
      let paramValueArray = [];
      if (this.powerShellScript.Parameters) {
        
        this.powerShellScript.Parameters.forEach(parameter => {
          paramValueArray.push({
            "UserProvidedValue": parameter.Value,
            "Name": parameter.Name
          });
        });
      }
      return paramValueArray;
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
.terminal {
  background-color: black;
  margin-top: 2rem;
  color: white;
  font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
}

.blinking-cursor {
  color: #2E3D48;
  animation: 1s blink step-end infinite;
}
</style>
