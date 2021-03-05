<template>
  <v-list-item :disabled="disabled || loading" @click="toggle">
    <v-list-item-action>
      <v-progress-circular v-if="loading" indeterminate size="16" />
      <v-checkbox v-else :input-value="selected" />
    </v-list-item-action>
    <v-list-item-content>
      <v-list-item-title>
        {{ collection.title }}
      </v-list-item-title>
    </v-list-item-content>
    <v-list-item-icon>
      <v-icon :disabled="loading">{{ icon }}</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  props: {
    artwork: {
      type: Object,
      required: true,
    },
    collection: {
      type: Object,
      required: true,
    },
    disabled: Boolean,
  },
  data: () => ({
    loading: false,
  }),
  computed: {
    selected() {
      return this.collection.artworks.some((p) => p.id === this.artwork.id)
    },
    icon() {
      return {
        ALL: 'mdi-earth',
        LINK: 'mdi-link',
        SELF: 'mdi-lock',
      }[this.collection.visibility]
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['toggle'])
  },
  methods: {
    async toggle() {
      const payload = {
        collectionId: this.collection.id,
        artworkId: this.artwork.id,
      }
      if (this.selected) {
        await this.$store.dispatch('user/collections/removeFrom', payload)
      } else {
        await this.$store.dispatch('user/collections/addTo', payload)
      }
    },
  },
}
</script>
