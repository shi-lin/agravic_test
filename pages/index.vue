<template>
  <v-container>
    <Tabs :items="items" />
    <nuxt-child />
  </v-container>
</template>

<script>
import Tabs from '~/components/Tabs'
import { read } from '~/consts/routes'

export default {
  components: {
    Tabs,
  },
  computed: {
    items: () => read,
  },
}
</script>
