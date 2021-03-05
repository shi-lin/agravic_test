<template>
  <CommentThreadLayoutItem :comment="comment">
    <template #inner-input="{ close }">
      <CommentInput
        :artwork-id="artworkId"
        :parent-id="comment.id"
        @close="close"
        @submit="fetch"
      />
    </template>
    <template #inner-list>
      <CommentThreadLayoutReplies :replies="replies">
        <template #item="{ reply }">
          <CommentThreadLayoutItem :comment="reply" :size="24">
            <template #outer-input="{ close }">
              <CommentInput
                :artwork-id="artworkId"
                :parent-id="comment.id"
                :tag-user="reply.user"
                @close="close"
                @submit="fetch"
              />
            </template>
          </CommentThreadLayoutItem>
        </template>
      </CommentThreadLayoutReplies>
    </template>
  </CommentThreadLayoutItem>
</template>

<script>
import CommentInput from './CommentInput'
import CommentThreadLayoutItem from './CommentThreadLayoutItem'
import CommentThreadLayoutReplies from './CommentThreadLayoutReplies'

export default {
  components: {
    CommentInput,
    CommentThreadLayoutItem,
    CommentThreadLayoutReplies,
  },
  props: {
    artworkId: {
      type: String,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    replies: [],
  }),
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.replies = await this.$models.comments.list(
        this.artworkId,
        this.comment.id
      )
    },
  },
}
</script>
