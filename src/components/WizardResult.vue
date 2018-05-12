<template>
  <article>
    {{value}}
  </article>
</template>

<script>
export default {    
  name: "WizardResult",
  
  data: function () {
    return {
      value: "0"
    };
  },
  methods: {
    setValue: function(value) {
        this.value = value;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
