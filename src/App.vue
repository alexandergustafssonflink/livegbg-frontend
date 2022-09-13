<template>
    <div class="app-wrapper">
    <nav-bar />
    <div class="page-wrapper">
        <router-view />
    </div>
    </div>
</template>

<script>
import NavBar from "@/components/navbar.vue";

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Teko:wght@700&display=swap');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


html, body {
    background-color: #100720
    
}

a {
    text-decoration: none;
    color: inherit;
}

/* .bg-yellow {
    background-color: #FFC23C !important;
} */

/* .text-yellow {
    background-color: #FFC23C !important;
} */

.page-wrapper {
    /* max-width: 1200px;
    min-width: 900px; */
    display: flex;
    justify-content: center;
    /* flex-direction: column; */
}
#app {
    display: flex;
    justify-content: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  color: whitesmoke
}

h5 {
    font-weight: 700 !important;
    opacity:0.9;
    color: #31087B;
}

h3 {
    margin: 0;
    font-family: 'Teko', sans-serif;
}

.box {
    padding: 1.5em;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;;
    transition: 0.3s ease;
    border-radius: 0.5em;
}
.container {
    min-width: 900px;
    max-width: 1400px;
    margin-bottom: 3em;
}
</style>
