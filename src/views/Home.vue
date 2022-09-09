<template>
    <div>
        <div>
            <div v-if="isLoading">
                <q-spinner class="q-mt-xl" size="large"></q-spinner>
            </div>
            <div v-else>
                <div class="events-today-wrapper">
                    <h3 v-if="eventsToday.length">Events today</h3>
                    <div class="events-today">
                        <div class="event-card" v-for="(event, i) in eventsToday" :key="i" >
                            <div class="image-wrapper">
                                <p class="date"><span class="place"> <q-icon size="24px" class="q-mr-sm" name="place"></q-icon>{{event.place}}</span><span>{{event.date.split("T")[0]}}</span></p>
                                <img :src="event.imageUrl" alt="">
                            </div>
                            <div class="info-wrapper">
                                <h5>{{event.title}}</h5>
                                <p></p>
                                    <q-btn color="purple" class="info-btn" outline no-caps @click="showArtistInfo = true; chosenArtist=event.title">Search tracks</q-btn>
                                    <q-btn color="purple" class="event-btn" no-caps :href="event.link">Go to event</q-btn>
                            
                                <!-- <q-btn color="purple" class="readmore-btn" no-caps :href="event.link">Läs mer</q-btn> -->
                            </div>
                        </div>
                    </div>
                </div>
                <h3>Upcoming events</h3>
                <div class="event-wrapper">
                    
                    <div class="event-card" v-for="(event, i) in events" :key="i" >
                        <div class="image-wrapper">
                            <p class="date"><span class="place"> <q-icon size="24px" class="q-mr-sm" name="place"></q-icon>{{event.place}}</span><span>{{event.date.split("T")[0]}}</span></p>
                            <img :src="event.imageUrl" alt="">
                        </div>
                        <div class="info-wrapper">
                            <h5>{{event.title}}</h5>
                            <p></p>
                                <q-btn color="purple" class="info-btn" outline no-caps @click="showArtistInfo = true; chosenArtist=event.title">Search tracks</q-btn>
                                <q-btn color="purple" class="event-btn" no-caps :href="event.link">Go to event</q-btn>
                        
                            <!-- <q-btn color="purple" class="readmore-btn" no-caps :href="event.link">Läs mer</q-btn> -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="artist-menu" :class="showArtistInfo ? 'show' : 'hide'">
                <artist-info v-if="showArtistInfo" :chosen-artist="chosenArtist" :show-artist-info="showArtistInfo"  @close="showArtistInfo=false" />
            </div>
        </div>
   </div>
</template>

<script>
import axios from "axios";
import ArtistInfo from "@/components/artist-info.vue";

export default {
    name: 'Home',
    components: {
        ArtistInfo
    },
    methods: {
        async getEvents() {
            this.isLoading = true;
            const { data } = await axios.get(process.env.VUE_APP_API_URL + "events")
            this.events = data[0].events;
            this.isLoading = false;
        }
    },
    data() {
        return {
            events: [],
            isLoading: Boolean,
            showArtistInfo: false,
            chosenArtist: "",
            eventsToday: ""
        }
    },
    async created() {
        await this.getEvents();
        this.events.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });

        const today = new Date().toJSON().split("T")[0];
    
        this.eventsToday = this.events.filter(event => event.date.split('T')[0] == today) 
        this.events = this.events.filter(event => event.date.split('T')[0] !== today).filter(event => new Date(event.date).getTime() > new Date(today).getTime())
    }
}
</script>

<style scoped>
h3 {
    font-weight: bold;
    margin: 1em;
    color: whitesmoke;
}

.event-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.events-today {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}


.events-today .event-card {
    width: 500px;
    height: 440px;
}

.events-today .image-wrapper {
    height: 250px;
}

.event-card {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 400px;
    height: 340px;
    border-radius: 0.25em;
    margin: 2em;
    position: relative;
    background-color: whitesmoke;
}

.image-wrapper {
    width: 100%;
    height: 200px;
    position: relative;
}

img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
h5 {
    text-align: left;
    margin: 0;
    max-height: 2.8em;
    overflow: hidden;
}

.buttons {
    display: flex;
    justify-content: space-between;
}

.info-btn {
    position: absolute;
    bottom: 1em;
    left: 2em;
}

.event-btn {
    position: absolute;
    bottom: 1em;
    right: 2em;
}
/* 
#100720
#31087B
#FA2FB5
#FFC23C */
.date {
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    color:#FFC23C;
    width: 100%;
    padding: 0.5em;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    font-weight: bold;
}

.place {
    display: flex;
    align-items: center;
}
.info-wrapper {
    padding: 1em 2em;
}    

.info-wrapper p {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
}


.artist-menu {
    height: 100vh;
    width:400px;
    position: fixed;
    transition: 0.3s ease;
    background: #31087B;
}

    .artist-menu.show {
        left: 0px;
        top: 0px;
        transition: 0.3 ease;
        z-index: 2000;
    }

    .hide {
        top: 0px;
        left: -100vw;
        transition: 0.3 ease;
    }

@media only screen and (max-width: 800px) {
    .events-today .event-card {
        width:100%;
        height: 340px;
    }

    .events-today .image-wrapper {
        height: 200px;
    }
    .artist-menu {
        height: 100vh;
        width:100vw;
    }
    .event-card  {
        width: 100%;
        margin: 1em;
    }

    .events-today-wrapper h3 {
        margin-top: 60px;
    }

    h3 {
        margin: 0.5em;
    }
}
</style>
