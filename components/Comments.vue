<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col cols="12"> {{ $t('info.num_comments', [comments.length]) }}</v-col>
      <v-col cols="12" class="mb-12">
        <CommentInput :artwork-id="artworkId" @submit="fetch" />
      </v-col>
      <v-col v-for="comment in comments" :key="comment.id" cols="12">
        <CommentThread :artwork-id="artworkId" :comment="comment" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommentInput from './CommentInput'
import CommentThread from './CommentThread'

export default {
  components: {
    CommentInput,
    CommentThread,
  },
  props: {
    artworkId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    comments: [],
  }),
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.comments = await this.$models.comments.list(this.artworkId)
    },
  },
}
</script>
