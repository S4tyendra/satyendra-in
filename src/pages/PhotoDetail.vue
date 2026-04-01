<script setup>
import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { photos } from '../data/photos.js'
import { ArrowLeft, Download, Calendar, MapPin } from 'lucide-vue-next'

const props = defineProps(['id'])
const route = useRoute()

const photo = computed(() => {
    return photos.find(p => p.id === props.id)
})

useHead({
    title: computed(() => photo.value ? `${photo.value.title} | Photography` : 'Photo Not Found'),
    meta: [
        { name: 'description', content: computed(() => photo.value?.description || 'Photography details') },
        { property: 'og:image', content: computed(() => photo.value?.url) },
    ]
})

const downloadImage = async () => {
    if (!photo.value) return

    try {
        const response = await fetch(photo.value.url)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${photo.value.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
    } catch (e) {
        console.error('Download failed', e)
        // Fallback to opening in new tab if fetch fails (e.g. CORS)
        window.open(photo.value.downloadUrl || photo.value.url, '_blank')
    }
}
</script>

<template>
    <div class="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div v-if="photo" class="w-full mx-auto">
            <!-- Back Button -->
            <router-link to="/photography"
                class="inline-flex items-center text-text-main/60 hover:text-text-main mb-8 transition-colors">
                <ArrowLeft class="w-5 h-5 mr-2" />
                Back to Gallery
            </router-link>

            <div class="grid grid-cols-1 @3xl:grid-cols-3 gap-12">
                <!-- Image Section -->
                <div class="@3xl:col-span-2 group">
                    <div
                        class="relative rounded-xl overflow-hidden shadow-2xl bg-surface-lighter/5 ring-1 ring-white/10">
                        <img :src="photo.url" :alt="photo.title" class="w-full h-auto object-contain max-h-[80vh]"
                            v-bind="$attrs" />
                        <div class="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl pointer-events-none">
                        </div>
                    </div>
                </div>

                <!-- Details Section -->
                <div class="@3xl:col-span-1 space-y-8">
                    <div>
                        <h1 class="text-4xl font-bold text-text-main mb-4">{{ photo.title }}</h1>
                        <p class="text-xl text-text-main/80 leading-relaxed">{{ photo.description }}</p>
                    </div>

                    <div class="flex flex-wrap gap-4 text-sm text-text-main/60">
                        <div class="flex items-center bg-surface-lighter/10 px-3 py-1.5 rounded-full">
                            <Calendar class="w-4 h-4 mr-2" />
                            {{ photo.date }}
                        </div>
                        <div class="flex items-center bg-surface-lighter/10 px-3 py-1.5 rounded-full">
                            <MapPin class="w-4 h-4 mr-2" />
                            {{ photo.location }}
                        </div>
                    </div>

                    <div class="bg-surface-lighter/5 rounded-xl p-6 border border-white/5">
                        <h2 class="text-lg font-semibold text-text-main mb-3">The Story</h2>
                        <p class="text-text-main/70 italic leading-relaxed">
                            "{{ photo.story }}"
                        </p>
                    </div>

                    <button @click="downloadImage"
                        class="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                        <Download class="w-5 h-5 mr-2" />
                        Download Full Resolution
                    </button>
                </div>
            </div>
        </div>

        <!-- Not Found State -->
        <div v-else class="min-h-[50vh] flex flex-col items-center justify-center text-center">
            <h1 class="text-3xl font-bold text-text-main mb-4">Photo Not Found</h1>
            <p class="text-text-main/60 mb-8">The photo you are looking for does not exist or has been removed.</p>
            <router-link to="/photography"
                class="inline-flex items-center px-6 py-3 bg-surface-lighter/10 hover:bg-surface-lighter/20 text-text-main rounded-lg transition-colors">
                <ArrowLeft class="w-5 h-5 mr-2" />
                Return to Gallery
            </router-link>
        </div>
    </div>
</template>
