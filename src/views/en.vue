<template>
  <work-space :descriptorMap="descriptorMap"></work-space>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import WorkSpace from '@/components/WorkSpace.vue';
import descriptorMap from '@/config/en';

@Component({
  components: {
    WorkSpace,
  },
})
export default class En extends Vue {
  descriptorMap = descriptorMap;
}
</script>
