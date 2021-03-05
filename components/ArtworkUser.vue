<template>
  <v-card>
    <v-card-text>
      <nuxt-link
        :to="`/users/${user.id}`"
        class="text-decoration-none white--text"
      >
        <v-avatar>
          <v-img :src="user.image" />
        </v-avatar>
        <span class="text-h6 ml-2">{{ user.name }}</span>
      </nuxt-link>
    </v-card-text>
    <v-card-actions>
      <UserFollow :user-id="user.id" block />
    </v-card-actions>
  </v-card>
</template>

<script>
import UserFollow from './UserFollow'

export default {
  components: {
    UserFollow,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
}
</script>
