<template>
  <v-container fluid>
    <input
      ref="input"
      type="file"
      hidden
      multiple
      accept="image/gif,image/jpeg,image/png"
      @input="add"
    />

    <template v-if="value.length === 0">
      <v-row justify="center">
        <v-col class="flex-grow-0">
          <v-input messages="true">
            <v-btn x-large width="20rem" @click="select">
              <v-icon left>mdi-file</v-icon>
              {{ $t('action.choose_files') }}
            </v-btn>
            <template #message>
              <ul>
                <li>可用 Shift，Ctrl（Command）鍵來選擇多個檔案</li>
                <li>檔案格式 JPEG GIF PNG</li>
                <li>每張 32 MB 以內</li>
                <li>合計最多 200 張，200 MB 以內</li>
              </ul>
            </template>
          </v-input>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-container>
        <v-row>
          <v-col v-for="src in value" :key="src" class="flex-grow-0">
            <ImageFileItem :src="src" @remove="remove(src)" />
          </v-col>
          <v-col class="flex-grow-0">
            <v-btn width="150" height="150" @click="select">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-container>
</template>

<script>
import ImageFileItem from './ImageFileItem'

export default {
  components: {
    ImageFileItem,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    select() {
      this.$refs.input.click()
    },
    add() {
      const value = [...this.value]
      const files = [...this.$refs.input.files]
      this.$refs.input.value = null

      files.forEach((file) => {
        value.push(URL.createObjectURL(file))
      })

      this.$emit('input', value)
    },
    remove(file) {
      this.$emit(
        'input',
        this.value.filter((f) => f !== file)
      )
    },
  },
}
</script>
