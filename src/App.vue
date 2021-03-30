<template>
  <div id="app">
    <el-header>
      <el-tabs class="tab" v-model="activeName" @tab-click="tabClick">
        <el-tab-pane label="英语" name="en"></el-tab-pane>
        <el-tab-pane label="西班牙语" name="es"></el-tab-pane>
      </el-tabs>
      <div style="flex: 1"></div>
      <span class="version">单机版</span>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class App extends Vue {
  activeName = 'en';

  mounted() {
    this.activeName = this.$route.name as string;
    window.addEventListener('beforeunload', this.preventRefresh);
  }

  tabClick() {
    this.$router.push({ name: this.activeName }).catch(() => {
      // empty
    });
  }

  beforeDestroy() {
    window.removeEventListener('beforeunload', this.preventRefresh);
  }

  preventRefresh(event: BeforeUnloadEvent) {
    event.preventDefault();
    /* eslint no-param-reassign: "error" */
    event.returnValue = '确认离开英语单机版页面吗？建议您保存该文件至本地，以免前功尽弃。';
    return '确认离开英语单机版页面吗？建议您保存该文件至本地，以免前功尽弃。';
  }
}
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.el-header {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #E0E3E8;
  padding: 0 16% !important;
  .version {
    font-size: 14px;
    color: #8F9297;
  }
}
.tab {
  .el-tabs__nav-wrap::after {
    background-color: unset;
  }
}
.el-main {
  padding-left: 16% !important;
  padding-right: 16% !important;
}
</style>
