<template>
  <article class="container column">
    
    <section class="container row content">
      <div class="width-40">
        <div class="md-caption">{{powerShellScript.Name}}</div>
        <p>{{powerShellScript.Description}}</p>
      </div>
      <div class="container column width-40">
        
        <div class="md-caption">Parameters</div>
        <md-field v-for="(parameter, index) in powerShellScript.Parameters" :key="index">
          
          <label><b>{{parameter.Name}}</b></label>
          <md-input v-model="parameter.Value"></md-input>
          <span class="md-helper-text">{{parameter.Description}}</span>
        </md-field>
      </div>
    </section>

    <section class="container row terminal">
      <p>PowerShell<br/>
        &gt; PS [SERVER]:\PowerShell&gt; {{scriptToRunWithParameters}}<span class="blinking-cursor">_</span>
      </p>
    </section>

  </article>
</template>

<script>
export default {
  name: "WizardProvidePowerShellScriptParameters",  
  props: ['powerShellScript'],
  data () {
    return {
      
    }
  },
  methods: {
    validate() {
      let isValid = true;
      for (let value of this.parameterValues) {
        if (!value.UserProvidedValue) {
          isValid = false;
          break;
        }
      }
      this.$emit('on-validate', this.parameterValues, this.scriptToRunWithParameters, isValid);
      return isValid;
    }
  },
  computed: {
    scriptToRunWithParameters: function() {
      if (this.selectedPowerShellScriptName !== '') {
        let powerShellScriptFile = this.powerShellScript.FileNameWithoutPath;
        let currentParametersSpaceSeparated = this.parameterValues.map(
          p => (p.UserProvidedValue ? " -" + p.Name + " " + "'" + p.UserProvidedValue + "'": "")
        ).join('');
        let preparedScript = ("\"" + "[SERVER]:\\..\\..\\" + powerShellScriptFile + "\"" + currentParametersSpaceSeparated).trim();
        
        return preparedScript;
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
  padding: 1rem;
  color: white;
  font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New, monospace;
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

