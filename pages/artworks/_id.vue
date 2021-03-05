<template>
  <v-container fluid>
    <v-row>
      <v-col cols="8">
        <v-card>
          <v-card-text v-if="artwork.type === 'NOVEL'">
            {{ artwork.body }}
          </v-card-text>
          <v-img v-else :src="cover" />
        </v-card>
      </v-col>

      <v-col cols="4">
        <ArtworkUser :user="artwork.user" />

        <v-card class="mt-4">
          <v-card-title>
            {{ artwork.title }}
          </v-card-title>
          <v-card-subtitle>
            {{ artwork.desc }}
          </v-card-subtitle>
          <v-card-text> {{ artwork.type }} </v-card-text>
          <v-card-text>
            <v-chip v-for="tag in artwork.tags" :key="tag.id" class="ma-1">
              {{ tag.text }}
            </v-chip>
            <!-- forbid_tags -->
            <v-chip v-if="artwork.target" class="ma-1">
              {{ artwork.target }}
            </v-chip>
            <v-chip class="ma-1">
              {{ artwork.original ? $t('tag.original') : $t('tag.derivative') }}
            </v-chip>
            <v-chip v-if="artwork.rating !== 'G'" class="ma-1">
              {{ artwork.rating }}
            </v-chip>
            <v-chip v-if="artwork.rps" class="ma-1">{{ $t('tag.rps') }}</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card>
          <v-card-text class="text-right">
            <v-btn :color="liked ? 'primary' : 'normal'" @click="toggleLike">
              <v-icon left>mdi-thumb-up</v-icon>
              {{ likeCount }}
            </v-btn>
            <v-btn>
              <v-icon left>mdi-share</v-icon>
              {{ $t('action.share') }}
            </v-btn>
            <CollectionAdd :artwork="artwork" />
          </v-card-text>
          <v-card-text>
            <v-label v-if="artwork.forbid_comments">
              {{ $t('artwork.comments_forbidden') }}
            </v-label>
            <Comments v-else :artwork-id="artwork.id" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArtworkUser from '~/components/ArtworkUser'
import Comments from '~/components/Comments'
import CollectionAdd from '~/components/CollectionAdd'

export default {
  components: {
    ArtworkUser,
    Comments,
    CollectionAdd,
  },
  async asyncData({ params, app, redirect }) {
    try {
      const artwork = await app.$models.artworks.get(params.id)
      return { artwork }
    } catch (err) {
      console.error(err)
      redirect('/')
    }
  },
  computed: {
    liked() {
      const uid = this.$store.getters['user/id']
      return this.artwork.likes?.includes(uid)
    },
    likeCount() {
      return this.artwork.likes?.length || 0
    },
    cover() {
      return this.artwork.files?.[0]
    },
  },
  methods: {
    async toggleLike() {
      const { id } = this.artwork
      if (this.liked) {
        await this.$models.artworks.unlike(id)
      } else {
        await this.$models.artworks.like(id)
      }
      this.artwork = await this.$models.artworks.get(id)
    },
  },
  head() {
    return {
      title: this.artwork.title,
    }
  },
}
</script>
