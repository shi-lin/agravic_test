<template>
  <ArtworkForm :artwork="artwork" @published="redirect" />
</template>

<script>
import ArtworkForm from '~/components/ArtworkForm'

export default {
  components: {
    ArtworkForm,
  },
  data: () => ({
    artwork: null,
  }),
  computed: {
    type() {
      return (this.$route.params.type || 'image').toUpperCase()
    },
  },
  watch: {
    type: {
      async handler(val) {
        try {
          this.artwork = await this.$models.artworks.create(val)
        } catch (err) {
          console.error(err)
          this.$router.push('/')
        }
      },
      immediate: true,
    },
  },
  methods: {
    redirect() {
      this.$router.push(`/artworks/${this.artwork?.id}`)
    },
  },
}
</script>
