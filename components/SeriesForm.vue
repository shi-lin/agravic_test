<template>
  <v-form :disabled="disabled">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field v-model="form.title" :label="$t('series.title')" />
        </v-col>
        <v-col cols="12">
          <v-textarea v-model="form.desc" :label="$t('series.desc')" />
        </v-col>
        <v-col cols="12">
          <v-checkbox v-model="form.end" :label="$t('series.end')" />
        </v-col>
        <v-col cols="3">
          <v-checkbox v-model="form.original" :label="$t('series.original')" />
        </v-col>
        <v-col cols="9">
          <v-select
            v-model="form.genre"
            :label="$t('series.genre')"
            :items="genreItems"
            :disabled="!form.original"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: null,
    },
    disabled: Boolean,
  },
  computed: {
    form: {
      get() {
        return this.value || {}
      },
      set(val) {
        this.$emit('input', val)
      },
    },
    genreItems() {
      return [
        { text: '戀愛', value: { id: '00', name: '戀愛' } },
        { text: '異世界奇幻', value: { id: '01', name: '異世界奇幻' } },
        { text: '現代奇幻', value: { id: '02', name: '現代奇幻' } },
        { text: '懸疑', value: { id: '03', name: '懸疑' } },
        { text: '恐怖', value: { id: '04', name: '恐怖' } },
        { text: '科幻', value: { id: '05', name: '科幻' } },
        { text: '文學', value: { id: '06', name: '文學' } },
        { text: '生活・情感', value: { id: '07', name: '生活・情感' } },
        { text: '歷史・時代', value: { id: '08', name: '歷史・時代' } },
        { text: 'BL', value: { id: '09', name: 'BL' } },
        { text: '百合', value: { id: '10', name: '百合' } },
        { text: '兒童向', value: { id: '11', name: '兒童向' } },
        { text: '散文・詩歌', value: { id: '12', name: '散文・詩歌' } },
        { text: '隨筆・紀實', value: { id: '13', name: '隨筆・紀實' } },
        { text: '劇本・腳本', value: { id: '14', name: '劇本・腳本' } },
        { text: '評論・感想', value: { id: '15', name: '評論・感想' } },
        { text: '其他', value: { id: '16', name: '其他' } },
      ]
    },
  },
  watch: {
    'form.original'(val) {
      if (!val) this.form.genre = null
    },
  },
}
</script>
