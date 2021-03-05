<template>
  <v-select
    v-model="model"
    :items="items"
    :label="$t('artwork.series')"
    @click="onClick"
  >
    <template #append-outer>
      <SeriesAdd @add="addSeries" />
    </template>

    <template v-if="!series" #append-item>
      <v-container class="text-center">
        <v-progress-circular indeterminate />
      </v-container>
    </template>
  </v-select>
</template>

<script>
import SeriesAdd from './SeriesAdd'
export default {
  components: {
    SeriesAdd,
  },
  props: {
    value: {
      type: Object,
      default: null,
    },
  },
  data: () => ({
    series: null,
  }),
  computed: {
    model: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    items() {
      const series = this.series ?? (this.value ? [this.value] : [])
      return [
        { text: this.$t('series.no_series'), value: null },
        { divider: true },
        ...series.map((value) => ({ text: value.title, value })),
      ]
    },
  },
  methods: {
    async onClick() {
      this.series = this.series ?? (await this.$models.series.list())
    },
    addSeries(series) {
      this.series.push(series)
      this.model = { id: series.id, title: series.title }
    },
  },
}
</script>
