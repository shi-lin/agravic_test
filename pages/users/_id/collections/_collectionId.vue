<template>
  <v-container fluid>
    <v-toolbar dense>
      <v-toolbar-title>
        {{ collection.title }}
      </v-toolbar-title>
    </v-toolbar>
    <ArtworkList :artworks="collection.artworks" />
  </v-container>
</template>

<script>
import ArtworkList from '~/components/ArtworkList'

export default {
  components: {
    ArtworkList,
  },
  async asyncData({ params, app }) {
    const { id: userId, collectionId } = params
    const collection = await app.$models.collections.get(collectionId, userId)
    return { collection }
  },
}
</script>
