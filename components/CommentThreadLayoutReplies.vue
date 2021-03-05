<template>
  <v-row v-if="replies.length" no-gutters>
    <v-col cols="12">
      <v-btn v-if="expand" text small @click="expand = false">
        <v-icon left>mdi-chevron-up</v-icon>
        {{ $t('info.num_replies_expand', [replies.length]) }}
      </v-btn>
      <v-btn v-else text small @click="expand = true">
        <v-icon left>mdi-chevron-down</v-icon>
        {{ $t('info.num_replies_collapse', [replies.length]) }}
      </v-btn>
    </v-col>
    <template v-if="expand">
      <v-col v-for="reply in replies" :key="reply.id" cols="12">
        <slot :reply="reply" name="item" />
      </v-col>
    </template>
  </v-row>
</template>

<script>
export default {
  props: {
    replies: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    expand: false,
  }),
}
</script>
