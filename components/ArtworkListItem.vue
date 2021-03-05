<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card width="200" :to="`/artworks/${artwork.id}`" nuxt>
          <v-responsive aspect-ratio="1">
            <v-card-text v-if="artwork.type === 'NOVEL'">
              {{ artwork.body }}
            </v-card-text>
            <v-img v-else :src="artwork.files[0]" />
          </v-responsive>
        </v-card>
      </v-col>
      <v-col cols="12" class="px-2">
        {{ artwork.title }}
      </v-col>
      <v-col cols="12" class="px-2">
        <v-avatar size="24">
          <v-img :src="artwork.user.image" />
        </v-avatar>
        <v-label>{{ artwork.user.name }}</v-label>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    artwork: {
      type: Object,
      required: true,
    },
  },
}
</script>
