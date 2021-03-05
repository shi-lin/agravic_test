<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SeriesForm v-model="series" :disabled="loading" />
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn x-large class="ml-4" :loading="loading" @click="save">
          {{ $t('action.save') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SeriesForm from '~/components/SeriesForm'

export default {
  components: {
    SeriesForm,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    id() {
      return this.$route.params.id
    },
    series() {
      return this.$store.getters['user/series'][this.id]
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['fetch', 'save'])
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$store.dispatch('user/getSeries', this.id)
    },
    async save() {
      await this.$models.series.update(this.id, this.series)
      this.$router.push('/member/series')
    },
    // async del() {
    //   await this.$models.series.del(this.id)
    //   this.$router.push('/member/series')
    // },
  },
}
</script>
