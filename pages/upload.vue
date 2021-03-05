<template>
  <v-container>
    <v-tabs background-color="transparent">
      <v-tab v-for="{ to, label } in items" :key="to" :to="to" nuxt exact>
        {{ $t(label) }}
      </v-tab>
    </v-tabs>
    <nuxt-child />
  </v-container>
</template>

<script>
import { write } from '~/consts/routes'

export default {
  computed: {
    items: () => write,
  },
}
</script>
