<template>
  <work-space :descriptorMap="descriptorMap"></work-space>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WorkSpace from '@/components/WorkSpace.vue';
import descriptorMap from '@/config/es';

@Component({
  components: {
    WorkSpace,
  },
})
export default class Es extends Vue {
  descriptorMap = descriptorMap;
}
</script>
