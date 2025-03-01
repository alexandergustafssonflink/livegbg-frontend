<template>
  <div class="menu">
    <q-btn
      flat
      @click="this.$emit('close')"
      size="xl"
      class="close-btn"
      icon="close"
    ></q-btn>
    <div>
      <div v-if="chosenEvent">
        <h3 class="q-mt-xl q-mb-lg">Event info</h3>
        <div class="img-wrapper">
          <h5 class="artist-name">
            {{ chosenEvent.title }}
          </h5>
          <p></p>
          <img :src="chosenEvent.imageUrl" alt="" />
        </div>
        <div>
          <p :style="{ fontSize: '20px' }">{{ chosenEvent.eventInfo }}</p>
          <h5 class="flex justify-between" :style="{ fontSize: '20px' }">
            <span>PLATS:</span> <span>{{ chosenEvent.place }}</span>
          </h5>
          <h5 class="flex justify-between" :style="{ fontSize: '20px' }">
            <span>DATUM</span> <span>{{ chosenEvent.date.split("T")[0] }}</span>
          </h5>
          <h5 class="flex justify-between" :style="{ fontSize: '20px' }">
            <span>INTRÄDE:</span> <span>{{ chosenEvent.eventPrice }}</span>
          </h5>

          <q-btn
            v-if="chosenEvent.ticketLink"
            :href="normalizedTicketLink"
            target="_blank"
            color="purple"
            class="q-mt-lg"
            rel="noopener noreferrer"
          >
            Köp biljett
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventInfo",
  watch: {
    chosenArtist() {},
  },
  components: {},
  methods: {},
  computed: {
    normalizedTicketLink() {
      if (this.chosenEvent && this.chosenEvent.ticketLink) {
        if (
          this.chosenEvent.ticketLink.startsWith("http://") ||
          this.chosenEvent.ticketLink.startsWith("https://")
        ) {
          return this.chosenEvent.ticketLink;
        } else {
          return "https://" + this.chosenEvent.ticketLink;
        }
      }
      return "";
    },
  },
  props: ["chosenEvent"],
  data() {
    return {
      isLoading: Boolean,
      // eventInfo: null,
    };
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
