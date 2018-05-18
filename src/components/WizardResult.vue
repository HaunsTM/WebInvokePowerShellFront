<template>
  <article class="container column">
    
    <section class="container row terminal">
      <p>PowerShell (simulated output)<br/>
        &gt; PS [SERVER]:\PowerShell&gt; {{powerShellScript.VisualScriptToRunWithParameters}}<span v-if="loading" class="blinking-cursor">_</span>
        <span v-if="powerShellOutput!==''" class="powershell-output" ><br />&gt;<br />&gt; {{powerShellOutput}}</span>
        <span v-if="powerShellError!==''" class="powershell-error"><br />&gt;<br />&gt; {{powerShellError}}</span>
      </p>
    </section>
  </article>
</template>

<script>

import axios from 'axios';
import { EventBus } from './event-bus.js';

export default {    
  name: "WizardResult",
  props: ['powerShellScript'],
  
  data: function () {
    return {
      loading: false,
      powerShellError: "",
      powerShellOutput: ""
    };
  },
  methods: {
    validate: function() {
      let isValid = !this.loading && (this.powerShellOutput === "" || this.powerShellError === "");
      this.$emit('on-validate', isValid);
      return isValid;
    },
    
    resetMemberVariables: function(){
      this.loading = false;
      this.powerShellError = "";
      this.powerShellOutput= "";
    },
    
    invokeServersidePowerShellScript: function(webServiceEndpoint) {
      var that = this;
      
      that.setLoadingState(true);
      const payload = {
        Name: that.powerShellScript.Name,
        Parameters: that.parameterValues
      };

      var timeOut = new Promise(function(resolve, reject) {

        setTimeout(resolve, 1000*3);
      });

      const promises = [
          axios.post(webServiceEndpoint, that.powerShellScript),
          timeOut
      ];

      Promise.all(promises)
      .then(function (response)  {
        that.setLoadingState(false);
        that.powerShellOutput = response[0].data.Output;
        that.powerShellError = response[0].data.Errors;
        that.validate();
      })
      .catch((fatalError) => {
        that.setLoadingState(false, fatalError);
        that.error = error;
      });
    },
    setLoadingState: function (loading, error) {      
      this.loading = loading;
      let payLoad =  { "isLoading" : loading, "error" : error };
      EventBus.$emit('loading', payLoad);
    }
  },
  computed: {
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
  padding: 1rem;
  color: white;
  font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
}
.powershell-output {
  color: white;
}
.powershell-error {
  color: #B00020;
}
.blinking-cursor {
  color: #2E3D48;
  animation: 1s blink step-end infinite;
}

@keyframes blink {
  from, to {
    color: transparent;
  }
  50% {
    color: white;
  }
}
</style>
