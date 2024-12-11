<template>
  <div id="app">
    <router-view />
    <audio-play />
  </div>
</template>

<script>
import AudioPlay from '@/components/audio'
export default {
  name: 'App',
  components: {
    AudioPlay
  },
}
</script>
