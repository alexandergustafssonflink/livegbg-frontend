<template>
    <div class="menu">
        <q-btn flat @click="this.$emit('close')" size="xl" class="close-btn" icon="close"></q-btn>
        <div v-if="isLoading" class="loading">
            <q-spinner size="xl" ></q-spinner>
            <h5>Laddar artistens låtar...</h5>
        </div>
        <div v-else>
            <div v-if="tracks">
                <h3 class="q-mt-xl q-mb-lg">Top tracks</h3>
                <div v-for="track in tracks" :key="track.key">
                    <a :href="track.track.hub.providers[0].actions[0].uri" class="song">
                        <h5>{{track.track.title}}</h5>
                        <q-btn dense no-caps flat :href="track.track.hub.providers[0].actions[0].uri" icon="play_circle"></q-btn>
                    </a>
                </div>
            </div>
            <div v-else>
                <h3 class="q-mt-xl q-mb-lg">No tracks found</h3>
            </div>
        </div>
   </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'ArtistInfo',
    components: {
    },
    methods: {
        async getArtistInfo() {
            this.isLoading = true;
            const options = {
            method: 'GET',
            url: 'https://shazam.p.rapidapi.com/search',
            params: {term: this.chosenArtist, locale: 'en-US', offset: '0', limit: '5'},
            headers: {
                'X-RapidAPI-Key': process.env.VUE_APP_SHAZAM_KEY,
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
            };

            const {data} = await axios.request(options);
            console.log(data);
            if(data.tracks) {
                this.tracks = data.tracks.hits
            } else {
                if(this.chosenArtist.includes("+")) {
                    const splittedArtist = this.chosenArtist.split("+")[0];
                    const options = {
                    method: 'GET',
                    url: 'https://shazam.p.rapidapi.com/search',
                    params: {term: splittedArtist, locale: 'en-US', offset: '0', limit: '5'},
                    headers: {
                        'X-RapidAPI-Key': process.env.VUE_APP_SHAZAM_KEY,
                        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                    }
                    };

                    const { data } = await axios.request(options);
                    if(data.tracks) {
                        this.tracks = data.tracks.hits
                    } 
                } else if(this.chosenArtist.includes("#")) {
                    const splittedArtist = this.chosenArtist.split("#")[0];
                    const options = {
                    method: 'GET',
                    url: 'https://shazam.p.rapidapi.com/search',
                    params: {term: splittedArtist, locale: 'en-US', offset: '0', limit: '5'},
                    headers: {
                        'X-RapidAPI-Key': process.env.VUE_APP_SHAZAM_KEY,
                        'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
                    }
                    };

                    const { data } = await axios.request(options);
                    if(data.tracks) {
                        this.tracks = data.tracks.hits
                    } 
                }
            }
            
            
            console.log(data);

            this.isLoading = false;

            // axios.request(options).then(function (response) {
            //     // this.artistInfo = response.data
            //     let data = response.data.artists[0];

            //     this.artistInfo = data;
            // }).catch(function (error) {
            //     console.error(error);
            // });
        }
    },
    props: ["showArtistInfo", "chosenArtist"],
    data() {
        return {
            events: [],
            isLoading: Boolean,
            tracks: null
        }
    },
    async created() {
        this.getArtistInfo() 
    }
}
</script>

<style scoped>
    .menu {
        color: #FFC23C;
        height: 100%;
        width: 100%;
        padding: 2em;
    }

    .loading {
        margin-top: 200px;
    }

    .close-btn{
        position: absolute;
        top: 0;
        right: 0;
    }

    h5 {
        color: #FFC23C;
        margin: 0.25em;
    }

    .song h5 {
        text-align: left;
    }


    .show {
        left: 0px;
        top: 0px;
        transition: 0.3s ease;
    }

    .hide {
        top: 0px;
        left: -30vw;
        transition: 0.3s ease;
    }

    .song {
        display: flex;
        justify-content: space-between;
    }
</style>
