<template>
  <ArtworkForm
    :artwork="artwork"
    :disabled="loading"
    @saaved="redirectBack"
    @published="redirect"
  />
</template>

<script>
import ArtworkForm from '~/components/ArtworkForm'

export default {
  components: {
    ArtworkForm,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    id() {
      return this.$route.params.id || ''
    },
    artwork() {
      return this.$store.getters['user/artworks'][this.id]
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
      await this.$store.dispatch('user/getArtwork', this.id)
    },
    redirectBack() {
      this.$router.push('/member/artworks')
    },
    redirect() {
      this.$router.push(`/artworks/${this.artwork?.id}`)
    },
  },
}
</script>
