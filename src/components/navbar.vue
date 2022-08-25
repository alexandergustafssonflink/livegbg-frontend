<template>
    <div class="navbar">
        <div class="inner-navbar">
            <div>
                <h5>LIVE GBG</h5>
                <router-link to="/">
                    <q-btn class="q-ml-xl" size="18px" no-caps color="purple" flat outline  label="Konserter"></q-btn>
                </router-link>
                <router-link to="/about">
                    <q-btn class="q-ml-lg" size="18px" no-caps  color="purple" flat outline  label="Om oss"></q-btn>
                </router-link>
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
        }
    },
    created() {
    }
}
</script>

<style>
    .navbar {
        background-color: white;
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
    }
    
    .navbar a {
        height: 100%;
    } 

    button.active {
        background: #3EA39F !important;
        color: white !important;
    }
</style>
