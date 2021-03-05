<template>
  <v-list>
    <v-list-item-group v-for="({ title, items }, gIdx) in groups" :key="gIdx">
      <v-subheader>{{ $t(title) }}</v-subheader>
      <v-list-item v-for="{ to, icon, label } in items" :key="to" :to="to" nuxt>
        <v-list-item-action>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t(label) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider />
    </v-list-item-group>
  </v-list>
</template>

<script>
import { read, write } from '~/consts/routes'

export default {
  props: {
    authed: Boolean,
  },
  computed: {
    groups() {
      const groups = [{ title: 'nav.read', items: read }]
      if (this.authed) {
        groups.push({ title: 'nav.write', items: write })
      }
      return groups
    },
  },
}
</script>
