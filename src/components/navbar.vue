<template>
  <div class="navbar">
    <div class="inner-navbar">
      <div class="logo-wrapper q-mr-xl">
        <img src="@/assets/live-gbg-logo.png" alt="" />
      </div>
      <div class="nav-links">
        <!-- <h3 class="logo q-mr-xl">LIVE GBG</h3> -->
        <router-link to="/">
          <q-btn
            class="q-ml-xl"
            size="36px"
            no-caps
            color="secondary"
            flat
            outlined
            label="event"
          ></q-btn>
        </router-link>
        <router-link to="/about">
          <q-btn
            class="q-ml-xl"
            size="36px"
            no-caps
            color="secondary"
            flat
            outlined
            label="om oss"
          ></q-btn>
        </router-link>
      </div>
    </div>
  </div>
  <div class="navbar-mobile">
    <div
      class="hamburger"
      @click="navActive = !navActive"
      :class="navActive ? 'cross' : ''"
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="navmenu" :class="navActive ? 'show' : 'hide'">
      <div class="links">
        <router-link @click="navActive = false" to="/"
          ><h3>evenemang</h3></router-link
        >
        <router-link @click="navActive = false" to="/about"
          ><h3>om oss</h3></router-link
        >
      </div>
      <!-- <div class="logo-small-wrapper">
        <img src="@/assets/live-gbg-logo.png" alt="" />
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  components: {},
  methods: {},
  data() {
    return {
      navActive: false,
    };
  },
  created() {},
};
</script>

<style scoped>
.links {
  margin-top: 7em;
  z-index: 1000;
}

.links h3 {
  color: #31087b;
  text-align: left;
  margin-bottom: 1em;
}

.nav-links {
  margin-left: 25em;
}

.logo-wrapper {
  position: absolute;
  height: 170px;
  bottom: -5em;
}

.logo-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-small-wrapper {
  bottom: -8vh;
  position: absolute;
  right: -20vh;
  height: 60vh;
  width: 60vh;
  opacity: 0.6;
  z-index: 100;
}

.logo-small-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
.logo {
  margin-top: 8px;
  font-family: "Teko", sans-serif;
}

h3 {
  color: whitesmoke;
  font-weight: bold;
}
.navbar {
  background-color: #232323;
  width: 100vw;
  display: flex;
  position: relative;
  height: 100px;
  justify-content: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.inner-navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;
  min-width: 1200px;
  max-width: 1400px;
}
.navbar div {
  display: flex;
  align-items: center;
}

.navbar button {
  height: 100%;
  font-weight: 700;
}

.navbar a {
  height: 100%;
}

button.active {
  background: #3ea39f !important;
  color: white !important;
}

@media only screen and (max-width: 1100px) {
  .navbar {
    display: none;
  }

  .hamburger {
    width: 4em;
    position: fixed;
    top: 2em;
    right: 1em;
    z-index: 1000;
    transition: 0.3s ease;
  }

  .cross div:nth-child(2) {
    opacity: 0;
  }
  .cross div:nth-child(1) {
    transform: translateY(10px) rotate(-45deg);
  }

  .cross div:nth-child(3) {
    transform: translateY(-11px) rotate(45deg);
  }

  /* .cross :nth-child() */

  .hamburger.cross div {
    border: 2px solid #31087b !important;
  }
  .hamburger div {
    transition: 0.3s ease;
    border: 2px solid #ffc23c;
    margin: 0.5em;
  }

  .navmenu {
    width: 100vw;
    padding: 2em;
    height: 100%;
    background: #ffc23c;
    position: fixed;
    z-index: 900;
    transition: 0.3s ease;
  }

  .hide {
    right: -100vw;
  }

  .show {
    right: 0px;
  }

  .navbar-mobile {
    /* top: 0px;
        left: 0px; */
  }
}

@media only screen and (min-width: 1100px) {
  .navbar-mobile {
    display: none;
  }
}
</style>
