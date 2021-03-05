<template>
  <v-container>
    <v-avatar>
      <v-img :src="user.image" />
    </v-avatar>
    {{ user.name }}
    {{ $t('member.num_followings', [user.followings.length]) }}
    {{ $t('member.num_followers', [user.followers.length]) }}
    <UserFollow :user-id="user.id" @change="fetch" />

    <Tabs :items="items" />
    <nuxt-child />
  </v-container>
</template>

<script>
import UserFollow from '~/components/UserFollow'
import Tabs from '~/components/Tabs'

export default {
  components: {
    UserFollow,
    Tabs,
  },
  async asyncData({ app, params }) {
    const { id } = params
    const userData = await app.$models.users.get(id)
    return { userData }
  },
  data: () => ({
    user: null,
  }),
  computed: {
    items() {
      const id = this.user.id
      return [
        {
          to: `/users/${id}/artworks`,
          icon: 'mdi-view-headline',
          label: 'nav.user.artworks',
        },
        {
          to: `/users/${id}/series`,
          icon: 'mdi-bookshelf',
          label: 'nav.user.series',
        },
        {
          to: `/users/${id}/collections`,
          icon: 'mdi-bookmark',
          label: 'nav.user.collections',
        },
      ]
    },
  },
  created() {
    this.user = this.userData
  },
  methods: {
    async fetch() {
      this.user = await this.$models.users.get(this.user.id)
    },
  },
  head() {
    return {
      title: this.userData.name,
    }
  },
}
</script>
