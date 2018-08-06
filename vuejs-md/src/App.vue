<template>
  <div class="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
  import Navbar from './components/Navbar'
  
export default {
  name: 'app',
  data: () => ({
    menuVisible: false
  }),
  components:{
    Navbar
  }
}
</script>