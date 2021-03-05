<template>
  <v-container>
    <v-data-table :headers="headers" :items="series" :loading="loading">
      <template #[`item.title`]="{ item: { id }, value }">
        <nuxt-link :to="`/member/series/${id}`">
          {{ value }}
        </nuxt-link>
      </template>
      <template #[`item.end`]="{ value }">
        <v-icon v-if="value">mdi-check</v-icon>
      </template>
      <template #[`item.original`]="{ value }">
        <v-icon v-if="value">mdi-check</v-icon>
      </template>
      <template #[`item.genre`]="{ value }">
        {{ value && value.name }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    loading: false,
  }),
  computed: {
    series() {
      return Object.values(this.$store.getters['user/series'])
    },
    headers() {
      return [
        { text: this.$t('series.title'), value: 'title' },
        { text: this.$t('series.desc'), value: 'desc' },
        { text: this.$t('series.end'), value: 'end' },
        { text: this.$t('series.original'), value: 'original' },
        { text: this.$t('series.genre'), value: 'genre' },
      ]
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['fetch'])
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$store.dispatch('user/getSeriesList')
    },
  },
}
</script>
