<template>
  <v-btn v-if="!following" v-bind="$attrs" :loading="loading" @click="follow">
    <v-icon left>mdi-account-heart</v-icon>
    {{ $t('action.follow') }}
  </v-btn>
  <v-btn
    v-else-if="!hover"
    v-bind="$attrs"
    :loading="loading"
    color="primary"
    @mouseenter="hover = true"
  >
    <v-icon left>mdi-account-heart</v-icon>
    {{ $t('member.following') }}
  </v-btn>
  <v-btn
    v-else
    v-bind="$attrs"
    :loading="loading"
    color="error"
    outlined
    @click="unfollow"
    @mouseleave="hover = false"
  >
    <v-icon left>mdi-account-minus</v-icon>
    {{ $t('action.unfollow') }}
  </v-btn>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    hover: false,
    loading: false,
  }),
  computed: {
    following() {
      const profile = this.$store.getters['user/profile']
      return profile.followings?.includes(this.userId)
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['follow', 'unfollow'])
  },
  methods: {
    async follow() {
      await this.$store.dispatch('user/follow', this.userId)
      this.$emit('change')
    },
    async unfollow() {
      await this.$store.dispatch('user/unfollow', this.userId)
      this.$emit('change')
    },
  },
}
</script>
