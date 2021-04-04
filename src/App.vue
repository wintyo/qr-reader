<template lang="pug">
div
  .box
    QRReader(
      @scan="onScan"
    )
    .info
      div QRデータ:
      template(v-if="isUrl")
        a(:href="state.qrCode", target="_blank") {{ state.qrCode }}
      template(v-else)
        p {{ state.qrCode }}
</template>

<script lang="ts">
import { defineComponent, reactive, computed } from 'vue';
import QRReader from './components/QRReader.vue';

interface IState {
  /** QRコードデータ */
  qrCode: string;
}

export default defineComponent({
  name: 'App',
  components: {
    QRReader,
  },
  setup() {
    const state = reactive<IState>({
      qrCode: '',
    });

    const isUrl = computed(() => {
      return /^https?:\/\//.test(state.qrCode);
    });

    return {
      state,
      isUrl,
      onScan: (code: string) => {
        console.log(code);
        state.qrCode = code;
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.box {
  max-width: 600px;
  margin: 0 auto;
}
</style>
