<template>
   <div>
    <h1>Om oss</h1>
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
   
</style>
