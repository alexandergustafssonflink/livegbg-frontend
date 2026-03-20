<template>
  <div>
    <div class="logo-wrapper q-mt-sm" :class="isLoading ? 'pulsating' : ''">
      <img src="@/assets/live-gbg-logo.png" alt="" />
    </div>

    <p class="last-fetch q-mb-none" v-if="!isLoading">
      Senast uppdaterad: {{ lastFetch }}
    </p>

    <div class="filter q-mt-md" :class="showFilter ? 'show' : 'hide'">
      <div class="search">
        <q-input
          v-model="search"
          label-color="secondary"
          label="Sök event"
          color="secondary"
          @blur="search == '' ? (searchWord = '') : ''"
        >
          <template v-slot:append>
            <q-icon
              color="secondary"
              name="close"
              @click="
                search = '';
                searchWord = '';
              "
              class="cursor-pointer"
            />
          </template>
        </q-input>
        <q-btn
          no-caps
          label="SÖK"
          @click="searchWord = search"
          outline
          color="secondary"
        ></q-btn>
      </div>
      <q-btn
        icon="close"
        size="xl"
        flat
        class="filter-close-btn"
        @click="showFilter = false"
      ></q-btn>
      <h5>Filter</h5>
      <q-select
        class="place-select q-mr-md"
        v-model="place"
        :options="placesOptions"
        label="Plats"
        color="secondary"
        label-color="secondary"
      >
        <template v-slot:prepend>
          <q-icon color="secondary" name="place" @click.stop.prevent />
        </template>
        <template v-slot:append>
          <q-icon
            v-if="place"
            name="close"
            @click.stop.prevent="place = ''"
            class="cursor-pointer"
          />
        </template>
      </q-select>
      <q-input
        v-model="dateFrom"
        class="q-mr-md search-date"
        color="secondary"
        label-color="secondary"
        label="Datum från"
        placeholder="Anytime (XXXX-XX-XX)"
      >
        <template v-slot:append>
          <q-icon name="event" size="lg" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="dateFrom" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="secondary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input
        v-model="dateTo"
        class="search-date"
        color="secondary"
        label-color="secondary"
        label="Datum till"
        placeholder="Anytime (XXXX-XX-XX)"
      >
        <template v-slot:append>
          <q-icon name="event" size="lg" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="dateTo" mask="YYYY-MM-DD">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="secondary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <div class="mobile-filter-btns">
        <q-btn
          no-caps
          class="clear-filter"
          :disable="!dateFrom && !dateTo && !place"
          label="Rensa filter"
          @click="
            dateFrom = '';
            dateTo = '';
            place = '';
          "
          outline
          color="secondary"
        ></q-btn>
        <q-btn
          class="results-btn"
          no-caps
          label="Visa resultat"
          :disable="!dateFrom && !dateTo && !place"
          @click="closeFilterMenu"
          color="secondary"
        ></q-btn>
      </div>
    </div>
    <div>
      <div v-if="isLoading" class="spinner-wrapper">
        <q-spinner-audio color="secondary" size="8em" />
      </div>
      <div v-else class="wrapper">
        <div class="search-mobile">
          <q-input
            v-model="search"
            color="secondary"
            label-color="secondary"
            label="Sök event"
            @blur="search == '' ? (searchWord = '') : ''"
          >
            <template v-slot:append>
              <q-icon
                v-if="search || searchWord"
                color="secondary"
                size="lg"
                name="close"
                @click="
                  search = '';
                  searchWord = '';
                "
                class="cursor-pointer"
              />
            </template>
          </q-input>
          <q-btn
            class="q-mt-md"
            no-caps
            icon="search"
            label="SÖK"
            @click="searchWord = search"
            outline
            color="secondary"
          ></q-btn>
        </div>
        <q-btn
          class="mobile-filter-btn"
          no-caps
          icon="filter_alt"
          color="secondary"
          @click="showFilter = true"
        ></q-btn>
        <div v-if="eventsToday.length || events.length">
          <h3 v-if="eventsToday.length">Event idag</h3>
          <div class="events-today-wrapper">
            <div class="events-today">
              <EventCard
                @show-artist-info="(artist) => showArtistBar(artist)"
                @show-event-info="(e) => showEventBar(e)"
                :event="event"
                v-for="(event, i) in eventsToday"
                :key="i"
              />
            </div>
          </div>
          <h3
            v-if="events.length"
            :class="!eventsToday.length ? 'only-upcoming' : ''"
          >
            Kommande event
          </h3>
          <div class="event-wrapper">
            <EventCard
              @show-artist-info="(artist) => showArtistBar(artist)"
              @show-event-info="(e) => showEventBar(e)"
              :event="event"
              v-for="(event, i) in events"
              :key="i"
            />
          </div>
        </div>
        <div v-else class="no-events">
          <h3>Inga event hittades</h3>
        </div>
      </div>
      <div class="artist-menu" :class="showArtistInfo ? 'show' : 'hide'">
        <artist-info
          v-if="showArtistInfo"
          :chosen-artist="chosenArtist"
          :show-artist-info="showArtistInfo"
          @close="showArtistInfo = false"
        />
      </div>
      <div class="artist-menu" :class="showEventInfo ? 'show' : 'hide'">
        <event-info
          v-if="showEventInfo"
          :chosen-event="chosenEvent"
          :show-event-info="showEventInfo"
          @close="showEventInfo = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ArtistInfo from "@/components/artist-info.vue";
import EventInfo from "@/components/event-info.vue";
import EventCard from "@/components/event-card.vue";

export default {
  name: "HomePage",
  components: {
    ArtistInfo,
    EventCard,
    EventInfo,
  },
  methods: {
    async getEvents() {
      this.isLoading = true;
      const { data } = await axios.get(
        process.env.VUE_APP_API_URL + "events/gbg"
      );
      const today = new Date().toJSON().split("T")[0];
      this.allEvents = data[0].events
        .filter((event) => !event.title.toLowerCase().includes("inställt"))
        .filter(
          (event) =>
            new Date(event.date.split("T")[0]).getTime() >=
            new Date(today).getTime()
        );
      this.placesOptions = Array.from(
        new Set(
          this.allEvents.reduce((acc, event) => {
            acc.push(event.place);
            return acc;
          }, [])
        )
      );

      this.lastFetch =
        data[0].date.split("T")[0] +
        " " +
        data[0].date.split("T")[1].split(".")[0];
      this.isLoading = false;
    },
    closeFilterMenu() {
      window.scrollTo(0, 0);
      this.showFilter = false;
    },
    showArtistBar(artist) {
      this.showArtistInfo = true;
      this.chosenArtist = artist;
    },
    showEventBar(event) {
      this.showEventInfo = true;
      this.chosenEvent = event;
    },
  },
  data() {
    return {
      // events: [],
      isLoading: Boolean,
      showArtistInfo: false,
      showEventInfo: false,
      chosenArtist: "",
      chosenEvent: "",
      search: "",
      searchWord: "",
      place: "",
      placesOptions: [],
      dateFrom: "",
      dateTo: "",
      showFilter: false,
      allEvents: [],
      lastFetch: "",
    };
  },
  computed: {
    events() {
      const today = new Date().toJSON().split("T")[0];
      if (this.dateFrom || this.dateTo || this.place || this.searchWord) {
        const timestampFrom = this.dateFrom
          ? new Date(this.dateFrom).getTime()
          : 0;
        const timestampTo = this.dateTo
          ? new Date(this.dateTo).getTime()
          : 1649808000000212;

        let events = this.allEvents.filter((event) => {
          let timestamp = new Date(event.date.split("T")[0]).getTime();
          if (timestamp >= timestampFrom && timestamp <= timestampTo) {
            return true;
          } else {
            return false;
          }
        });
        events = events
          .filter((event) => event.place.includes(this.place))
          .filter((event) => event.date.split("T")[0] !== today);
        events = events.filter((event) =>
          event.title.toLowerCase().includes(this.searchWord.toLowerCase())
        );
        events.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        return events;
      } else {
        let events = this.allEvents.filter(
          (event) => event.date.split("T")[0] != today
        );
        events.sort(function (a, b) {
          return new Date(a.date) - new Date(b.date);
        });
        return events;
      }
    },
    eventsToday() {
      const today = new Date().toJSON().split("T")[0];
      let events = this.allEvents.filter(
        (event) => event.date.split("T")[0] == today
      );
      if (
        this.dateFrom !== "" ||
        this.dateTo !== "" ||
        this.place !== "" ||
        this.searchWord !== ""
      ) {
        const timestampFrom = this.dateFrom
          ? new Date(this.dateFrom).getTime()
          : 0;
        const timestampTo = this.dateTo
          ? new Date(this.dateTo).getTime()
          : 1649808000000212;
        let events = this.allEvents.filter((event) => {
          let timestamp = new Date(event.date.split("T")[0]).getTime();
          if (timestamp >= timestampFrom && timestamp <= timestampTo) {
            return true;
          } else {
            return false;
          }
        });
        events = events
          .filter((event) => event.place.includes(this.place))
          .filter((event) => event.date.split("T")[0] === today);
        events = events.filter((event) =>
          event.title.toLowerCase().includes(this.searchWord.toLowerCase())
        );
        return events;
      } else {
        return events;
      }
    },
  },
  async created() {
    await this.getEvents();
    this.events.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

    // const today = new Date().toJSON().split("T")[0];
    // console.log(typeof today);

    // this.eventsToday = this.allEvents.filter(event => event.date.split('T')[0] == today)
    // this.events = this.allEvents.filter(event => event.date.split('T')[0] != today)
  },
};
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.7);
    opacity: 0.85;
  }
}

.pulsating {
  display: inline-block;
  animation: pulse 2s infinite;
}
h1 {
  font-weight: bold;
  font-size: 36px;
  color: #1a1208;
  font-family: "Playfair Display", Georgia, serif;
}
h3 {
  font-weight: 900;
  margin: 1em 1em 0em 1em;
  color: #1a1208;
  text-align: center;
  font-family: "Playfair Display", Georgia, serif;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

h3::after {
  content: "";
  display: block;
  width: 60px;
  height: 3px;
  background: #8b0000;
  margin: 0.3em auto 0;
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

.events-today .image-wrapper {
  height: 250px;
}

.event-card {
  box-shadow: 4px 4px 0 #1a1208;
  border: 2px solid #1a1208;
  width: 400px;
  height: 340px;
  margin: 2em;
  position: relative;
  background-color: #f4f0e8;
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
  filter: grayscale(100%) sepia(20%);
}
h5 {
  text-align: left;
  margin: 0;
  max-height: 2.8em;
  max-width: 280px;
  overflow: hidden;
  font-family: "Playfair Display", Georgia, serif;
  color: #1a1208;
}

.spinner-wrapper {
  margin-top: 2em;
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

.date {
  position: absolute;
  top: 0;
  background: rgba(244, 240, 232, 0.88);
  color: #8b0000;
  width: 100%;
  padding: 0.5em;
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #1a1208;
  font-family: "EB Garamond", Georgia, serif;
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
  color: #1a1208;
  font-family: "EB Garamond", Georgia, serif;
}

.artist-menu {
  height: 100vh;
  width: 400px;
  position: fixed;
  transition: 0.3s ease;
  background: #f4f0e8;
  border-right: 4px double #1a1208;
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
  border-right: solid 2px #1a1208;
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
  margin-top: 5em;
  background: #f4f0e8;
  border-bottom: 2px solid #1a1208;
  border-top: 2px solid #1a1208;
  padding: 1em 0;
}

.filter h5 {
  color: #1a1208;
  margin-right: 1em;
}

.filter :deep(input) {
  color: #1a1208;
}

.filter :deep(select span) {
  color: #1a1208;
}

.search-date i {
  color: #8b0000;
}

.place-select {
  width: 200px;
}

.last-fetch {
  opacity: 0.5;
  font-family: "EB Garamond", Georgia, serif;
  font-style: italic;
  font-size: 14px;
  color: #1a1208;
}

.logo-wrapper img {
  filter: grayscale(100%) sepia(30%);
}

@media only screen and (min-width: 1200px) {
  .logo-wrapper {
    display: none;
  }
  .title-header {
    margin-bottom: 0;
  }
  .last-fetch {
    display: none;
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

@media only screen and (max-width: 1200px) {
  .title-header {
    line-height: 1em;
    margin: 2em 0.25em 0 0.25em;
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
    margin-top: 2em;
  }

  .no-events {
    width: 100%;
  }

  .wrapper {
    width: 100vw;
  }

  .search-mobile :deep(input) {
    color: #1a1208;
  }

  .search-mobile :deep(select span) {
    color: #1a1208;
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

  h3 {
    margin: 0.5em;
  }

  .filter {
    height: 100%;
    width: 100vw;
    background-color: #f4f0e8;
    justify-content: inherit;
    padding-top: 5em;
    position: fixed;
    top: 0;
    z-index: 2000;
    margin-top: 0;
    flex-direction: column;
    transition: 0.3s ease;
    padding: 5em 2em 2em 2em;
    border: none;
    border-bottom: 4px double #1a1208;
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
    color: #1a1208;
  }

  .filter label {
    width: 100%;
    margin-top: 1em;
  }

  .q-date {
    width: 90vw;
    height: 80vh;
  }
}

@media only screen and (min-width: 900px) {
  .events-today .event-container {
    width: 40%;
  }
}

@media only screen and (min-width: 600px) and (max-width: 1200px) {
  .wrapper {
    padding: 0 2em;
  }
}
</style>
