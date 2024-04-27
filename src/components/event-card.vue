<template>
  <div class="event-container">
    <a :href="event.link">
      <div class="event-info">
        <h5>{{ event.title }}</h5>
        <p class="date-place">
          {{ event.date.split("T")[0] }} - {{ event.place }}
        </p>
      </div>
    </a>
    <div class="image-wrapper" @click="() => console.log('hej')">
      <a :href="event.link">
        <img
          :src="
            event.place == 'Valand' ? '@/assets/valand.jpeg' : event.imageUrl
          "
          alt=""
        />
      </a>
      <div class="info-wrapper">
        <q-btn
          v-if="
            !event.title.toLowerCase().includes('open stage') &&
            !event.title.toLowerCase().includes('hängmattan') &&
            !event.title.toLowerCase().includes('barnens ocean') &&
            !event.title.toLowerCase().includes('barnmattan') &&
            !event.title.toLowerCase().includes('poesi och prosa') &&
            !event.title.toLowerCase().includes('barnmattan') &&
            !event.title.toLowerCase().includes('konsert')
          "
          class="info-btn"
          no-caps
          @click="$emit('showArtistInfo', event.title)"
        >
          SÖK LÅTAR
        </q-btn>
        <q-btn color="purple" class="event-btn" no-caps :href="event.link"
          >MER INFO</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  components: {},
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {},
  data() {
    return {
      // events: [],
      isLoading: Boolean,
      showArtistInfo: false,
      chosenArtist: "",
      search: "",
    };
  },
  computed: {},
  async created() {},
};
</script>

<style scoped>
.event-container {
  margin: 3em 2em;
  width: 400px;
  /* border: 3px solid transparent; */
  box-sizing: border-box;
  overflow: hidden;
}

.event-container .info-wrapper {
  height: 0;
}
.event-container:hover .info-wrapper {
  padding: 2em 1em;
  display: flex;
  opacity: 1;
}

.event-container:hover button {
  display: block;
}

.event-container:hover {
  /* border: 3px solid white; */
  cursor: pointer;
}
h5 {
  color: whitesmoke;
  text-align: left;
  margin: 0;
  max-width: 100%;
  max-height: 1.5em;
  overflow: hidden;
  text-overflow: ellipsis;
}

.image-wrapper {
  width: 100%;
  height: 500px;
  position: relative;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info-wrapper {
  width: 100%;
  height: 0;
  transition: 0.3s ease;
  position: absolute;
  bottom: 0;
  opacity: 0;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(16, 7, 32, 0.5);
}

.info-wrapper button {
  max-height: 0;
}

.info-btn {
  width: 40%;
  background: #ffc23c;
  color: black;
}

.q-btn {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
}

.event-btn {
  width: 40%;
}
.date-place {
  color: #ffc23c;
  width: 100%;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
}

@media only screen and (min-width: 800px) {
}

@media only screen and (max-width: 800px) {
  .search-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin: 1em;
    margin-top: 5em;
  }

  .event-container .info-wrapper {
    display: flex;
    padding: 2em 1em;
    height: 50px;
    opacity: 1;
  }

  .info-wrapper button {
    max-height: unset;
  }

  .event-container {
    width: 100%;
    margin: 1em;
  }

  h3 {
    margin: 0.5em;
  }
}

@media only screen and (min-width: 600px) and (max-width: 1100px) {
  .event-container {
    width: 40%;
  }
}
</style>
