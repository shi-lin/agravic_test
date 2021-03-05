<template>
  <v-form :disabled="loading" @submit.prevent.stop="submit">
    <v-row no-gutters>
      <v-col cols="12">
        <v-text-field
          v-model="text"
          :autofocus="isReply"
          :placeholder="placeholder"
          @focus="focus = true"
        >
          <template #prepend>
            <v-avatar :size="size">
              <v-img :src="image" class="accent" />
            </v-avatar>
          </template>
        </v-text-field>
      </v-col>
      <v-col v-if="isReply || focus" cols="12" class="text-right">
        <v-btn text @click="close">
          {{ $t('action.cancel') }}
        </v-btn>
        <v-btn type="submit" :loading="loading">
          {{ $t('action.comment') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
export default {
  props: {
    artworkId: {
      type: String,
      required: true,
    },
    parentId: {
      type: String,
      default: '',
    },
    tagUser: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    text: '',
    focus: false,
    loading: false,
  }),
  computed: {
    isReply() {
      return this.parentId !== ''
    },
    placeholder() {
      return this.isReply ? '新增回覆...' : '新增留言...'
    },
    size() {
      return this.isReply ? 24 : 40
    },
    image() {
      return this.$store.getters['user/profile'].image
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['submit'])
  },
  mounted() {
    if (this.tagUser) {
      this.text = `@${this.tagUser.name} `
    }
  },
  beforeDestroy() {
    this.clear()
  },
  methods: {
    async submit() {
      const id = await this.$models.comments.create(
        this.artworkId,
        this.parentId,
        this.text
      )
      this.close()
      this.$emit('submit', id)
    },
    close() {
      this.clear()
      this.$emit('close')
    },
    clear() {
      this.text = ''
      this.focus = false
      this.loading = false
    },
  },
}
</script>
