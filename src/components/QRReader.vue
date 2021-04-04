<template lang="pug">
div
  video.video(ref="elVideoRef")
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import jsQR from 'jsqr';

/** スキャンする間隔 */
const INTERVAL = 200;

export default defineComponent({
  name: 'QRReader',
  emits: {
    scan: (code: string) => {
      return !!code;
    },
  },
  setup(props, context) {
    let intervalId: number;
    const elVideoRef = ref<HTMLVideoElement>();
    const elInternalCanvas = document.createElement('canvas');

    const scanQRCode = () => {
      const elVideo = elVideoRef.value;

      if (!elVideo) {
        return;
      }

      const ctx = elInternalCanvas.getContext('2d');
      if (ctx == null) {
        return;
      }

      ctx.drawImage(elVideo, 0, 0, elInternalCanvas.width, elInternalCanvas.height);
      const imageData = ctx.getImageData(0, 0, elInternalCanvas.width, elInternalCanvas.height);

      const code = jsQR(imageData.data, elInternalCanvas.width, elInternalCanvas.height);
      if (code) {
        context.emit('scan', code.data);
      }
    };

    onMounted(async () => {
      if (!elVideoRef.value) {
        return;
      }
      const elVideo = elVideoRef.value;
      elVideo.srcObject = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'environment',
        },
      });
      elVideo.setAttribute('playsinline', 'true');
      elVideo.onloadedmetadata = () => {
        elVideo.play();
        console.log(`video resolution: ${elVideo.videoWidth} x ${elVideo.videoHeight}`);
        elInternalCanvas.width = elVideo.videoWidth;
        elInternalCanvas.height = elVideo.videoHeight;
      };

      intervalId = setInterval(() => {
        scanQRCode();
      }, INTERVAL);
    });

    onBeforeUnmount(() => {
      clearInterval(intervalId);
      elInternalCanvas.remove();

      if (elVideoRef.value && elVideoRef.value.srcObject) {
        if ('getVideoTracks' in elVideoRef.value.srcObject) {
          elVideoRef.value.srcObject.getVideoTracks()[0].stop();
        }
      }
    });

    return {
      elVideoRef,
    };
  },
});
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
}
</style>
