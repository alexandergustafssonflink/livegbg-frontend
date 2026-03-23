<template>
  <div class="home-page">
    <header class="page-header">
      <h1 class="page-title">THE GIG WALL.</h1>
      <p v-if="lastFetch" class="last-fetch">Senast uppdaterad: {{ lastFetch }}</p>
    </header>

    <div class="controls">
      <!-- Desktop filter tabs -->
      <div class="filter-bar-desktop">
        <span class="filter-label">FILTER BY SCENE:</span>
        <button
          :class="['filter-tab', place === '' ? 'active' : '']"
          @click="place = ''"
        >
          ALL
        </button>
        <button
          v-for="p in placesOptions"
          :key="p"
          :class="['filter-tab', place === p ? 'active' : '']"
          @click="place = p"
        >
          {{ p.toUpperCase() }}
        </button>
      </div>

      <!-- Mobile filter select -->
      <div class="filter-bar-mobile">
        <select v-model="place" class="place-select">
          <option value="">ALLA PLATSER</option>
          <option v-for="p in placesOptions" :key="p" :value="p">
            {{ p }}
          </option>
        </select>
      </div>

      <!-- Search bar -->
      <div class="search-bar">
        <input
          type="text"
          v-model="search"
          placeholder="Sök event..."
          class="search-input"
          aria-label="Sök event"
        />
        <button v-if="search" class="search-clear" @click="search = ''" aria-label="Rensa sökning">
          ×
        </button>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="isLoading" class="loading">
      <div class="loading-spinner"></div>
    </div>

    <!-- Events grid -->
    <div v-else-if="filteredEvents.length" class="events-grid">
      <EventCard
        v-for="(event, i) in filteredEvents"
        :key="i"
        :event="event"
        @show-event-info="showEventBar"
      />
    </div>

    <!-- No events -->
    <div v-else class="no-events">
      <p>Inga event hittades</p>
    </div>

    <!-- Event info sidebar overlay -->
    <div
      v-if="showEventInfo"
      class="sidebar-overlay"
      @click="showEventInfo = false"
    ></div>

    <!-- Event info sidebar -->
    <div class="event-sidebar" :class="showEventInfo ? 'show' : ''">
      <event-info
        v-if="showEventInfo"
        :chosen-event="chosenEvent"
        @close="showEventInfo = false"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventInfo from "@/components/event-info.vue";
import EventCard from "@/components/event-card.vue";

export default {
  name: "HomePage",
  components: {
    EventCard,
    EventInfo,
  },
  data() {
    return {
      isLoading: true,
      showEventInfo: false,
      chosenEvent: null,
      search: "",
      place: "",
      placesOptions: [],
      allEvents: [],
      lastFetch: "",
    };
  },
  computed: {
    filteredEvents() {
      let events = [...this.allEvents];
      if (this.place) {
        events = events.filter((e) => e.place === this.place);
      }
      if (this.search) {
        const q = this.search.toLowerCase();
        events = events.filter((e) => e.title.toLowerCase().includes(q));
      }
      events.sort((a, b) => new Date(a.date) - new Date(b.date));
      return events;
    },
  },
  methods: {
    async getEvents() {
      this.isLoading = true;
      try {
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
        this.placesOptions = [
          ...new Set(this.allEvents.map((e) => e.place).filter(Boolean)),
        ];
        this.lastFetch =
          data[0].date.split("T")[0] +
          " " +
          data[0].date.split("T")[1].split(".")[0];
      } catch (err) {
        console.error("Failed to fetch events:", err.message || err);
      } finally {
        this.isLoading = false;
      }
    },
    showEventBar(event) {
      this.chosenEvent = event;
      this.showEventInfo = true;
    },
  },
  async created() {
    await this.getEvents();
  },
};
</script>

<style scoped>
.home-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem 5rem;
}

/* Header */
.page-header {
  margin-bottom: 2.5rem;
}

.page-title {
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: clamp(3.5rem, 11vw, 9rem);
  line-height: 0.93;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.last-fetch {
  font-size: 0.7rem;
  color: #aaa;
  letter-spacing: 0.05em;
}

/* Controls */
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  border-top: 1px solid #e0d9d0;
  padding-top: 1.25rem;
}

/* Desktop filter tabs */
.filter-bar-desktop {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0;
}

.filter-label {
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #aaa;
  margin-right: 1rem;
  white-space: nowrap;
}

.filter-tab {
  background: none;
  border: none;
  padding: 0.2rem 0;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  color: #777;
  transition: color 0.15s ease;
  margin-right: 1.25rem;
  border-bottom: 2px solid transparent;
  line-height: 1.6;
}

.filter-tab:hover {
  color: #cc1100;
}

.filter-tab.active {
  color: #cc1100;
  border-bottom-color: #cc1100;
}

/* Mobile filter */
.filter-bar-mobile {
  display: none;
}

.place-select {
  background: transparent;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  color: #1a1a1a;
  width: 100%;
  appearance: auto;
}

/* Search */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 320px;
}

.search-input {
  width: 100%;
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  padding: 0.4rem 2rem 0.4rem 0;
  font-size: 0.8rem;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.15s ease;
  letter-spacing: 0.03em;
}

.search-input::placeholder {
  color: #bbb;
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.search-input:focus {
  border-bottom-color: #1a1a1a;
}

.search-clear {
  position: absolute;
  right: 0;
  background: none;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  color: #aaa;
  line-height: 1;
  padding: 0;
  transition: color 0.15s ease;
}

.search-clear:hover {
  color: #cc1100;
}

/* Loading */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0d9d0;
  border-top-color: #cc1100;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Events grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 2rem;
}

/* No events */
.no-events {
  text-align: center;
  padding: 5rem 2rem;
  color: #aaa;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

/* Sidebar overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  z-index: 999;
}

/* Event info sidebar */
.event-sidebar {
  position: fixed;
  left: -480px;
  top: 0;
  width: 440px;
  height: 100vh;
  z-index: 1000;
  transition: left 0.3s ease;
  overflow-y: auto;
}

.event-sidebar.show {
  left: 0;
}

/* Responsive */
@media (max-width: 1100px) {
  .events-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 700px) {
  .home-page {
    padding: 2rem 1rem 4rem;
  }

  .events-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .filter-bar-desktop {
    display: none;
  }

  .filter-bar-mobile {
    display: block;
  }

  .search-bar {
    max-width: 100%;
  }

  .event-sidebar {
    width: 100%;
    left: -100%;
  }

  .event-sidebar.show {
    left: 0;
  }
}
</style>

