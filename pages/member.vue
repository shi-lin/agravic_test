<template>
  <v-container fluid>
    <Tabs :items="items" />
    <nuxt-child />
  </v-container>
</template>

<script>
import Tabs from '~/components/Tabs'
import { member } from '~/consts/routes'

export default {
  components: {
    Tabs,
  },
  computed: {
    items: () => member,
  },
}
</script>
