<template>
  <v-img :src="src" contain aspect-ratio="1" width="150px" class="accent img">
    <v-btn fab small class="remove" @click="$emit('remove')">
      <v-icon>mdi-trash-can-outline</v-icon>
    </v-btn>
  </v-img>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.remove {
  opacity: 0;
}
.img:hover .remove {
  opacity: 1;
}
</style>
