import Vue from 'vue'
import Router from 'vue-router'
import Instructions from '@/components/Instructions'
import PowerShellWizard from '@/components/PowerShellWizard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Instructions',
      component: Instructions
    },
    {
      path: '/wizard',      
      name: 'Wizard',
      component: PowerShellWizard
    }
  ]
})
