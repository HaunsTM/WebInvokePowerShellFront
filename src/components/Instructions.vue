<template>
	<article>
		<h2>Welcome to Tieto PowerShell tool </h2>
		<p>This tool will help you to run prepared sets of PowerShell commands. Each set has different responsibilities.</p>
		<p>WebInvokePowerShell is a web application which guides users to provide a powershell script file with arguments. When it has collected all data, the script is run.</p>
		<p>This SPA is just a part of an eco-system. There are separate backend and frontend. Backend is a C# WCF-application running on an IIS-instance, front is a SPA made with VueJS (running on another IIS-instance,). Backend is responsible for the main powershell script performance.</p>
		
		<section class="flex-container">
			<md-button class="md-icon-button md-primary">
      	<span class="md-list-item-text"><router-link :to="{name: 'Wizard'}"><md-icon>arrow_forward</md-icon></router-link></span>	     
			</md-button>
		</section>

	</article>
</template>

<script>

export default {    
  name: "Instructions"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.flex-container {
		display: flex;
		justify-content: flex-end;
	}
	
</style>
