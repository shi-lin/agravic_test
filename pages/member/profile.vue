<template>
  <v-container fluid>
    <v-form :disabled="loading">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field v-model="id" label="ID" readonly />
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="form.id_url"
            :label="$t('member.profile.id_url')"
          />
        </v-col>

        <v-col cols="8" sm="4">
          <v-text-field
            v-model="form.address"
            :label="$t('member.profile.address')"
          />
        </v-col>
        <v-col cols="4" sm="2">
          <v-switch
            v-model="form.address_show"
            :label="$t('member.profile.show')"
          />
        </v-col>
        <v-col cols="8" sm="4">
          <v-text-field
            v-model="form.birth"
            :label="$t('member.profile.birth')"
          />
        </v-col>
        <v-col cols="4" sm="2">
          <v-switch
            v-model="form.birth_show"
            :label="$t('member.profile.show')"
          />
        </v-col>
        <v-col cols="8" sm="4">
          <v-text-field
            v-model="form.career"
            :label="$t('member.profile.career')"
          />
        </v-col>
        <v-col cols="4" sm="2">
          <v-switch
            v-model="form.career_show"
            :label="$t('member.profile.show')"
          />
        </v-col>
        <v-col cols="8" sm="4">
          <v-text-field
            v-model="form.email"
            :label="$t('member.profile.email')"
          />
        </v-col>
        <v-col cols="4" sm="2">
          <v-switch
            v-model="form.email_show"
            :label="$t('member.profile.show')"
          />
        </v-col>

        <v-col cols="6" sm="3">
          <v-text-field
            v-model="form.familyName"
            :label="$t('member.profile.family_name')"
          />
        </v-col>
        <v-col cols="6" sm="3">
          <v-text-field
            v-model="form.givenName"
            :label="$t('member.profile.given_name')"
          />
        </v-col>
        <v-col cols="6" sm="3">
          <v-text-field
            v-model="form.name"
            :label="$t('member.profile.name')"
          />
        </v-col>
        <v-col cols="6" sm="3">
          <v-text-field
            v-model="form.gender"
            :label="$t('member.profile.gender')"
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-textarea
            v-model="form.self_intro"
            :label="$t('member.profile.self_intro')"
          />
        </v-col>
        <v-col cols="12" sm="6" class="text-center">
          <v-img
            :src="form.image"
            aspect-ratio="1"
            width="130"
            class="accent d-inline-block"
          />
          <v-file-input v-model="file" hide-input class="d-inline-block" />
        </v-col>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols="6" sm="3">
          <v-btn
            block
            x-large
            outlined
            color="error"
            :disabled="loading || !dirty"
            @click="revert"
          >
            {{ $t('action.revert') }}
          </v-btn>
        </v-col>
        <v-col cols="6" sm="3">
          <v-btn block x-large :disabled="loading || !dirty" @click="save">
            {{ $t('action.save') }}
          </v-btn>
        </v-col>
        <v-spacer />
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import isEqual from 'lodash/isEqual'

export default {
  data: () => ({
    form: {},
    loading: false,
  }),
  computed: {
    id() {
      return this.$store.getters['user/id']
    },
    profile() {
      return this.$store.getters['user/profile']
    },
    dirty() {
      return isEqual(this.form, this.profile)
    },
    file: {
      get() {
        return null
      },
      set(val) {
        this.form.image = URL.createObjectURL(val)
      },
    },
  },
  watch: {
    profile: {
      handler: 'revert',
      immediate: true,
      deep: true,
    },
  },
  created() {
    this.$utils.wrapLoading(this, 'loading', ['fetch', 'save'])
  },
  mounted() {
    this.fetch()
  },
  methods: {
    revert() {
      this.form = { ...this.profile }
    },
    async fetch() {
      await this.$store.dispatch('user/get')
    },
    async save() {
      if (this.form.image.startsWith('blob:')) {
        const rs = await fetch(this.form.image)
        const buffer = await rs.arrayBuffer()
        const url = await this.$models.storage.upload(buffer)
        this.form.image = url
      }
      await this.$store.dispatch('user/update', this.form)
    },
  },
}
</script>
