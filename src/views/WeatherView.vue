<template>
  <div class="container">
    <div class="header">
      <h1>WEATHER APP</h1>

      <form class="search-bar" @submit.prevent="searchByCity">
        <input
          type="text"
          v-model="city"
          placeholder="Enter city name"
          class="search-input"
          aria-label="City name"
        />
        <button type="submit" class="search-button">Search</button>
      </form>
    </div>

    
    <div v-if="loading">Getting your location and weather...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <main v-else>
  <div v-if="weatherData" class="weather-card">
    <h2 class="city">
      {{ weatherData.name }}, {{ weatherData.sys.country }}
    </h2>

    <div class="center-row">
      <div class="icon-wrap" v-if="iconUrl">
        <img :src="iconUrl" :alt="weatherData.weather[0].description" />
      </div>
      <p class="temp" v-if="temperature !== null">{{ temperature }} °C</p>
    </div>

    <span class="desc">{{ weatherData.weather[0].description }}</span>
  </div>

  <div v-else class="empty">No data yet. Try allowing location or search a city.</div>
</main>
  </div>
</template>

<script>
import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY || "PUT_YOUR_KEY_HERE";
const API_BASE = "https://api.openweathermap.org/data/2.5/weather";

export default {
  name: "App",
  data() {
    return {
      city: "",
      weatherData: null,
      hourlyForecast: [],
      dailyForecast: [],
      loading: true,
      error: "",
    };
  },
  computed: {
    
    temperature() {
      return this.weatherData ? Math.round(this.weatherData.main.temp) : null;
    },
    
    iconUrl() {
      return this.weatherData
        ? `https://openweathermap.org/img/wn/${this.weatherData.weather[0].icon}@2x.png`
        : "";
    },
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    
    // search weather of city that user enter
    async searchByCity() {
      if (!this.city) return;
      this.loading = true;
      this.error = "";
      const url = `${API_BASE}?q=${encodeURIComponent(
        this.city
      )}&appid=${API_KEY}&units=metric`;
      await this.fetchWeatherData(url);
      this.loading = false;
    },

    // current location and weather
    async fetchCurrentLocationWeather() {
      if (!navigator.geolocation) {
        this.error = "Geolocation is not supported by your browser.";
        this.loading = false;
        return;
      }
      this.loading = true;
      this.error = "";
      navigator.geolocation.getCurrentPosition(
        async ({ coords }) => {
          try {
            const url = `${API_BASE}?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}&units=metric`;
            await this.fetchWeatherData(url);
          } catch (e) {
            this.error = "Failed to get weather for your location.";
          } finally {
            this.loading = false;
          }
        },
        (geoErr) => {
          this.error =
            geoErr.code === geoErr.PERMISSION_DENIED
              ? "Location permission denied. Please allow access to show local weather."
              : "Unable to retrieve your location.";
          this.loading = false;
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    },

    // Shared request API function
    async fetchWeatherData(url) {
      try {
        const { data } = await axios.get(url);
        this.weatherData = data;
        this.error = "";
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.message ||
          "Error fetching weather data.";
        this.error = `API error: ${msg}`;
        this.weatherData = null;
      }
    },
  },
};
</script>

<style>
/* --- COLOR VARIABLES --- */
:root {
  --bg: #fff7e6;         /* Soft yellow page background */
  --text: #1f2937;       /* Dark gray text for readability */
  --muted: #6b7280;      /* Muted gray for secondary info */
  --card: #fffaf0;       /* Slightly lighter cream card background */
  --shadow: 0 10px 25px rgba(0,0,0,0.06); /* Gentle drop shadow */
}

/* --- PAGE LAYOUT --- */
.container {
  /* Full-page centered layout using CSS Grid */
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  display: grid;
  grid-template-rows: auto 1fr;
  align-items: start;
  justify-items: center;
  padding: 3rem 1rem 4rem;
}

/* --- HEADER AREA --- */
.header {
  /* Centers the app title and search bar horizontally */
  width: min(900px, 100%);
  text-align: center;
  margin-bottom: 1.5rem;
}

/* --- SEARCH BAR --- */
.search-bar {
  /* Aligns the input and button on one line with spacing */
  display: inline-flex;
  gap: .6rem;
  margin-top: 1rem;
}

.search-input {
  /* Styled input box with shadow and focus border color */
  width: min(420px, 75vw);
  padding: .7rem 1rem;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  background: #fff;
  color: var(--text);
  font-size: 1rem;
  outline: none;
  box-shadow: var(--shadow);
}
.search-input:focus {
  border-color: #f59e0b; /* Orange accent on focus */
}

.search-button {
  /* Rounded button with warm orange color and subtle lift effect */
  padding: .7rem 1rem;
  border-radius: 12px;
  border: none;
  background: #f59e0b;
  color: #111827;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow);
}
.search-button:hover {
  transform: translateY(-1px);
}

/* --- MAIN CONTENT AREA --- */
main {
  /* Centers the weather card inside the viewport */
  width: 100%;
  display: grid;
  place-items: center;
}

/* --- WEATHER CARD --- */
.weather-card {
  /* Rounded card containing city, icon, temp, and description */
  width: min(900px, 92vw);
  background: var(--card);
  border: 1px solid #fde68a;
  border-radius: 20px;
  padding: 2rem 1.5rem 2.25rem;
  box-shadow: var(--shadow);
  text-align: center;
}

/* City name styling */
.city {
  font-size: clamp(1.6rem, 3.5vw, 2.8rem);
  line-height: 1.1;
  margin: 0 0 1.2rem;
}

/* --- ICON AND TEMPERATURE ALIGNMENT --- */
.center-row {
  /* Places icon and temperature side by side */
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  justify-content: center;
  gap: clamp(1rem, 6vw, 4rem);
  margin: 1rem 0 1.25rem;
}

/* --- WEATHER ICON WRAPPER --- */
.icon-wrap {
  /* Creates a circular background and shadow for the icon */
  width: clamp(96px, 18vw, 140px);
  height: clamp(96px, 18vw, 140px);
  background: #fff;
  border-radius: 24px;
  display: grid;
  place-items: center;
  box-shadow: var(--shadow);
  border: 1px solid #fef3c7;
}
.icon-wrap img {
  /* Makes the weather icon responsive and centered */
  width: 80%;
  height: 80%;
  object-fit: contain;
}

/* --- TEMPERATURE DISPLAY --- */
.temp {
  /* Bold and large temperature display */
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 800;
}

/* --- WEATHER DESCRIPTION --- */
.desc {
  /* Automatically capitalizes the first letter of each word */
  text-transform: capitalize;
  color: var(--muted);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
}

/* --- ERROR AND EMPTY STATES --- */
.error, .empty {
  /* Centered feedback messages */
  margin-top: 1rem;
}
.error {
  color: #b00020;
  font-weight: 600;
}

/* --- RESPONSIVE DESIGN --- */
@media (max-width: 480px) {
  /* Adjusts spacing and sizing for small screens */
  .search-bar {
    width: 100%;
    justify-content: center;
  }
  .search-input {
    width: 70vw;
  }
}
</style>
