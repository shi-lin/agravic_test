<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-for="artwork in artworks" :key="artwork.id" class="flex-grow-0">
        <ArtworkListItem :artwork="artwork" />
      </v-col>
      <v-spacer />
    </v-row>
  </v-container>
</template>

<script>
import ArtworkListItem from './ArtworkListItem'
export default {
  components: {
    ArtworkListItem,
  },
  props: {
    artworks: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
