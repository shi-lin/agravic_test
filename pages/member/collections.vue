<template>
  <v-container>
    <v-row>
      <v-col cols="3">
        <v-list>
          <v-list-item-group v-model="selectedIdx" mandatory>
            <v-list-item
              v-for="{ id, title, visibility, artworks } in collections"
              :key="id"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ title }} ({{ artworks.length }})
                </v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon>{{ icon(visibility) }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col v-if="collection" cols="9">
        <v-toolbar dense flat>
          <v-toolbar-title>
            {{ collection.title }}
          </v-toolbar-title>
          <v-spacer />
          <v-subheader>{{ collection.artworks.length }}</v-subheader>
          <v-icon>{{ icon(collection.visibility) }}</v-icon>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" class="ml-4" tile v-on="on">
                <v-icon>mdi-dots-horizontal</v-icon>
              </v-btn>
            </template>
            <v-list dense>
              <v-list-item :to="link">
                <v-list-item-icon>
                  <v-icon>mdi-export</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('action.goto') }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item link @click="del">
                <v-list-item-icon>
                  <v-icon>mdi-delete</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $t('action.del') }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>

        <ArtworkList :artworks="collection.artworks" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ArtworkList from '~/components/ArtworkList'
import { visibility } from '~/consts/icons'

export default {
  components: {
    ArtworkList,
  },
  data: () => ({
    loading: false,
    selectedIdx: '',
    artworks: null,
  }),
  computed: {
    collections() {
      return this.$store.getters['user/collections/list']
    },
    collection() {
      return this.collections[this.selectedIdx]
    },
    link() {
      const uid = this.$store.getters['user/id']
      return `/users/${uid}/collections/${this.collection.id}`
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['fetch', 'del'])
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$store.dispatch('user/collections/list')
    },
    async del() {
      await this.$store.dispatch('user/collections/del', this.collection.id)
    },
    icon(vis) {
      return visibility[vis]
    },
  },
}
</script>
