<template>
    <div>
        <h3>Alla evenemang</h3>
        <div class="event-wrapper">
            <div v-for="(event, i) in events" :key="i" class="event-card">
                <div class="image-wrapper">
                    <p class="date">{{event.date.split("T")[0]}}</p>
                    <img :src="event.imageUrl" alt="">
                </div>
                <div class="info-wrapper">
                    <h5>{{event.title}}</h5>
                    <p><q-icon size="24px" name="place"></q-icon>{{event.place}}</p>
                    <q-btn color="purple" class="readmore-btn" no-caps :href="event.link">Läs mer</q-btn>
                </div>
            </div>
        </div>
   </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'Home',
    components: {
    },
    methods: {
        async getEvents() {
             const { data } = await axios.get(process.env.VUE_APP_API_URL + "events")
             this.events = data[0].events;
        }
    },
    data() {
        return {
            events: []
        }
    },
    async created() {
        await this.getEvents();

        this.events.sort(function(a,b){
        return new Date(a.date) - new Date(b.date);
    });
    }
}
</script>

<style>
h3 {
    font-weight: bold;
    margin: 1em;
}

.event-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.event-card {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 400px;
    height: 400px;
    border-radius: 1em;
    margin: 2em;
    position: relative;
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
}
/* 
#100720
#31087B
#FA2FB5
#FFC23C */
.date {
    position: absolute;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    color:#FFC23C;
    width: 100%;
    padding: 0.5em;
    text-align: right; 
    font-size: 16px;
    font-weight: bold;
}

.info-wrapper {
    padding: 1em 2em;
}    

.info-wrapper p {
    font-size: 16px;
    font-weight: bold;
    text-align: left;
}
.readmore-btn {
    positioN: absolute;
    right: 2em;
    bottom: 1em; 

}
</style>
