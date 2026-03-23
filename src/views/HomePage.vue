<template>
  <div class="home-page">
    <header class="page-header">
      <h1 class="page-title">Livemusik i Göteborg</h1>
      <p v-if="!isLoading && lastFetch" class="last-fetch">Senast uppdaterad: {{ lastFetch }}</p>
      <div v-else-if="isLoading" class="skeleton skeleton-last-fetch"></div>
    </header>

    <div class="controls">
      <!-- Desktop filter tabs -->
      <div class="filter-bar-desktop">
        <span class="filter-label">FILTRERA PÅ PLATS:</span>
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
          <option value="">Alla platser</option>
          <option v-for="p in placesOptions" :key="p" :value="p">
            {{ p }}
          </option>
        </select>
      </div>

      <!-- Date range + search row -->
      <div class="filter-row">
        <div class="date-range">
          <div class="date-input-wrapper">
            <label class="date-label">FRÅN</label>
            <input
              type="date"
              v-model="dateFrom"
              class="date-input"
              aria-label="Datum från"
            />
          </div>
          <div class="date-input-wrapper">
            <label class="date-label">TILL</label>
            <input
              type="date"
              v-model="dateTo"
              class="date-input"
              aria-label="Datum till"
            />
          </div>
          <button
            v-if="dateFrom || dateTo"
            class="clear-dates"
            @click="dateFrom = ''; dateTo = ''"
            aria-label="Rensa datum"
          >
            ×
          </button>
        </div>

        <div class="search-bar">
          <input
            type="text"
            v-model="search"
            placeholder="Sök event..."
            class="search-input"
            aria-label="Sök event"
          />
          <button
            v-if="search"
            class="search-clear"
            @click="search = ''"
            aria-label="Rensa sökning"
          >
            ×
          </button>
        </div>

        <!-- Compact mode toggle -->
        <button
          :class="['compact-toggle', compactMode ? 'compact-toggle--on' : '']"
          @click="compactMode = !compactMode"
          :aria-pressed="compactMode"
          title="Kompakt läge"
        >
          <span class="compact-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="0" y="2" width="16" height="2" fill="currentColor" />
              <rect x="0" y="7" width="16" height="2" fill="currentColor" />
              <rect x="0" y="12" width="16" height="2" fill="currentColor" />
            </svg>
          </span>
          <span class="compact-label">Kompakt</span>
        </button>
      </div>
    </div>

    <!-- Skeleton loading state -->
    <div v-if="isLoading" class="events-grid">
      <div v-for="n in 9" :key="n" class="skeleton-card">
        <div class="skeleton skeleton-image"></div>
        <div class="skeleton-body">
          <div class="skeleton skeleton-title"></div>
          <div class="skeleton skeleton-title skeleton-title--short"></div>
          <div class="skeleton skeleton-meta"></div>
          <div class="skeleton skeleton-desc"></div>
        </div>
      </div>
    </div>

    <!-- Events grid -->
    <div
      v-else-if="filteredEvents.length"
      :class="compactMode ? 'events-list' : 'events-grid'"
    >
      <EventCard
        v-for="(event, i) in filteredEvents"
        :key="i"
        :event="event"
        :compact="compactMode"
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
      dateFrom: "",
      dateTo: "",
      placesOptions: [],
      allEvents: [],
      lastFetch: "",
      compactMode: false,
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
      if (this.dateFrom) {
        const from = new Date(this.dateFrom).getTime();
        events = events.filter((e) => e._ts >= from);
      }
      if (this.dateTo) {
        const to = new Date(this.dateTo).getTime();
        events = events.filter((e) => e._ts <= to);
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
          )
          .map((event) => ({
            ...event,
            _ts: new Date(event.date.split("T")[0]).getTime(),
          }));
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
  font-size: clamp(2.5rem, 7vw, 6rem);
  line-height: 1;
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
  padding: 0.5rem 0.75rem;
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  color: #1a1a1a;
  width: 100%;
  appearance: auto;
  margin: 0;
}

/* Date range + search row */
.filter-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.date-range {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.date-input-wrapper {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.date-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #aaa;
  white-space: nowrap;
}

.date-input {
  border: none;
  border-bottom: 1px solid #ccc;
  background: transparent;
  padding: 0.3rem 0;
  font-size: 0.78rem;
  color: #1a1a1a;
  outline: none;
  transition: border-color 0.15s ease;
  cursor: pointer;
}

.date-input:focus {
  border-bottom-color: #1a1a1a;
}

.clear-dates {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #aaa;
  line-height: 1;
  padding: 0;
  transition: color 0.15s ease;
}

.clear-dates:hover {
  color: #cc1100;
}

/* Search */
.search-bar {
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  max-width: 280px;
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
  color: #999;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
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

/* Compact toggle */
.compact-toggle {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: 1px solid #ccc;
  padding: 0.3rem 0.65rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  color: #888;
  transition: border-color 0.15s ease, color 0.15s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.compact-toggle:hover {
  border-color: #1a1a1a;
  color: #1a1a1a;
}

.compact-toggle--on {
  border-color: #cc1100;
  color: #cc1100;
}

.compact-icon {
  display: flex;
  align-items: center;
}

/* Skeleton loading */
@keyframes shimmer {
  0% { background-position: -600px 0; }
  100% { background-position: 600px 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #e8e2d9 25%,
    #f0ece4 50%,
    #e8e2d9 75%
  );
  background-size: 1200px 100%;
  animation: shimmer 1.6s infinite linear;
  border-radius: 2px;
}

.skeleton-last-fetch {
  width: 14rem;
  height: 0.75rem;
  margin-top: 0.4rem;
}

.skeleton-card {
  display: flex;
  flex-direction: column;
}

.skeleton-image {
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 2px;
}

.skeleton-body {
  padding: 0.75rem 0.25rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.skeleton-title {
  height: 1rem;
  width: 90%;
}

.skeleton-title--short {
  width: 55%;
}

.skeleton-meta {
  height: 0.7rem;
  width: 70%;
}

.skeleton-desc {
  height: 0.7rem;
  width: 85%;
}

/* Events grid */
.events-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem 2rem;
}

/* Compact list */
.events-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #e0d9d0;
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

  .filter-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .search-bar {
    max-width: 100%;
    width: 100%;
  }

  .date-range {
    width: 100%;
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

