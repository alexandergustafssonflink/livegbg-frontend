<template>
  <!-- Compact (list) mode -->
  <div v-if="compact" class="event-row" @click="handleCardClick">
    <span class="row-meta">{{ formattedDate }}</span>
    <span class="row-title">{{ event.title }}</span>
    <span class="row-place">{{ event.place }}</span>
  </div>

  <!-- Normal card mode -->
  <div v-else class="event-card" @click="handleCardClick">
    <div class="card-image-wrapper">
      <img
        v-if="event.place === 'Valand'"
        loading="lazy"
        :src="`https://livegbg-test.herokuapp.com/api/proxy?url=${event.imageUrl}`"
        :alt="event.title"
        class="card-image"
      />
      <img
        v-else
        loading="lazy"
        :src="event.imageUrl"
        :alt="event.title"
        class="card-image"
      />
    </div>
    <div class="card-body">
      <h3 class="event-title">{{ event.title }}</h3>
      <p class="event-meta">{{ formattedDate }} / {{ event.place.toUpperCase() }}</p>
      <p v-if="event.eventInfo" class="event-description">{{ event.eventInfo }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventCard",
  emits: ["showEventInfo"],
  props: {
    event: {
      type: Object,
      required: true,
    },
    compact: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedDate() {
      if (!this.event.date) return "";
      const months = [
        "JAN", "FEB", "MAR", "APR", "MAJ", "JUN",
        "JUL", "AUG", "SEP", "OKT", "NOV", "DEC",
      ];
      const datePart = this.event.date.split("T")[0];
      const timePart = this.event.date.includes("T")
        ? this.event.date.split("T")[1].substring(0, 5)
        : "";
      const [, month, day] = datePart.split("-");
      const monthName = months[parseInt(month) - 1];
      const dayNum = parseInt(day);
      return timePart && timePart !== "00:00"
        ? `${monthName} ${dayNum} / ${timePart}`
        : `${monthName} ${dayNum}`;
    },
  },
  methods: {
    handleCardClick() {
      if (this.event.link && this.event.link.trim() !== "") {
        this.$gtag.event("click", {
          event_category: this.event.place,
          event_label: this.event.title,
          value: this.event.link,
        });
        window.location = this.event.link;
      } else {
        this.$emit("showEventInfo", this.event);
      }
    },
  },
};
</script>

<style scoped>
/* ── Normal card ── */
.event-card {
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  will-change: transform;
}

.event-card:hover {
  transform: rotate(2deg) translateY(-8px);
  box-shadow: 6px 14px 28px rgba(0, 0, 0, 0.13);
}

.event-card:hover .event-title {
  color: #cc1100;
}

.card-image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background-color: #d0c9c0;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  display: block;
}

.card-body {
  padding: 0.75rem 0.25rem 0;
}

.event-title {
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.2;
  color: #1a1a1a;
  margin-bottom: 0.35rem;
  transition: color 0.2s ease;
}

.event-meta {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 0.35rem;
}

.event-description {
  font-size: 0.8rem;
  color: #777;
  font-style: italic;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* ── Compact row ── */
.event-row {
  display: grid;
  grid-template-columns: 7rem 1fr 8rem;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.25rem;
  border-bottom: 1px solid #e0d9d0;
  cursor: pointer;
  transition: background 0.15s ease;
}

.event-row:hover {
  background: rgba(204, 17, 0, 0.04);
}

.event-row:hover .row-title {
  color: #cc1100;
}

.row-meta {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #888;
  white-space: nowrap;
}

.row-title {
  font-family: "Playfair Display", serif;
  font-weight: 700;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: #1a1a1a;
  transition: color 0.15s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-place {
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #aaa;
  text-align: right;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 500px) {
  .event-row {
    grid-template-columns: 5.5rem 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      "meta title"
      "meta place";
    gap: 0 0.75rem;
  }

  .row-meta {
    grid-area: meta;
    align-self: start;
    padding-top: 0.15rem;
  }

  .row-title {
    grid-area: title;
    white-space: normal;
  }

  .row-place {
    grid-area: place;
    text-align: left;
    margin-top: 0.15rem;
    font-size: 0.65rem;
    color: #aaa;
  }
}
</style>


