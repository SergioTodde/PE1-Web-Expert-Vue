<template>
  <div class="file-upload">
    <div
        class="upload-area"
        :class="{
        'has-file': file,
        'is-dragging': isDragging,
        'has-error': error
      }"
        @click="triggerFileInput"
        @drop="handleDrop"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
    >
      <input
          ref="fileInput"
          type="file"
          :accept="accept"
          @change="handleFileSelect"
          class="file-input"
      >

      <div v-if="!file" class="upload-placeholder">
        <i class="fas fa-cloud-upload-alt"></i>
        <p class="upload-text">Klik om te uploaden of sleep een bestand</p>
        <p class="upload-hint">{{ acceptHint }}</p>
        <p class="upload-size">Max. {{ maxSize }}MB</p>
      </div>

      <div v-else class="file-preview">
        <div class="file-info">
          <i :class="fileIcon"></i>
          <div class="file-details">
            <p class="file-name">{{ file.name }}</p>
            <p class="file-size">{{ formattedFileSize }}</p>
          </div>
        </div>
        <div class="file-actions">
          <button @click.stop="removeFile" class="btn-remove" type="button">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
    </div>

    <div v-if="error" class="error-message">
      <i class="fas fa-exclamation-circle"></i>
      {{ error }}
    </div>

    <div v-if="file && !error" class="upload-progress">
      <div class="progress-bar">
        <div
            class="progress-fill"
            :style="{ width: progress + '%' }"
        ></div>
      </div>
      <span class="progress-text">{{ progress }}%</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    file: {
      type: File,
      default: null
    },
    accept: {
      type: String,
      default: '*/*'
    },
    maxSize: {
      type: Number,
      default: 5 // MB
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isDragging: false,
      progress: 0,
      error: null
    }
  },
  computed: {
    acceptHint() {
      const types = {
        'image/*': 'Afbeeldingen (PNG, JPG, GIF)',
        '.pdf,.doc,.docx': 'Documenten (PDF, Word)',
        '.zip,.rar': 'Archieven (ZIP, RAR)',
        '*/*': 'Alle bestanden'
      }
      return types[this.accept] || `Bestandstypes: ${this.accept}`
    },

    formattedFileSize() {
      if (!this.file) return ''
      const bytes = this.file.size
      if (bytes === 0) return '0 Bytes'

      const k = 1024
      const sizes = ['Bytes', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))

      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    },

    fileIcon() {
      if (!this.file) return 'fas fa-file'

      const type = this.file.type
      if (type.startsWith('image/')) return 'fas fa-file-image'
      if (type.includes('pdf')) return 'fas fa-file-pdf'
      if (type.includes('word') || type.includes('document')) return 'fas fa-file-word'
      if (type.includes('zip') || type.includes('archive')) return 'fas fa-file-archive'
      if (type.includes('text')) return 'fas fa-file-alt'

      return 'fas fa-file'
    }
  },
  methods: {
    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileSelect(event) {
      const files = event.target.files
      if (files.length > 0) {
        this.validateAndEmitFile(files[0])
      }
    },

    handleDrop(event) {
      event.preventDefault()
      this.isDragging = false

      const files = event.dataTransfer.files
      if (files.length > 0) {
        this.validateAndEmitFile(files[0])
      }
    },

    handleDragOver(event) {
      event.preventDefault()
      this.isDragging = true
    },

    handleDragLeave(event) {
      event.preventDefault()
      this.isDragging = false
    },

    validateAndEmitFile(file) {
      this.error = null

      // Check file type
      if (this.accept !== '*/*' && !this.isFileTypeValid(file)) {
        this.error = `Bestandstype niet ondersteund. Toegestaan: ${this.acceptHint}`
        return
      }

      // Check file size
      const maxSizeBytes = this.maxSize * 1024 * 1024
      if (file.size > maxSizeBytes) {
        this.error = `Bestand is te groot. Maximaal: ${this.maxSize}MB`
        return
      }

      // Simulate upload progress
      this.simulateUpload()

      // Emit file to parent
      this.$emit('file-selected', file)
    },

    isFileTypeValid(file) {
      if (this.accept === '*/*') return true

      const acceptedTypes = this.accept.split(',').map(type => type.trim())
      return acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          // File extension check
          return file.name.toLowerCase().endsWith(type.toLowerCase())
        } else {
          // MIME type check
          return file.type.match(type.replace('*', '.*'))
        }
      })
    },

    simulateUpload() {
      this.progress = 0
      const interval = setInterval(() => {
        this.progress += Math.random() * 10
        if (this.progress >= 100) {
          this.progress = 100
          clearInterval(interval)
          this.$emit('upload-complete', this.file)
        }
      }, 200)
    },

    removeFile() {
      this.$refs.fileInput.value = ''
      this.progress = 0
      this.error = null
      this.$emit('file-removed')
    }
  }
}
</script>

<style scoped>
.file-upload {
  width: 100%;
}

.upload-area {
  border: 2px dashed #e2e8f0;
  border-radius: 8px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #f8fafc;
}

.upload-area:hover {
  border-color: #007bff;
  background: #f0f7ff;
}

.upload-area.is-dragging {
  border-color: #007bff;
  background: #e6f7ff;
  transform: scale(1.02);
}

.upload-area.has-file {
  border-style: solid;
  border-color: #28a745;
  background: #f0fff4;
}

.upload-area.has-error {
  border-color: #dc3545;
  background: #fff5f5;
}

.file-input {
  display: none;
}

.upload-placeholder i {
  font-size: 3rem;
  color: #007bff;
  margin-bottom: 1rem;
}

.upload-text {
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.5rem 0;
}

.upload-hint {
  color: #718096;
  margin: 0 0 0.25rem 0;
  font-size: 0.9rem;
}

.upload-size {
  color: #a0aec0;
  margin: 0;
  font-size: 0.8rem;
}

.file-preview {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.file-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
}

.file-info i {
  font-size: 2rem;
  color: #007bff;
}

.file-details {
  text-align: left;
}

.file-name {
  font-weight: 600;
  color: #2d3748;
  margin: 0 0 0.25rem 0;
  word-break: break-all;
}

.file-size {
  color: #718096;
  margin: 0;
  font-size: 0.8rem;
}

.file-actions {
  flex-shrink: 0;
}

.btn-remove {
  background: #dc3545;
  color: white;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-remove:hover {
  background: #c82333;
  transform: scale(1.1);
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

.upload-progress {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.progress-bar {
  flex: 1;
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #28a745;
  transition: width 0.3s ease;
}

.progress-text {
  font-size: 0.8rem;
  color: #718096;
  min-width: 40px;
}

@media (max-width: 768px) {
  .upload-area {
    padding: 1.5rem;
  }

  .file-preview {
    flex-direction: column;
    gap: 0.75rem;
  }

  .file-info {
    width: 100%;
  }
}
</style>