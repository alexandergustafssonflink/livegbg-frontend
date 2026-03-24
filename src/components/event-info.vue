<template>
  <div class="event-info-panel">
    <button class="close-btn" @click="$emit('close')" aria-label="Stäng">×</button>

    <div v-if="chosenEvent" class="panel-content">
      <div class="panel-image-wrapper">
        <img :src="chosenEvent.imageUrl" :alt="chosenEvent.title" class="panel-image" />
      </div>

      <h2 class="panel-title">{{ chosenEvent.title }}</h2>

      <div class="panel-meta">
        <div class="meta-row">
          <span class="meta-label">DATUM</span>
          <span class="meta-value">{{ chosenEvent.date.split("T")[0] }}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">PLATS</span>
          <span class="meta-value">{{ chosenEvent.place }}</span>
        </div>
        <div v-if="chosenEvent.eventPrice" class="meta-row">
          <span class="meta-label">INTRÄDE</span>
          <span class="meta-value">{{ chosenEvent.eventPrice }}</span>
        </div>
      </div>

      <p v-if="chosenEvent.eventInfo" class="panel-description">
        {{ chosenEvent.eventInfo }}
      </p>

      <a
        v-if="chosenEvent.ticketLink"
        :href="normalizedTicketLink"
        target="_blank"
        rel="noopener noreferrer"
        class="ticket-btn"
      >
        Köp biljett
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventInfo",
  emits: ["close"],
  props: ["chosenEvent"],
  computed: {
    normalizedTicketLink() {
      if (this.chosenEvent && this.chosenEvent.ticketLink) {
        const link = this.chosenEvent.ticketLink;
        if (link.startsWith("http://") || link.startsWith("https://")) {
          return link;
        }
        return "https://" + link;
      }
      return "";
    },
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.event-info-panel {
  background: var(--color-bg);
  border-right: 1px solid var(--color-border);
  height: 100%;
  width: 100%;
  padding: 2rem;
  overflow-y: auto;
  position: relative;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.75rem;
  cursor: pointer;
  color: var(--color-text-muted);
  line-height: 1;
  padding: 0.25rem 0.5rem;
  transition: color 0.15s ease;
}

.close-btn:hover {
  color: var(--color-accent);
}

.panel-content {
  margin-top: 2rem;
}

.panel-image-wrapper {
  width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.panel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(100%);
  display: block;
}

.panel-title {
  font-family: "Playfair Display", serif;
  font-weight: 900;
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  line-height: 1.15;
  color: var(--color-text);
  margin-bottom: 1rem;
}

.panel-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: 0.75rem 0;
}

.meta-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.meta-label {
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-text-faint);
  white-space: nowrap;
}

.meta-value {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-meta-value);
  text-align: right;
}

.panel-description {
  font-size: 0.875rem;
  line-height: 1.65;
  color: var(--color-text-secondary);
  margin-bottom: 1.5rem;
}

.ticket-btn {
  display: inline-block;
  background: var(--color-accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.65rem 1.5rem;
  text-decoration: none;
  transition: background 0.15s ease;
}

.ticket-btn:hover {
  background: #aa0e00;
}
</style>

