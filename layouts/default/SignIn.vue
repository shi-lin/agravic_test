<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on">{{ $t('action.sign_in') }}</v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(item, idx) in items"
        :key="idx"
        @click="item.handler"
      >
        <v-list-item-action>
          <v-icon v-text="item.icon" />
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.label" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { auth } from 'firebase/app'

const items = [
  {
    icon: 'mdi-google',
    label: 'Google',
    handler: () => auth().signInWithPopup(new auth.GoogleAuthProvider()),
  },
  {
    icon: 'mdi-facebook',
    label: 'Facebook',
    handler: () => auth().signInWithPopup(new auth.FacebookAuthProvider()),
  },
]

export default {
  computed: {
    items: () => items,
  },
}
</script>
