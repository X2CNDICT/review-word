<template>
  <el-dialog
    width="700px"
    title="编辑/审查单词"
    :visible.sync="dialogVisible"
    custom-class="baseForm"
  >
    <el-form
      :model="extensionFormModel"
      ref="baseForm"
      label-width="100px"
    >
      <el-form-item
        prop="form"
        label="form"
      >
        <el-select
          v-model="extensionFormModel.form"
          @change="formChange($event)"
          :disabled="extensionFormModel.status === 'abstained'"
        >
          <el-option
            v-for="item in formOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        prop="status"
        label="status"
      >
        <div class="item-container">
          <el-select
            v-model="extensionFormModel.status"
            @change="statusChange"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="tip">确认词义无误或修改内容后，请标识为「edited」。</div>
        </div>
      </el-form-item>
      <el-form-item
        prop="word"
        label="word"
      >
       <div class="item-container">
          <el-input
            v-model="extensionFormModel.word"
            :disabled="inputDisabled"
          ></el-input>
          <div class="link">
            关于专业解释，参考
            <el-link
              :href="dicBaseUrl+extensionFormModel.word"
              type="primary"
              target="_blank"
              :underline="false"
            >Cambridge</el-link>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        prop="pos"
        label="pos"
      >
        <el-select v-model="extensionPos" disabled>
          <el-option
            v-for="item in posOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <dynamic-form
        v-if="descriptorMap[extensionPos]"
        v-model="extensionFormModel"
        :descriptors="descriptorMap[extensionPos]"
        :disabled="inputDisabled"
      >
      </dynamic-form>
    </el-form>
    <span slot="footer">
      <el-button @click="$emit('prev')" size="small" :disabled="prevDisabled">
        <i class="el-icon-arrow-left"></i>
        上一个
      </el-button>
      <el-button type="primary" size="small" @click="$emit('next')" :disabled="nextDisabled">
        下一个
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import {
  Component, Prop, Vue, Watch,
} from 'vue-property-decorator';
import {
  FORM_OPTIONS, LANG_DICTIONARY_MAP, LANG_POS_CASCADER_OPTIONS_MAP, STATUS,
} from '@/consts';
import DynamicForm from 'vue-dynamic-form-component';

@Component({
  components: {
    DynamicForm,
  },
})
export default class ExtensionForm extends Vue {
  @Prop()
  visible!: boolean;

  get dialogVisible() {
    return this.visible;
  }

  set dialogVisible(val) {
    this.$emit('visibleChange', val);
  }

  @Prop()
  extensionFormModel: any;

  @Prop()
  descriptorMap: any;

  @Prop()
  extensionPos: any;

  @Prop()
  prevDisabled: any;

  @Prop()
  nextDisabled: any;

  copy: any;

  @Watch('visible')
  visibleChange(value: boolean) {
    if (value) {
      this.copy = {
        form: this.extensionFormModel.form,
        word: this.extensionFormModel.word,
        extension: {
          ...this.extensionFormModel.extension,
        },
      };
    }
  }

  get inputDisabled() {
    return this.extensionFormModel.status === 'abstained' || this.extensionFormModel.form === 'inflection';
  }

  formOptions = FORM_OPTIONS;

  posOptions = [];

  dicBaseUrl = '';

  statusOptions = STATUS.map((s: string) => ({ label: s, value: s }));

  mounted() {
    const lang = this.$route.name || 'en';
    this.posOptions = LANG_POS_CASCADER_OPTIONS_MAP[lang];
    this.dicBaseUrl = LANG_DICTIONARY_MAP[lang];
  }

  formChange(form: string) {
    if (form === 'inflection') {
      this.extensionFormModel.status = 'edited';
      this.extensionFormModel.word = this.copy.word;
      this.extensionFormModel.extension = this.copy.extension;
    }
  }

  statusChange(status: string) {
    if (status === 'abstained') {
      this.extensionFormModel.word = this.copy.word;
      this.extensionFormModel.form = this.copy.form;
      this.extensionFormModel.extension = this.copy.extension;
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  flex: 1;
}
.item-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  .tip {
    text-align: left;
    font-size: 12px;
    color: #E6A23C;
  }
  .link {
    text-align: left;
    font-size: 12px;
  }
}
</style>
