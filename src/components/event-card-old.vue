<template>
  <div class="event-card">
    <div class="image-wrapper">
      <p class="date">
        <span class="place">
          <q-icon size="24px" class="q-mr-sm" name="place"></q-icon
          >{{ event.place }}</span
        ><span>{{ event.date.split("T")[0] }}</span>
      </p>
      <img :src="event.imageUrl" alt="" />
    </div>
    <div class="info-wrapper">
      <h5>{{ event.title }}</h5>
      <q-btn
        color="purple"
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
        outline
        no-caps
        @click="$emit('showArtistInfo', event.title)"
        >Sök låtar</q-btn
      >
      <q-btn color="purple" class="event-btn" no-caps :href="event.link"
        >Gå till event</q-btn
      >
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
h1 {
  font-weight: bold;
  font-size: 36px;
  color: whitesmoke;
}
h3 {
  font-weight: bold;
  margin: 1em;
  color: whitesmoke;
  text-align: center;
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
  max-width: 280px;
  overflow: hidden;
}

.spinner-wrapper {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: #ffc23c;
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
  width: 400px;
  position: fixed;
  transition: 0.3s ease;
  background: #31087b;
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

.search {
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: solid 3px whitesmoke;
  padding-right: 3em;
  margin-right: 3em;
}

.search .q-btn {
  margin-left: 1em;
}

.filter {
  justify-content: center;
  display: flex;
  align-items: center;
}

.filter h5 {
  color: whitesmoke;
  margin-right: 1em;
}

.filter :deep(input) {
  color: whitesmoke;
}

.filter :deep(select span) {
  color: whitesmoke;
}

.search-date i {
  color: #ffc23c;
}

.place-select {
  width: 200px;
}

.last-fetch {
  opacity: 0.4;
}
@media only screen and (min-width: 800px) {
  .title-header {
    margin-bottom: 0;
  }
  .last-fetch {
    margin-top: 0;
  }
  .mobile-filter-btn {
    display: none;
  }
  .filter-close-btn {
    display: none;
  }
  .results-btn {
    display: none;
  }

  .clear-filter {
    margin-left: 1em;
  }

  .search-mobile {
    display: none;
  }
}

@media only screen and (max-width: 800px) {
  .title-header {
    line-height: 1em;
    margin-top: 2em;
    margin-bottom: 0;
  }

  .search {
    display: none;
  }

  .search-mobile {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    margin: 1em;
    margin-top: 5em;
  }

  .no-events {
    width: 100%;
  }

  .wrapper {
    width: 100vw;
  }

  .search-mobile :deep(input) {
    color: whitesmoke;
  }

  .search-mobile :deep(select span) {
    color: whitesmoke;
  }

  .search-mobile label {
    width: 100%;
  }

  .search-mobile .q-btn {
    width: 100%;
  }
  .events-today .event-card {
    width: 100%;
    height: 340px;
  }

  .events-today .image-wrapper {
    height: 200px;
  }
  .artist-menu {
    height: 100%;
    width: 100vw;
  }
  .event-card {
    width: 100%;
    margin: 1em;
  }

  /* .events-today-wrapper h3 {
        margin-top: 2em;
    } */

  h3 {
    margin: 0.5em;
  }

  .filter {
    height: 100%;
    width: 100vw;
    background-color: #100720;
    justify-content: inherit;
    padding-top: 5em;
    position: fixed;
    top: 0;
    z-index: 2000;
    margin-top: 0;
    flex-direction: column;
    transition: 0.3s ease;
    padding: 5em 2em 2em 2em;
  }

  .filter .q-mr-md {
    margin-right: 0;
  }

  .filter-close-btn {
    top: 0em;
    right: 0em;
    position: absolute;
  }

  .mobile-filter-btn {
    position: fixed;
    bottom: 2em;
    left: 2em;
    z-index: 500;
  }

  .mobile-filter-btns {
    margin-top: 2em;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .clear-filter {
    margin-right: 0.25em;
  }

  .results-btn {
    margin-left: 0.25em;
  }

  .show {
    left: 0;
  }

  .hide {
    transition: 0.3s ease;
    left: -100vw;
  }

  .place-select {
    width: 100%;
  }

  .filter h5 {
    margin-right: 0;
    font-size: 36px;
    margin-bottom: 1em;
  }

  .filter label {
    width: 100%;
    margin-top: 1em;
  }
  /* 
    .only-upcoming  {
        margin-top: 70px;
    } */

  .q-date {
    width: 90vw;
    height: 80vh;
  }
}
</style>
