<template>
  <div class="search-bar">
    <div class="search-container">
      <i class="fas fa-search search-icon"></i>
      <input
          ref="searchInput"
          v-model="searchQuery"
          type="text"
          class="search-input"
          :placeholder="placeholder"
          @input="handleInput"
          @focus="isFocused = true"
          @blur="handleBlur"
          @keydown.enter="handleSearch"
      />
      <button
          v-if="searchQuery"
          @click="clearSearch"
          class="clear-btn"
          type="button"
      >
        <i class="fas fa-times"></i>
      </button>
      <button
          @click="handleSearch"
          class="search-btn"
          type="button"
      >
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- Search Suggestions -->
    <div
        v-if="showSuggestions && suggestions.length > 0 && isFocused"
        class="suggestions-dropdown"
    >
      <div
          v-for="suggestion in suggestions"
          :key="suggestion.id"
          class="suggestion-item"
          @mousedown="selectSuggestion(suggestion)"
      >
        <div class="suggestion-icon">
          <i :class="suggestion.icon"></i>
        </div>
        <div class="suggestion-content">
          <div class="suggestion-title">{{ suggestion.title }}</div>
          <div class="suggestion-meta">{{ suggestion.meta }}</div>
        </div>
        <div class="suggestion-type">{{ suggestion.type }}</div>
      </div>
    </div>

    <!-- Recent Searches -->
    <div
        v-if="showRecentSearches && recentSearches.length > 0 && isFocused && !searchQuery"
        class="recent-searches"
    >
      <div class="recent-header">
        <span>Recente zoekopdrachten</span>
        <button @click="clearRecentSearches" class="clear-recent-btn">
          Wissen
        </button>
      </div>
      <div
          v-for="search in recentSearches"
          :key="search.id"
          class="recent-item"
          @mousedown="selectRecentSearch(search)"
      >
        <i class="fas fa-clock recent-icon"></i>
        <span class="recent-query">{{ search.query }}</span>
        <button
            @click.stop="removeRecentSearch(search.id)"
            class="remove-recent-btn"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  props: {
    placeholder: {
      type: String,
      default: 'Zoek evenementen...'
    },
    showSuggestions: {
      type: Boolean,
      default: true
    },
    showRecentSearches: {
      type: Boolean,
      default: true
    },
    debounceTime: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      searchQuery: '',
      isFocused: false,
      suggestions: [],
      recentSearches: [],
      debounceTimer: null
    }
  },
  computed: {
    hasSuggestions() {
      return this.suggestions.length > 0 && this.isFocused
    }
  },
  mounted() {
    this.loadRecentSearches()
    // Add click outside listener
    document.addEventListener('click', this.handleClickOutside)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.handleClickOutside)
  },
  methods: {
    handleInput() {
      // Clear previous timer
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }

      // Set new timer for debouncing
      this.debounceTimer = setTimeout(() => {
        if (this.searchQuery.trim()) {
          this.fetchSuggestions()
          this.saveToRecentSearches(this.searchQuery)
        } else {
          this.suggestions = []
        }
      }, this.debounceTime)
    },

    handleBlur() {
      // Delay hiding suggestions to allow for click events
      setTimeout(() => {
        this.isFocused = false
      }, 150)
    },

    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$emit('search', this.searchQuery.trim())
        this.saveToRecentSearches(this.searchQuery.trim())
        this.isFocused = false
      }
    },

    clearSearch() {
      this.searchQuery = ''
      this.suggestions = []
      this.$emit('search', '')
      this.$refs.searchInput.focus()
    },

    fetchSuggestions() {
      // Simulate API call for suggestions
      // In a real app, this would be an API call to your backend
      const query = this.searchQuery.toLowerCase()

      if (query.length < 2) {
        this.suggestions = []
        return
      }

      // Mock suggestions data
      this.suggestions = [
        {
          id: 1,
          title: 'Tech Conference 2024',
          meta: 'Amsterdam, 15 Nov 2024',
          type: 'Evenement',
          icon: 'fas fa-calendar'
        },
        {
          id: 2,
          title: 'Jazz Festival',
          meta: 'Rotterdam, Diverse data',
          type: 'Evenement',
          icon: 'fas fa-music'
        },
        {
          id: 3,
          title: 'Marathon Rotterdam',
          meta: 'Rotterdam, 13 Apr 2024',
          type: 'Sport',
          icon: 'fas fa-running'
        },
        {
          id: 4,
          title: 'Food & Drink Festival',
          meta: 'Utrecht, 20-22 Mei 2024',
          type: 'Food',
          icon: 'fas fa-utensils'
        }
      ].filter(item =>
          item.title.toLowerCase().includes(query) ||
          item.meta.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      ).slice(0, 5) // Limit to 5 suggestions
    },

    selectSuggestion(suggestion) {
      this.searchQuery = suggestion.title
      this.$emit('search', suggestion.title)
      this.isFocused = false
      this.suggestions = []
    },

    loadRecentSearches() {
      const saved = localStorage.getItem('recentSearches')
      if (saved) {
        this.recentSearches = JSON.parse(saved)
      }
    },

    saveToRecentSearches(query) {
      if (!query.trim()) return

      const existingIndex = this.recentSearches.findIndex(
          search => search.query.toLowerCase() === query.toLowerCase()
      )

      // Remove if already exists
      if (existingIndex !== -1) {
        this.recentSearches.splice(existingIndex, 1)
      }

      // Add to beginning
      this.recentSearches.unshift({
        id: Date.now(),
        query: query,
        timestamp: new Date().toISOString()
      })

      // Keep only last 5 searches
      this.recentSearches = this.recentSearches.slice(0, 5)

      // Save to localStorage
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches))
    },

    selectRecentSearch(search) {
      this.searchQuery = search.query
      this.$emit('search', search.query)
      this.isFocused = false
    },

    removeRecentSearch(id) {
      this.recentSearches = this.recentSearches.filter(search => search.id !== id)
      localStorage.setItem('recentSearches', JSON.stringify(this.recentSearches))
    },

    clearRecentSearches() {
      this.recentSearches = []
      localStorage.removeItem('recentSearches')
    },

    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isFocused = false
      }
    },

    focus() {
      this.$refs.searchInput.focus()
    },

    blur() {
      this.$refs.searchInput.blur()
    }
  }
}
</script>

<style scoped>
.search-bar {
  position: relative;
  width: 100%;
}

/* Container */
.search-container {
  position: relative;
  display: flex;
  align-items: center;
  background: #1E1B4B;
  border: 2px solid #6366F1;
  border-radius: 14px;
  transition: all 0.3s ease;
}

.search-container:focus-within {
  border-color: #818CF8;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.3);
}

/* Icon */
.search-icon {
  position: absolute;
  left: 1rem;
  color: #A5B4FC;
  z-index: 1;
}

/* Input */
.search-input {
  flex: 1;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: none;
  background: transparent;
  font-size: 1rem;
  outline: none;
  color: #F8FAFC;
}

.search-input::placeholder {
  color: #A5B4FC;
}

/* Clear button */
.clear-btn {
  background: none;
  border: none;
  padding: 0.5rem;
  color: #A5B4FC;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.clear-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  color: #FFFFFF;
}

/* Search button */
.search-btn {
  background: linear-gradient(90deg, #3B82F6, #9333EA);
  border: none;
  padding: 0.75rem 1rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0 12px 12px 0;
  transition: all 0.3s ease;
}

.search-btn:hover {
  background: linear-gradient(90deg, #6366F1, #A855F7);
  transform: scale(1.05);
}

/* Dropdowns */
.suggestions-dropdown,
.recent-searches {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #312E81;
  border: 1px solid #4F46E5;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(79, 70, 229, 0.3);
  margin-top: 0.5rem;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
}

/* Suggestion item */
.suggestion-item,
.recent-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
  border-bottom: 1px solid rgba(99, 102, 241, 0.25);
}

.suggestion-item:hover,
.recent-item:hover {
  background: rgba(99, 102, 241, 0.2);
}

.suggestion-title,
.recent-query {
  color: #F8FAFC;
  font-weight: 500;
}

.suggestion-meta {
  font-size: 0.85rem;
  color: #CBD5E1;
}

/* Header recent */
.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid rgba(99, 102, 241, 0.4);
  background: #1E1B4B;
  color: #A5B4FC;
  font-weight: 600;
}

.clear-recent-btn {
  background: none;
  border: none;
  color: #818CF8;
  font-size: 0.85rem;
  cursor: pointer;
  text-decoration: underline;
}

.clear-recent-btn:hover {
  color: #FACC15;
}

/* Icons */
.recent-icon,
.suggestion-icon {
  color: #A5B4FC;
}

.remove-recent-btn {
  background: none;
  border: none;
  color: #A5B4FC;
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease;
}

.recent-item:hover .remove-recent-btn {
  opacity: 1;
}

.remove-recent-btn:hover {
  color: #F87171;
}

/* Responsive */
@media (max-width: 768px) {
  .search-container {
    border-radius: 25px;
  }

  .search-btn {
    border-radius: 0 25px 25px 0;
  }

  .suggestions-dropdown,
  .recent-searches {
    position: fixed;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    top: auto;
    max-height: 50vh;
  }
}
</style>
