<template>
  <v-row no-gutters>
    <v-col cols="12">
      <v-input>
        <template #prepend>
          <v-avatar :size="size">
            <v-img :src="comment.user.image" class="accent" />
          </v-avatar>
        </template>

        <v-row no-gutters>
          <v-col cols="12">
            <v-label>
              {{ comment.user.name }}
            </v-label>
          </v-col>
          <v-col cols="12">
            {{ comment.text }}
          </v-col>
          <v-col cols="12">
            <v-btn small text disabled min-width="0" class="px-0">
              {{ humanized }}
            </v-btn>
            <v-btn small text @click="open">
              {{ $t('action.reply') }}
            </v-btn>
          </v-col>

          <v-col v-if="reply" cols="12">
            <slot name="inner-input" :close="close" />
          </v-col>

          <v-col cols="12">
            <slot name="inner-list" />
          </v-col>
        </v-row>
      </v-input>
    </v-col>

    <v-col v-if="reply" cols="12" class="outer-input">
      <slot name="outer-input" :close="close" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
    size: {
      type: Number,
      default: 40,
    },
  },
  data: () => ({
    reply: false,
  }),
  computed: {
    humanized() {
      const d = new Date(Date.now() - this.comment.ctime * 1000)

      let t = d.getTime()
      if (t < 0) return '-' // should not happen

      t = d.getUTCFullYear() - 1970
      if (t > 0) return this.$t('info.ago_years', [t])
      t = d.getUTCMonth()
      if (t > 0) return this.$t('info.ago_months', [t])
      t = d.getUTCDate() - 1
      if (t > 0) return this.$t('info.ago_days', [t])
      t = d.getUTCHours()
      if (t > 0) return this.$t('info.ago_hours', [t])
      t = d.getUTCMinutes()
      if (t > 0) return this.$t('info.ago_minutes', [t])

      return this.$t('info.ago_now')
    },
  },
  methods: {
    close() {
      this.reply = false
    },
    open() {
      this.reply = true
    },
  },
}
</script>

<style scoped>
.outer-input {
  margin-top: -1.5rem;
}
</style>
