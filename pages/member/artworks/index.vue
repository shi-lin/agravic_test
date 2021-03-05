<template>
  <v-container>
    <v-data-table :headers="headers" :items="artworks" :loading="loading">
      <template #[`item.title`]="{ item: { id }, value }">
        <nuxt-link :to="`/member/artworks/${id}`">
          {{ value }}
        </nuxt-link>
      </template>
      <template #[`item.type`]="{ value }">
        {{ $t(`artwork.type_option.${value}`) }}
      </template>
      <template #[`item.files`]="{ value }">
        {{ value.length || '' }}
      </template>
      <template #[`item.series`]="{ value }">
        {{ value && value.title }}
      </template>
      <template #[`item.body`]="{ value }">
        {{ value && value.length }}
      </template>
      <template #[`item.ctime`]="{ value }">
        {{ date(value) }}
      </template>
      <template #[`item.mtime`]="{ value }">
        {{ date(value) }}
      </template>
      <template #[`item.rating`]="{ value }">
        {{ $t(`artwork.rating_option.${value}`) }}
      </template>
      <template #[`item.forbid_comments`]="{ value }">
        <v-icon v-if="value">mdi-check</v-icon>
      </template>
      <template #[`item.original`]="{ value }">
        <v-icon v-if="value">mdi-check</v-icon>
      </template>
      <template #[`item.published`]="{ value }">
        <v-icon v-if="value">mdi-check</v-icon>
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
    artworks() {
      return Object.values(this.$store.getters['user/artworks'])
    },
    headers() {
      return [
        { text: this.$t('artwork.type'), value: 'type' },
        { text: this.$t('artwork.title'), value: 'title' },
        { text: this.$t('artwork.desc'), value: 'desc' },
        { text: this.$t('artwork.body'), value: 'body' },
        { text: this.$t('artwork.files'), value: 'files' },
        { text: this.$t('artwork.series'), value: 'series' },
        { text: this.$t('artwork.visibility'), value: 'visibility' },
        { text: this.$t('artwork.forbid_comments'), value: 'forbid_comments' },
        { text: this.$t('artwork.rating'), value: 'rating' },
        { text: this.$t('artwork.original'), value: 'original' },
        { text: this.$t('artwork.ctime'), value: 'ctime' },
        { text: this.$t('artwork.mtime'), value: 'mtime' },
        { text: this.$t('artwork.published'), value: 'published' },
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
      await this.$store.dispatch('user/getArtworks')
    },
    date(time) {
      if (!time) return '-'
      const d = new Date(time * 1000)
      const yy = `${d.getFullYear()}`.padStart(4, '0')
      const mm = `${d.getMonth() + 1}`.padStart(2, '0')
      const dd = `${d.getDate()}`.padStart(2, '0')
      const hh = `${d.getHours()}`.padStart(2, '0')
      const ss = `${d.getMinutes()}`.padStart(2, '0')
      return `${yy}/${mm}/${dd} ${hh}:${ss}`
    },
  },
}
</script>
