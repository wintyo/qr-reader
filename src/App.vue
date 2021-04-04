<template lang="pug">
div
  p.test__hoge test
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss" scoped>
.test {
  color: red;

  &__hoge {
    font-size: 18px;
    font-weight: bold;
  }
}
</style>
