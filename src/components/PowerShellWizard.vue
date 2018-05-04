<template>
<div>
    <form-wizard @on-complete="onComplete"
                shape="circle"
                color="#009688">
                
      <h2 slot="title">Run a PowerShell script file</h2>   
      <tab-content title="Select PowerShell script to run"
                   route="/wizard/wizardSelectPowerShellScript"
                   icon="ti-user">
      </tab-content>
      <tab-content title="Provide parameters"
                   route="/wizard/wizardProvideWPowerShellScriptParameters"
                   icon="ti-settings">
      </tab-content>
      <tab-content title="Confirm run"
                   route="/wizard/wizardConfirmRun"
                   icon="ti-check">
      </tab-content>
       <transition name="fade" mode="out-in">
        
        <router-view></router-view>
      </transition>
    </form-wizard>
 </div>
</template>

<script>
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
  name: "PowerShellWizard",
  components: {
    FormWizard,
    TabContent
  },
  methods: {
  onComplete: function(){
      alert('Yay. Done!');
   },
   test: function(){
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
