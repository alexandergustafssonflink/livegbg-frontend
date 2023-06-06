<template>
    <div class="navbar">
        <div class="inner-navbar">
            <div>
            <!-- <h3 class="logo q-mr-xl">LIVE GBG</h3> -->
            <div class="logo-wrapper q-mr-xl">
                <img src="@/assets/logo.png" alt="" />
            </div>
                <router-link to="/">
                    <q-btn class="q-ml-xl" size="24px" no-caps color="primary" flat outlined  label="Event"></q-btn>
                </router-link>
                <router-link to="/about">
                    <q-btn class="q-ml-lg" size="24px" no-caps  color="primary" flat outlined  label="Om oss"></q-btn>
                </router-link>
            </div>
        </div>
    </div>
    <div class="navbar-mobile">
        <div class="hamburger" @click="navActive = !navActive" :class="navActive ? 'cross' : ''">
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div class="navmenu" :class="navActive ? 'show' : 'hide'">
            <div class="links">
                <router-link @click="navActive = false" to="/"><h3>event</h3></router-link>
                <router-link @click="navActive = false" to="/about"><h3>om oss</h3></router-link>
            </div>
            <div class="logo-small-wrapper">
                <img src="@/assets/logo-small.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NavBar',
    components: {
    },
    methods: {
    },
    data() {
        return {
            navActive: false
        }
    },
    created() {
    }
}
</script>

<style scoped>
.links {
    margin-top: 7em;
    z-index: 1000;
}

.links h3 {
    color:  #31087B;
    text-align: left;
    margin-bottom: 1em;
}

.logo-wrapper {
    height: 95%;
    padding: 0.25em 0;
}

.logo-wrapper img {
    width: 100%;
    height: 100%;
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
    font-family: 'Teko', sans-serif;
}

h3 {
    color: whitesmoke;
    font-weight: bold;
}
.navbar {
    background-color: #31087B;
    width: 100vw;
    display: flex;
    height: 80px;
    justify-content: center;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
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
    height: 100%;
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
    background: #3EA39F !important;
    color: white !important;
}

@media only screen and (max-width: 820px) {
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
        border: 2px solid #31087B !important;
    }
    .hamburger div {
        transition: 0.3s ease;
        border: 2px solid #FFC23C;
        margin: 0.5em;
    }

    .navmenu {
        width: 100vw;
        padding: 2em;
        height: 100%;
        background: #FFC23C;
        position: fixed;
        z-index: 900;
        transition: 0.3s ease;
    }

    .hide{
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

@media only screen and (min-width: 820px) {
    .navbar-mobile {
        display: none;
    }
}
</style>
