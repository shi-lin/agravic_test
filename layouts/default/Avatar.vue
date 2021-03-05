<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text tile v-bind="attrs" v-on="on">
        <v-avatar :size="avatarSize">
          <v-img :src="profile.image" />
        </v-avatar>
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-subheader v-text="profile.name" />
      <v-divider />

      <v-list-item v-for="{ to, icon, label } in items" :key="to" :to="to" nuxt>
        <v-list-item-action>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t(label) }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
      <v-list-item @click="signOut">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>{{ $t('action.sign_out') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { member } from '~/consts/routes'

export default {
  computed: {
    avatarSize() {
      return this.$vuetify.breakpoint.xs ? 32 : 48
    },
    profile() {
      return this.$store.getters['user/profile']
    },
    items: () => member,
  },
  mounted() {
    this.$store.dispatch('user/get')
  },
  methods: {
    signOut() {
      this.$store.dispatch('user/signOut')
    },
  },
}
</script>
