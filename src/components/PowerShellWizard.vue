<template>

  <div>
    <section v-if="loading===false">
      <form-wizard
                  shape="circle"
                  color="#009688"
                  ref="wizard">
                  
        <div class="md-display-1" slot="title">Run a PowerShell script file</div>   

        <tab-content 
          title="Select PowerShell script to run"
          :before-change="() => validateStep('wizardSelectPowerShellScript')"
          icon="ti-user">
          <wizard-select-power-shell-script 
            v-bind:power-shell-scripts-names-descriptions-and-parameters="registeredPowerShellScripts_NamesDescriptionsAndParameters"
            ref="wizardSelectPowerShellScript" 
            @on-validate="mergeSelectedPowerShellScriptToFinalModel">
          </wizard-select-power-shell-script>
        </tab-content>

        <tab-content 
          title="Provide parameters and run"
          :before-change="() => validateStep('wizardProvidePowerShellScriptParameters')"
          icon="ti-settings">

          <wizard-provide-power-shell-script-parameters
            v-bind:power-shell-script = "finalModel"
            ref="wizardProvidePowerShellScriptParameters"
            @on-validate="mergeSelectedPowerShellScriptsParamtetersToFinalModel">
          </wizard-provide-power-shell-script-parameters>
        </tab-content>

        <tab-content title="Result"
          :before-change="() => validateStep('wizardResult')"
          icon="ti-check">
          <wizard-result                 
            v-bind:power-shell-script = "finalModel"
            @on-validate="validatedLastStep"
            ref="wizardResult">
          </wizard-result>
        </tab-content>

        <md-divider></md-divider>

      <template slot="footer" slot-scope="props">

        <div class=wizard-footer-left>
           <wizard-button  v-if="props.activeTabIndex > 0 && !props.isLastStep"
             @click.native="props.prevTab()"
             :style="props.fillButtonStyle">
              Previous
            </wizard-button>
        </div>

        <div class="wizard-footer-right">
          <!--proceed button -->
          <wizard-button 
            v-if="!props.isLastStep" 
            @click.native="props.nextTab()" 
            class="wizard-footer-right" :style="props.fillButtonStyle">
              {{props.activeTabIndex === 1 ? 'Run' : 'Next'}}
          </wizard-button>

          <!--restart button -->
          <wizard-button 
            v-else      
            v-show="hasReturnedResultFromFinalPowerShellScript"
            @click.native="restart()"
            class="wizard-footer-right finish-button" 
            :style="props.fillButtonStyle">Restart
          </wizard-button>
        </div>
      </template>
        
      </form-wizard>

    </section>
  </div>
</template>

<script>

import axios from 'axios';

import {FormWizard, TabContent, WizardButton} from 'vue-form-wizard';
import 'vue-form-wizard/dist/vue-form-wizard.min.css';

import WizardSelectPowerShellScript from '@/components/WizardSelectPowerShellScript';
import WizardProvidePowerShellScriptParameters from '@/components/WizardProvidePowerShellScriptParameters';
import WizardResult from '@/components/WizardResult';
import { EventBus } from './event-bus.js';

export default {
  name: "PowerShellWizard",
  components: {
    FormWizard,
    TabContent,
    WizardButton,

    WizardSelectPowerShellScript,
    WizardProvidePowerShellScriptParameters,
    WizardResult    
  },
  data() {
    return {
      loading: false,
      registeredPowerShellScripts_NamesDescriptionsAndParameters: {},
      finalModel: {},
      preparedScript: "",
      hasReturnedResultFromFinalPowerShellScript: false
    };
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    fetchData () {      
        
        this.setLoadingState(true);
        
        const promises = [
            axios.get(this.$data.CONSTANTS.BASE_URL_WEBSERVICE_API + 'GetRegisteredPowerShellScripts_NamesDescriptionsAndParameters')
        ];
        
        Promise.all(promises)
        .then((response) => {
            this.setLoadingState(false);
            this.registeredPowerShellScripts_NamesDescriptionsAndParameters = response[0].data;
        })
        .catch((error) => {
            this.setLoadingState(false, error);
            console.log(error);
        })
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
    mergeSelectedPowerShellScriptsParamtetersToFinalModel(parameters, scriptToRunWithParameters, isValid){
      if(isValid){
        // merging each step model into the final model
        this.finalModel.Parameters = parameters;
        this.finalModel.VisualScriptToRunWithParameters = scriptToRunWithParameters;
        this.$refs.wizardResult.invokeServersidePowerShellScript(this.$data.CONSTANTS.BASE_URL_WEBSERVICE_API + 'InvokePowerShellScript');
      }
    },
    validatedLastStep(isValid) {
      this.hasReturnedResultFromFinalPowerShellScript = isValid;
      console.log('PowerShell invokation completed.');
    },
    restart: function(){
      if(this.hasReturnedResultFromFinalPowerShellScript) {
        this.reset();
        this.$refs.wizard.reset();
      }
    },
    reset: function() {
      this.setLoadingState(false);
      this.registeredPowerShellScripts_NamesDescriptionsAndParameters = {};
      this.finalModel = {};

      this.preparedScript = "";
      this.hasReturnedResultFromFinalPowerShellScript = false;
      this.fetchData();
    },
    setLoadingState: function (loading, error) {
      this.loading = loading;
      let payLoad =  { "isLoading" : loading, "error" : error };
      EventBus.$emit('loading', payLoad);
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
