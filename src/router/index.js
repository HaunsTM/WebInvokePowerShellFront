import Vue from 'vue'
import Router from 'vue-router'
import PowerShellWizard from '@/components/PowerShellWizard'
import WizardSelectPowerShellScript from '@/components/WizardSelectPowerShellScript'
import WizardProvideWPowerShellScriptParameters from '@/components/WizardProvideWPowerShellScriptParameters'
import WizardConfirmRun from '@/components/WizardConfirmRun'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/wizard/powerShellWizard',
      name: 'PowerShellWizard',
      component: PowerShellWizard
    },
    {
      path: '/wizard/wizardSelectPowerShellScript',
      name: 'WizardSelectPowerShellScript',
      component: WizardSelectPowerShellScript
    },
    {
      path: '/wizard/wizardProvideWPowerShellScriptParameters',
      name: 'WizardProvideWPowerShellScriptParameters',
      component: WizardProvideWPowerShellScriptParameters
    },
    {
      path: '/wizard/wizardConfirmRun',
      name: 'WizardConfirmRun',
      component: WizardConfirmRun
    }
  ]
})
