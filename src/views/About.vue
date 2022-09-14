<template>
    <div class="about">
        <h3>Gothenburg has a great live scene and our mission is to make it a little bit more accessible</h3>
        <h3 class="q-mt-xl">Contact: <a href="mailto:hello@livegbg.se">hello@livegbg.se</a></h3>
   </div>
</template>

<script>
export default {
    name: 'About',
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

<style scoped>

.about {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 1em;
}
h3 {
    color: whitesmoke;
    max-width: 640px;
}

a {
    transition: 0.3s ease;
}

a:hover {
    color:#FFC23C;
}

h4 {
    color: whitesmoke;
}
   
</style>
