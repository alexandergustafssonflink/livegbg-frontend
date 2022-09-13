<template>
    <div class="about">
        <h3>Gothenburg has a great live scene and our mission is to make it a little bit more accessable</h3>
        <h3 class="q-mt-xl">Contact: <a href="mailto:hello@livegbg.se">hello@livegbg.se</a></h3>
   </div>
</template>

<script>
import axios from "axios"
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

const options = {
  method: 'GET',
  url: 'https://theaudiodb.p.rapidapi.com/search.php',
  params: {s: 'coldplay'},
  headers: {
    'X-RapidAPI-Key': 'ec9aa8bc58mshd67a80832cc48f4p109dcfjsnc06444c366d5',
    'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});
    }
}
</script>

<style>

.about {
    height: 75vh;
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

h4 {
    color: whitesmoke;
}
   
</style>
