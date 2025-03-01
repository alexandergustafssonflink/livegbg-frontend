<template>
  <div class="event-container">
    <!-- Om det finns en länk, gör event-info klickbar -->
    <template v-if="event.link">
      <a :href="event.link">
        <div class="event-info">
          <h5>{{ event.title }}</h5>
          <p class="date-place">
            {{ event.date.split("T")[0] }} - {{ event.place }}
          </p>
        </div>
      </a>
    </template>
    <template v-else>
      <div class="event-info">
        <h5>{{ event.title }}</h5>
        <p class="date-place">
          {{ event.date.split("T")[0] }} - {{ event.place }}
        </p>
      </div>
    </template>
    <div class="image-wrapper">
      <template v-if="event.link">
        <a :href="event.link">
          <img
            v-if="event.place == 'Valand'"
            loading="lazy"
            :src="`https://livegbg-test.herokuapp.com/api/proxy?url=${event.imageUrl}`"
            alt=""
          />
          <img loading="lazy" v-else :src="event.imageUrl" alt="" />
        </a>
      </template>
      <template v-else>
        <img
          v-if="event.place == 'Valand'"
          loading="lazy"
          :src="`https://livegbg-test.herokuapp.com/api/proxy?url=${event.imageUrl}`"
          alt=""
        />
        <img loading="lazy" v-else :src="event.imageUrl" alt="" />
      </template>
      <div class="info-wrapper">
        <q-btn
          v-if="
            !event.title.toLowerCase().includes('open stage') &&
            !event.title.toLowerCase().includes('hängmattan') &&
            !event.title.toLowerCase().includes('barnens ocean') &&
            !event.title.toLowerCase().includes('barnmattan') &&
            !event.title.toLowerCase().includes('poesi och prosa') &&
            !event.title.toLowerCase().includes('konsert') &&
            !event.imageUrl.toLowerCase().includes('cloudinary.com/dvyl105jb')
          "
          class="info-btn"
          no-caps
          @click="$emit('showArtistInfo', event.title)"
        >
          SÖK LÅTAR
        </q-btn>
        <q-btn color="purple" class="event-btn" no-caps @click="handleMoreInfo">
          MER INFO
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  emits: ["showEventInfo", "showArtistInfo"],
  components: {},
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleMoreInfo() {
      // "this.event" refererar nu till din prop
      if (this.event.link && this.event.link.trim() !== "") {
        this.trackLink(this.event);
      } else {
        this.$emit("showEventInfo", this.event);
      }
    },
    trackLink(event) {
      this.$gtag.event("click", {
        event_category: event.place,
        event_label: event.title,
        value: event.link,
      });

      window.location = event.link;
    },
  },
  data() {
    return {
      // events: [],
      isLoading: Boolean,
      showArtistInfo: false,
      showEventInfo: false,
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
  line-height: 1.25em;
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
  margin-top: -4px;
  margin-bottom: 2px;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
}

@media only screen and (min-width: 500px) {
  h5 {
    color: whitesmoke;
    text-align: left;
    margin: 0;
    max-width: 100%;
    max-height: 1.5em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
