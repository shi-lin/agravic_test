<template>
  <v-container>
    <template v-if="type === 'IMAGE' || type == 'MANGA'">
      <ImageFiles v-model="form.files" />
    </template>

    <v-form :disabled="!artwork || disabled">
      <v-container>
        <v-row align="center">
          <v-col cols="12">
            <SeriesSelect v-model="form.series" />
          </v-col>

          <v-col cols="12">
            <v-text-field v-model="form.title" :label="$t('artwork.title')" />
          </v-col>

          <template v-if="type === 'NOVEL'">
            <v-col cols="12">
              <v-textarea v-model="form.body" :label="$t('artwork.body')" />
            </v-col>
          </template>

          <v-col cols="12">
            <v-textarea v-model="form.desc" :label="$t('artwork.desc')" />
          </v-col>

          <v-col cols="12">
            <TagSelect v-model="form.tags">
              <v-checkbox
                v-model="form.forbid_tags"
                :label="$t('artwork.forbid_tags')"
              />
            </TagSelect>
          </v-col>
        </v-row>

        <v-row align="center" dense>
          <v-col cols="2"
            ><v-label>{{ $t('artwork.target') }}</v-label></v-col
          >
          <v-col cols="10">
            <v-radio-group v-model="form.target" row>
              <v-radio value="" :label="$t('artwork.target_option.NONE')" />
              <v-radio value="BG" :label="$t('artwork.target_option.BG')" />
              <v-radio value="BL" :label="$t('artwork.target_option.BL')" />
              <v-radio value="GL" :label="$t('artwork.target_option.GL')" />
              <v-radio value="YUME" :label="$t('artwork.target_option.YUME')" />
            </v-radio-group>
          </v-col>

          <v-col cols="2">
            <v-label>{{ $t('artwork.rating') }}</v-label>
          </v-col>
          <v-col cols="10">
            <v-radio-group v-model="form.rating" row>
              <v-radio value="G" :label="$t('artwork.rating_option.G')" />
              <v-radio value="R-18" :label="$t('artwork.rating_option.R-18')" />
              <v-radio
                value="R-18G"
                :label="$t('artwork.rating_option.R-18G')"
              />
            </v-radio-group>
          </v-col>

          <v-col cols="2">
            <v-label>{{ $t('artwork.visibility') }}</v-label>
          </v-col>
          <v-col cols="10">
            <v-radio-group v-model="form.visibility" row>
              <v-radio
                value="ALL"
                :label="$t('artwork.visibility_option.ALL')"
              />
              <v-radio
                value="FOLLOWERS"
                :label="$t('artwork.visibility_option.FOLLOWERS')"
              />
              <v-radio
                value="MUTUAL_FOLLOWERS"
                :label="$t('artwork.visibility_option.MUTUAL_FOLLOWERS')"
              />
              <v-radio
                value="LINK"
                :label="$t('artwork.visibility_option.LINK')"
              />
              <v-radio
                value="SELF"
                :label="$t('artwork.visibility_option.SELF')"
              />
            </v-radio-group>
          </v-col>

          <v-col cols="12">
            <v-checkbox
              v-model="form.original"
              :label="$t('artwork.original')"
            />
          </v-col>

          <v-col cols="12">
            <v-checkbox
              v-model="form.forbid_comments"
              :label="$t('artwork.forbid_comments')"
            />
          </v-col>

          <v-col cols="12">
            <v-checkbox v-model="form.rps" :label="$t('artwork.rps')" />
          </v-col>
        </v-row>

        <v-row>
          <v-spacer />
          <v-col cols="6" sm="3">
            <v-btn block x-large :loading="loading.update" @click="save">
              {{ $t('action.save') }}
            </v-btn>
          </v-col>
          <v-col v-if="!form.published" cols="6" sm="3">
            <v-btn
              block
              x-large
              color="primary"
              :loading="loading.update"
              @click="publish"
            >
              {{ $t('action.publish') }}
            </v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import ImageFiles from './ImageFiles'
import SeriesSelect from './SeriesSelect'
import TagSelect from './TagSelect'

export default {
  components: {
    ImageFiles,
    SeriesSelect,
    TagSelect,
  },
  props: {
    artwork: {
      type: Object,
      default: null,
    },
    disabled: Boolean,
  },
  data() {
    return {
      form: this.$models.artworks.init(),
      loading: {
        tags: false,
        update: false,
      },
    }
  },
  computed: {
    type() {
      return this.artwork?.type
    },
  },
  watch: {
    artwork: {
      handler(val) {
        this.form = { ...val }
      },
      immediate: true,
    },
  },
  methods: {
    async save() {
      await this.update()
      this.$emit('saved')
    },
    async publish() {
      await this.update({ published: true })
      this.$emit('published')
    },
    async uploadFile(url) {
      if (!url.startsWith('blob:')) {
        return url
      }
      const rs = await fetch(url)
      const buffer = await rs.arrayBuffer()
      return await this.$models.storage.upload(buffer)
    },
    async addTag(value) {
      if (typeof value === 'object') {
        return value
      }
      return await this.$models.tags.create(value)
    },
    async update(overrides = {}) {
      this.loading.update = true
      try {
        const update = { ...this.form, ...overrides }
        update.files = await Promise.all(this.form.files.map(this.uploadFile))
        update.tags = await Promise.all(this.form.tags.map(this.addTag))

        await this.$models.artworks.update(this.artwork.id, update)
      } catch (err) {
        console.error(err)
      } finally {
        this.loading.update = false
      }
    },
  },
}
</script>
?
