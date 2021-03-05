<template>
  <v-tabs
    class="tabs"
    background-color="transparent"
    v-bind="$attrs"
    :grow="$vuetify.breakpoint.xs"
    :show-arrows="$vuetify.breakpoint.xs"
  >
    <v-tab v-for="{ to, label } in items" :key="to" :to="to" nuxt exact>
      {{ $t(label) }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
