<template>
<div>
    <form-wizard @on-complete="onComplete"
                shape="circle"
                color="#009688">
                
      <h2 slot="title">Run a PowerShell script file</h2>   
      <tab-content title="Select PowerShell script to run"
                   :before-change="() => validateStep('wizardSelectPowerShellScript')"
                   icon="ti-user">
                   <wizard-select-power-shell-script ref="wizardSelectPowerShellScript" @on-validate="mergePartialModels"></wizard-select-power-shell-script>
      </tab-content>
      <tab-content title="Provide parameters"
                   icon="ti-settings">
                   <wizard-provide-w-power-shell-script-parameters></wizard-provide-w-power-shell-script-parameters>
      </tab-content>
      <tab-content title="Confirm run"
                   icon="ti-check">
                   <wizard-confirm-run></wizard-confirm-run>
      </tab-content>
    </form-wizard>
 </div>
</template>

<script>
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
      finalModel: {}
    };
  },
  methods: {
    onComplete: function(){
        alert('Yay. Done!');
    },
    validateStep(name) {
      var refToValidate = this.$refs[name];
      return refToValidate.validate();
    },
    mergePartialModels(model, isValid){
      if(isValid){
        debugger;
      // merging each step model into the final model
       this.finalModel = Object.assign({},this.finalModel, model)
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
