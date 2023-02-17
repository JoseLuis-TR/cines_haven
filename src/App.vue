<script>

export default {
  name: 'App',
  beforeMount() {
    fetch("http://localhost:3001/havenV1/")
  }
}
</script>

<template>
  <RouterView></RouterView>
</template>

<style>
</style>
