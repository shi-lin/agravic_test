<template>
  <v-app dark>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <nuxt-link to="/" class="text-decoration-none white--text">
          AGRAVIC
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />

      <v-toolbar-items>
        <SignIn v-if="!authed" />
        <Avatar v-else />
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app>
      <Drawer :authed="authed" />
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer absolute app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import Drawer from './default/Drawer'
import Avatar from './default/Avatar'
import SignIn from './default/SignIn'

export default {
  components: {
    Drawer,
    Avatar,
    SignIn,
  },
  data: () => ({
    drawer: false,
  }),
  computed: {
    authed() {
      return this.$store.getters['user/id'] !== ''
    },
  },
}
</script>
