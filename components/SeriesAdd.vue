<template>
  <v-dialog v-model="modal">
    <template v-slot:activator="{ attrs, on }">
      <v-btn v-bind="attrs" v-on="on">
        <v-icon left>mdi-plus</v-icon>
        {{ $t('series.add') }}
      </v-btn>
    </template>

    <v-card>
      <v-card-title>{{ $t('series.add') }}</v-card-title>
      <v-card-text>
        <SeriesForm v-model="form" :disabled="loading" />
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row dense>
            <v-spacer />
            <v-col cols="3">
              <v-btn block text @click="modal = false">
                {{ $t('action.cancel') }}
              </v-btn>
            </v-col>
            <v-col cols="3">
              <v-btn block color="primary" :loading="loading" @click="submit">
                {{ $t('action.add') }}
              </v-btn>
            </v-col>
            <v-spacer />
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import SeriesForm from './SeriesForm'

export default {
  components: {
    SeriesForm,
  },
  data: () => ({
    form: null,
    modal: false,
    loading: false,
  }),
  watch: {
    modal(val) {
      if (val) this.init() // init when open
    },
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.form = this.$models.series.init()
    },
    async submit() {
      this.loadng = true
      try {
        const id = await this.$models.series.create(this.form)
        this.$emit('add', { id, ...this.form })
        this.modal = false
      } catch (err) {
        console.error(err)
      } finally {
        this.loadng = false
      }
    },
  },
}
</script>
