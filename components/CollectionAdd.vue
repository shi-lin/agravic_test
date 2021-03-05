<template>
  <v-dialog v-model="dialog" width="20rem">
    <template #activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on">
        <v-icon left>mdi-playlist-plus</v-icon>
        {{ $t('action.collect') }}
      </v-btn>
    </template>

    <v-card :loading="loading">
      <v-toolbar dense flat>
        <v-toolbar-title>{{ $t('collection.add_to') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text icon @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-list :disabled="loading">
        <CollectionListItem
          v-for="coll in collections"
          :key="coll.id"
          :artwork="artwork"
          :collection="coll"
          :disabled="loading"
        />

        <v-divider />

        <v-list-item
          v-if="!expand"
          :ripple="false"
          :disabled="loading"
          @click="expand = true"
        >
          <v-list-item-icon>
            <v-icon :disabled="loading">mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('collection.new_collection') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-else>
          <v-row>
            <v-col cols="12">
              <v-text-field
                v-model="form.title"
                :label="$t('collection.name')"
              />
            </v-col>
            <v-col cols="12">
              <v-label>{{ $t('collection.visibility') }}</v-label>
              <v-btn-toggle v-model="form.visibility">
                <v-btn
                  v-for="{ icon, label, value } in visibilities"
                  :key="value"
                  :value="value"
                >
                  <v-icon left>{{ icon }}</v-icon>
                  {{ label }}
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="12" class="text-right">
              <v-btn text :disabled="!form.title" @click="create">
                {{ $t('action.create') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
import CollectionListItem from './CollectionListItem'

export default {
  components: {
    CollectionListItem,
  },
  props: {
    artwork: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    form: {},
    dialog: false,
    expand: false,
    loading: false,
  }),
  computed: {
    collections() {
      return this.$store.getters['user/collections/list']
    },
    visibilities() {
      return [
        {
          icon: 'mdi-earth',
          label: this.$t('collection.visibility_option.ALL'),
          value: 'ALL',
        },
        {
          icon: 'mdi-link',
          label: this.$t('collection.visibility_option.LINK'),
          value: 'LINK',
        },
        {
          icon: 'mdi-lock',
          label: this.$t('collection.visibility_option.SELF'),
          value: 'SELF',
        },
      ]
    },
  },
  watch: {
    dialog(val) {
      if (val) {
        this.init()
        this.fetch()
      }
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['fetch', 'create'])
  },
  methods: {
    init() {
      this.form = this.$models.collections.init()
      this.expand = false
    },
    async fetch() {
      await this.$store.dispatch('user/collections/list')
      if (this.collections.length === 0) this.expand = true
    },
    async create() {
      await this.$store.dispatch('user/collections/create', this.form)
      this.init()
    },
  },
}
</script>
