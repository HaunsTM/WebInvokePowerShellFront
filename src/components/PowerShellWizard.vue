<template>

  <div>
    
    <section v-if="loading===true">
      <md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
    </section>
    <section v-if="loading===false">
      <form-wizard @on-complete="onComplete"
                  shape="circle"
                  color="#009688">
                  
        <h2 slot="title">Run a PowerShell script file</h2>   
        <tab-content title="Select PowerShell script to run"
                    :before-change="() => validateStep('wizardSelectPowerShellScript')"
                    icon="ti-user">
                    <wizard-select-power-shell-script 
                      v-bind:power-shell-scripts-names-descriptions-and-parameters="registeredPowerShellScripts_NamesDescriptionsAndParameters"
                      ref="wizardSelectPowerShellScript" 
                      @on-validate="mergeSelectedPowerShellScriptToFinalModel">
                    </wizard-select-power-shell-script>
        </tab-content>
        <tab-content title="Provide parameters"
                    icon="ti-settings">
                    <wizard-provide-w-power-shell-script-parameters
                      v-bind:power-shell-script = "finalModel"
                      @on-validate="mergeSelectedPowerShellScriptsParamtetersToFinalModel">

                    </wizard-provide-w-power-shell-script-parameters>
        </tab-content>
        <tab-content title="Confirm run"
                    icon="ti-check">
                    <wizard-confirm-run                 
                      v-bind:power-shell-script = "finalModel">
                      </wizard-confirm-run>
        </tab-content>
      </form-wizard>
    </section>

  </div>
</template>

<script>

import axios from 'axios';

import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

import WizardSelectPowerShellScript from '@/components/WizardSelectPowerShellScript'
import WizardProvideWPowerShellScriptParameters from '@/components/WizardProvideWPowerShellScriptParameters'
import WizardConfirmRun from '@/components/WizardConfirmRun'

export default {
  name: "PowerShellWizard",
  components: {
    FormWizard,
    TabContent,

    WizardSelectPowerShellScript,
    WizardProvideWPowerShellScriptParameters,
    WizardConfirmRun    
  },
  data() {
    return {
      loading: false,
      registeredPowerShellScripts_NamesDescriptionsAndParameters: {},
      finalModel: {}
    };
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
            axios.get(this.$data.CONSTANTS.BASE_URL_WEBSERVICE_API + 'GetRegisteredPowerShellScripts_NamesDescriptionsAndParameters')
        ];
         Promise.all(promises)
        .then((response) => {
            this.registeredPowerShellScripts_NamesDescriptionsAndParameters = response[0].data;
            this.loading = false;
        })
        .catch((error) => {
            this.loading = false;
            console.log(error);
        });
    },
    onComplete: function(){
        alert('Yay. Done!');
    },
    validateStep(name) {
      var refToValidate = this.$refs[name];
      return refToValidate.validate();
    },
    mergeSelectedPowerShellScriptToFinalModel(currentSelectedPowerShellScript, isValid){
      if(isValid){
      // merging each step model into the final model
       this.finalModel = currentSelectedPowerShellScript;
      }
    },
    mergeSelectedPowerShellScriptsParamtetersToFinalModel(parameters, isValid){
      if(isValid){
        // merging each step model into the final model
        this.finalModel = Object.assign({},this.finalModel, parameters)
      }
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
