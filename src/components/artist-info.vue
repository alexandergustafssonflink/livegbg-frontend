<template>
  <div class="menu">
    <q-btn
      flat
      @click="this.$emit('close')"
      size="xl"
      class="close-btn"
      icon="close"
    ></q-btn>
    <div v-if="isLoading" class="loading">
      <q-spinner size="xl"></q-spinner>
      <h5>Söker efter låtar...</h5>
    </div>
    <div v-else>
      <div v-if="artistData">
        <h3 class="q-mt-xl q-mb-lg">Låtar</h3>
        <div class="img-wrapper">
          <h5 class="artist-name">
            {{ artistData.artists.hits[0].artist.name }}
          </h5>
          <img :src="artistData.artists.hits[0].artist.avatar" alt="" />
        </div>

        <div
          v-for="(track, i) in artistData.tracks.hits"
          :key="track.key"
          class="song-wrapper"
        >
          <a
            :href="track.track.hub.providers[0].actions[0].uri"
            class="song"
            v-if="i < 3"
          >
            <h5>{{ track.track.title }}</h5>
            <q-icon name="play_circle" size="lg"></q-icon>
            <!-- <q-btn dense no-caps flat :href="track.track.hub.providers[0].actions[0].uri" icon="play_circle"></q-btn> -->
          </a>
        </div>
      </div>
      <div v-else>
        <h3 class="q-mt-xl q-mb-lg">Hittade inga låtar :(</h3>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ArtistInfo",
  watch: {
    chosenArtist() {
      this.getArtistInfo();
    },
  },
  components: {},
  methods: {
    async getArtistInfo() {
      this.isLoading = true;

      try {
        const options = {
          method: "GET",
          url: process.env.VUE_APP_API_URL + "artist",
          params: {
            artist: this.chosenArtist,
            locale: "en-US",
            offset: "0",
            limit: "5",
          },
          // headers: {
          //     'X-RapidAPI-Key': process.env.VUE_APP_SHAZAM_KEY,
          //     'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
          // }
        };

        const { data } = await axios.request(options);
        // const { data } = await axios.get(process.env.VUE_APP_API_URL + "artist?artist="+ this.chosenArtist)
        if (data.length) {
          this.artistData = data[0].info;
          // this.isLoading = false;
        } else {
          this.artistData = null;
          // this.isLoading = false;
        }
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
  props: ["showArtistInfo", "chosenArtist"],
  data() {
    return {
      events: [],
      isLoading: Boolean,
      artistData: null,
    };
  },
  async created() {
    this.getArtistInfo();
  },
};
</script>

<style scoped>
.menu {
  background: #100720;
  color: #ffc23c;
  height: 100%;
  width: 100%;
  padding: 2em;
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
}

.loading {
  margin-top: 200px;
}

.close-btn {
  position: absolute;
  top: 0;
  right: 0;
}

h3 {
  font-weight: 700;
  color: #ffc23c;
}

h5 {
  color: #ffc23c;
  margin: 0.25em;
}

.artist-name {
  color: #ffc23c;
}

.song h5 {
  text-align: left;
  white-space: nowrap;
  max-width: 275px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.song:hover {
  background: #9c27b0;
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

.song-wrapper {
  margin: 0 -2em 0 -2em;
}

.song {
  transition: 0.2s ease;
  padding: 0.5em 2em 0.25em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.song .q-icon {
  color: #ffc23c;
  opacity: 0.9;
}

.img-wrapper {
  width: 100%;
  height: 300px;
  position: relative;
  margin-bottom: 1em;
}

.img-wrapper h5 {
  box-shadow: rgb(0 0 0 / 35%) 0px 5px 15px;
  width: 100%;
  position: absolute;
  text-align: left;
  color: #ffc23c;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  margin: 0;
  padding: 0.5em;
}

.img-wrapper img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
</style>
