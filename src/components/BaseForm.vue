<template>
  <el-dialog
    width="700px"
    title="编辑/审查单词"
    :visible.sync="dialogVisible"
    custom-class="baseForm"
  >
    <el-form
      :model="baseFormModel"
      ref="baseForm"
      label-width="100px"
    >
      <el-form-item
        prop="form"
        label="form"
      >
        <el-select
          v-model="baseFormModel.form"
          @change="formChange($event)"
          :disabled="baseFormModel.status === 'abstained'"
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
          <el-select v-model="baseFormModel.status" @change="statusChange">
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
          <el-input v-model="baseFormModel.word" :disabled="inputDisabled"></el-input>
          <div class="link">
            关于专业解释，参考
            <el-link
              :href="'https://dictionary.cambridge.org/dictionary/english-chinese-simplified/'+baseFormModel.word"
              type="primary"
              target="_blank"
              :underline="false"
            >Cambridge</el-link>
          </div>
        </div>
      </el-form-item>
      <section
        class="explanation"
        v-for="(item, index) in baseFormModel.explanation"
        :key="index"
      >
        <section class="form">
          <el-form-item
            :prop="'explanation.' + index + '.pos'"
            label="pos"
          >
            <el-cascader
              v-model="item.pos"
              :options="posOptions"
              :props="{ expandTrigger: 'hover' }"
              :disabled="inputDisabled"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            :prop="'explanation.' + index + '.meaning'"
            label="meaning"
          >
            <el-input v-model="item.meaning" :disabled="inputDisabled"></el-input>
          </el-form-item>
          </section>
        <el-button
          class="delete"
          size="mini"
          icon="el-icon-delete"
          circle
          type="danger"
          @click="deleteExplanation(index)"
          :disabled="inputDisabled"
        ></el-button>
      </section>
      <section class="add-explanation">
        <el-button
          icon="el-icon-plus"
          type="primary"
          plain
          @click="addExplanation"
          :disabled="inputDisabled"
        >
          添加词义
        </el-button>
      </section>
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
import { FORM_OPTIONS, POS_CASCADER_OPTIONS, STATUS } from '@/consts';
import { cloneDeep } from 'lodash';

@Component
export default class BaseFrom extends Vue {
  @Prop()
  visible!: boolean;

  @Prop()
  baseFormModel: any;

  @Prop()
  prevDisabled: any;

  @Prop()
  nextDisabled: any;

  copy: any;

  get dialogVisible() {
    return this.visible;
  }

  set dialogVisible(val) {
    this.$emit('visibleChange', val);
  }

  get inputDisabled() {
    return this.baseFormModel.status === 'abstained' || this.baseFormModel.form === 'inflection';
  }

  @Watch('visible')
  visibleChange(value: boolean) {
    if (value) {
      this.copy = {
        form: this.baseFormModel.form,
        word: this.baseFormModel.word,
        explanation: cloneDeep(this.baseFormModel.explanation),
      };
    }
  }

  formOptions = FORM_OPTIONS;

  posOptions = POS_CASCADER_OPTIONS;

  statusOptions = STATUS.map((s: string) => ({ label: s, value: s }));

  formChange(form: string) {
    if (form === 'inflection') {
      this.baseFormModel.status = 'edited';
      this.baseFormModel.word = this.copy.word;
      this.baseFormModel.explanation = cloneDeep(this.copy.explanation);
    }
  }

  statusChange(status: string) {
    if (status === 'abstained') {
      this.baseFormModel.word = this.copy.word;
      this.baseFormModel.form = this.copy.form;
      this.baseFormModel.explanation = cloneDeep(this.copy.explanation);
    }
  }

  addExplanation() {
    this.baseFormModel.explanation.push({
      pos: '',
      meaning: '',
    });
  }

  deleteExplanation(index: number) {
    this.baseFormModel.explanation.splice(index, 1);
  }
}
</script>

<style lang="scss" scoped>
.el-cascader,
.el-select {
  flex: 1;
}
.explanation {
  display: flex;
  align-items: center;
  padding: 12px 12px 12px 0;
  background: #F7F8FA;
  .form {
    flex: 1;
  }
  .delete {
    position: absolute;
    right: 0;
    margin-right: 15px;
  }
  & + & {
    margin-top: 8px;
  }
}
.add-explanation {
  text-align: left;
  margin-top: 16px;
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
