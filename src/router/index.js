import Vue from 'vue'
import Router from 'vue-router'
import Instructions from '@/components/Instructions'
import PowerShellWizard from '@/components/PowerShellWizard'
import WizardSelectPowerShellScript from '@/components/WizardSelectPowerShellScript'
import WizardProvideWPowerShellScriptParameters from '@/components/WizardProvideWPowerShellScriptParameters'
import WizardConfirmRun from '@/components/WizardConfirmRun'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Instructions',
      component: Instructions
    },
    {
      path: '/wizard',
      
      component: PowerShellWizard,
      children: [
        {          
          path: 'wizardSelectPowerShellScript',
          name: 'WizardSelectPowerShellScript',
          component: WizardSelectPowerShellScript
        },
        {
          path: 'wizardProvideWPowerShellScriptParameters',
          name: 'WizardProvideWPowerShellScriptParameters',
          component: WizardProvideWPowerShellScriptParameters
        },
        {
          path: 'wizardConfirmRun',
          name: 'WizardConfirmRun',
          component: WizardConfirmRun
        }
      ]
    },

  ]
})
