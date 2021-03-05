<template>
  <v-container>
    <v-row>
      <v-col
        v-for="{ id, title, visibility, artworks } in collections"
        :key="id"
        cols="3"
      >
        <v-card :to="link(id)">
          <v-img :src="cover(artworks)" aspect-ratio="1" />
          <v-card-text>
            {{ title }}
            <v-icon class="float-right">{{ icon(visibility) }}</v-icon>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { visibility } from '~/consts/icons'

export default {
  async asyncData({ params, app }) {
    const collections = await app.$models.collections.list(params.id)
    return { collections }
  },
  methods: {
    link(id) {
      const { id: userId } = this.$route.params
      return `/users/${userId}/collections/${id}`
    },
    cover(artworks) {
      return artworks?.[0]?.files?.[0]
    },
    icon(vis) {
      return visibility[vis]
    },
  },
}
</script>
