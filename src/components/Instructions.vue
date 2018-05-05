<template>
	<article>
		<h2>Welcome to Tieto PowerShell tool </h2>
		<p>This tool will help you to run prepared sets of PowerShell commands. Each set has different responsibilities.</p>
		<p>There</p>
		<md-button class="md-icon-button md-primary">
            <span class="md-list-item-text"><router-link :to="{name: 'WizardSelectPowerShellScript'}"><md-icon>arrow_forward</md-icon></router-link></span>	     
		</md-button>

	</article>
</template>

<script>

export default {    
  name: "Instructions"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h2{
        color: red;
	}
</style>
