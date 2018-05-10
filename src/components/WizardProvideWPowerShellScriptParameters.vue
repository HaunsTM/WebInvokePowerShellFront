<template>
  <article class="container column">
    <h1>Please provide powershellparameters</h1>
    <section class="container row">
      <div class="width-40">
        <h1>{{powerShellScript.Name}}</h1>
        <p>{{powerShellScript.Description}}</p>
      </div>
      <div class="container column width-40">
        <div v-if="powerShellScript.Parameters.length > 0">
          <md-field v-for="(parameter, index) in powerShellScript.Parameters" :key="index">
            <label>Parameter - {{index}}</label>
            <md-input v-model="parameter.Value"></md-input>
            <span class="md-helper-text">{{parameter.Description}}</span>
          </md-field>
        </div>
        <div v-else>
          <md-empty-state 
            md-rounded md-icon="access_time" 
            md-label="Nothing in Snoozed" 
            md-description="Anything you snooze will go here until it's time for it to return to the inbox.">
          </md-empty-state>
        </div>
      </div>
    </section>
    <section class="container row">
      <md-card class="md-primary" md-theme="black-card">
        <md-card-header>
          <md-card-header-text>
            <div class="md-title">True black primary color</div>
            <div class="md-subhead">Subtitle here</div>
          </md-card-header-text>

          <md-card-media>
            <img src="https://vuematerial.io/assets/examples/avatar-2.jpg" alt="Avatar">
          </md-card-media>
        </md-card-header>
      </md-card>

    </section>
  </article>
</template>

<script>
export default {
  name: "WizardProvideWPowerShellScriptParameters",  
  props: ['powerShellScript'],
  data () {
    return {
      
    }
  },  
  computed: {
    scriptToRunWithParameters: function() {
      if (this.selectedPowerShellScriptName !== '') { 
        return this.powerShellScriptsNamesDescriptionsAndParameters.find( script => script.Name === this.selectedPowerShellScriptName);
      }
      return null;
    }
  }

      //List<string> GetNamesForRegisteredPowerShellScripts();
      // GetRegisteredPowerShellScriptPrototype?powerShellScriptName={powerShellScriptName}
      // InvokePowerShellScript?powerShellScriptName={powerShellScriptName}
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

  .width-20 {
    width: 20%;
  }
  .width-40 {
    width: 40%;
  }
</style>

