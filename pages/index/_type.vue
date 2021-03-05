<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ArtworkList :artworks="artworks" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArtworkList from '~/components/ArtworkList'

export default {
  components: {
    ArtworkList,
  },
  async asyncData({ params, app }) {
    const type = (params.type || 'image').toUpperCase()
    const artworks = await app.$models.artworks.list({ type, published: true })
    return { type, artworks }
  },
}
</script>
