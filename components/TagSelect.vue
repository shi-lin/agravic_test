<template>
  <v-combobox
    v-model="model"
    :items="items"
    :label="$t('artwork.tags')"
    item-text="text"
    return-object
    multiple
    chips
    @click="onClick"
  >
    <template #append-outer>
      <slot />
    </template>
  </v-combobox>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    tags: null,
  }),
  computed: {
    model: {
      get() {
        return this.value ?? []
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    items() {
      return this.tags ?? []
    },
  },
  methods: {
    async onClick() {
      this.tags = this.tags ?? (await this.$models.tags.list())
    },
  },
}
</script>
