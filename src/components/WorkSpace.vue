/* eslint-disable no-param-reassign */
<template>
  <section class="container">
    <section style="width: 100%">
      <section class="csv-action">
        <input
          type="file"
          hidden
          ref="fileBase"
          @change="selectFile($event, 'base');$refs.fileBase.value=null"
          accept=".xls,.xlsx,.csv"
        >
        <input
          type="file"
          hidden
          ref="fileExtension"
          @change="selectFile($event, 'extension');$refs.fileExtension.value=null"
          accept=".xls,.xlsx,.csv"
        >
        <el-button @click="$refs.fileBase.click()" icon="el-icon-upload2">
          上传释义文件
        </el-button>
        <el-button @click="$refs.fileExtension.click()" icon="el-icon-upload2">
          上传变化文件
        </el-button>
        <el-input
          v-model="searchWord"
          placeholder="搜索单词"
          @keyup.enter.native="doFliter"
          class="search"
        ></el-input>
        <span style="flex: 1"></span>
        <el-button icon="el-icon-download" @click="exportXlsx">
          导出文件
        </el-button>
      </section>
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        @filter-change="fliterChange"
      >
        <el-table-column
          width="50">
          <template slot-scope="scope">
            {{ scope.row.index }}
          </template>
        </el-table-column>
        <el-table-column
          prop="form"
          label="form">
          <template slot-scope="scope">
            <el-select
              size="small"
              v-model="scope.row.form"
              @change="formChange($event, scope.row)"
            >
              <el-option
                v-for="item in formOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="word"
          label="word">
        </el-table-column>
        <el-table-column
          prop="status"
          label="status"
          :filters="statusFilters"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              size="small"
              :type="getTagType(scope.row.status)"
            >
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" v-if="fliterData.length">
        <span style="flex: 1"></span>
        <el-pagination
          layout="prev, pager, next"
          @current-change="pageChange"
          :total="fliterData.length">
        </el-pagination>
      </div>
    </section>
    <section>
      <base-form
        v-if="fileType=='base'"
        :visible="dialogVisible"
        @visibleChange="dialogVisible = $event"
        :baseFormModel="data"
      ></base-form>
      <extension-form
        v-if="fileType=='extension'"
        :visible="dialogVisible"
        @visibleChange="dialogVisible = $event"
        :extensionFormModel="data"
        :extensionPos="extensionPos"
        :descriptorMap="descriptorMap"
      ></extension-form>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import xlsx from 'xlsx';
import { FILE_EXTENSION_POS_MAP, FORM_OPTIONS, STATUS } from '@/consts';
import BaseForm from '@/components/BaseForm.vue';
import ExtensionForm from '@/components/ExtensionForm.vue';
import {
  baseModelToResource, baseResourceToModel, extensionModelToResource, extensionResourceToModel,
} from '@/utils';

@Component({
  components: {
    BaseForm,
    ExtensionForm,
  },
})
export default class WorkSpace extends Vue {
  totalData: any[] = [];

  tableData: any[] = [];

  fliterData: any[] = [];

  pageSize = 10;

  page = 1;

  currentIndex = 0;

  data = this.tableData[0] || {};

  fileName = '';

  searchWord = '';

  extensionPos = '';

  fileType = '';

  formOptions = FORM_OPTIONS;

  statusFilters = STATUS.map((s: string) => ({ text: s, value: s }));

  fliter = {
    word: '',
    status: [],
  };

  dialogVisible = false;

  @Prop()
  descriptorMap: any;

  getTagType(status: string) {
    switch (status) {
      case 'init':
        return 'info';
      case 'abstained':
        return 'warning';
      case 'edited':
        return '';
      default:
        return '';
    }
  }

  rowClick(row: any, column: any) {
    if (column.label === 'action' || column.label === 'checked') return;
    this.currentIndex = this.tableData.findIndex((data) => data === row);
    this.data = row;
    this.dialogVisible = true;
  }

  formChange(form: string, row: any) {
    if (form === 'inflection') {
      // eslint-disable-next-line no-param-reassign
      row.status = 'edited';
    }
  }

  tableRowClassName({ rowIndex }: { rowIndex: number }) {
    return rowIndex === this.currentIndex ? 'current-row' : '';
  }

  pageChange(page: number) {
    this.page = page;
    const currentIndex = (page - 1) * this.pageSize;
    this.tableData = this.getTableData(currentIndex, page * this.pageSize);
  }

  fliterChange(filters: any) {
    const key = Object.keys(filters)[0];
    if (key.includes('_column_4')) {
      this.fliter.status = filters[key];
    }
    this.doFliter();
  }

  doFliter() {
    this.fliterData = this.totalData
      .filter((data) => {
        if (this.fliter.status.length) {
          return (this.fliter.status as any).includes(data.status);
        }
        return true;
      })
      .filter((data) => {
        if (this.searchWord) {
          return data.word.includes(this.searchWord);
        }
        return true;
      });
    this.page = 1;
    const startIndex = (this.page - 1) * this.pageSize;
    this.tableData = this.getTableData(startIndex, this.page * this.pageSize);
  }

  getTableData(start: number, end: number) {
    let i = start;
    const array = [];
    while (i < end && this.fliterData[i]) {
      array.push(this.fliterData[i]);
      i += 1;
    }
    return array;
  }

  selectFile(event: any, type: string) {
    const { files } = event.target;
    const f = files[0];
    const fileExtension = f.name.split('.').pop().toLowerCase();
    this.fileName = f.name.replace(`.${fileExtension}`, '');
    const isCSV = f.name.split('.').reverse()[0] === 'csv';// 判断是否是 CSV
    const reader = new FileReader();
    if (type === 'base' && !this.fileName.includes('base')) {
      this.$message.error('请上传释义文件 base.csv');
      return;
    }
    if (type === 'extension' && !this.fileName.includes('extension')) {
      this.$message.error('请上传释义文件 xxx_extension.csv');
      return;
    }
    this.fileType = type;
    if (type === 'extension') {
      // eslint-disable-next-line prefer-destructuring
      const pos = this.fileName.split('_')[0];
      this.extensionPos = FILE_EXTENSION_POS_MAP[pos];
    }
    reader.onload = (e: any) => {
      const workbook = xlsx.read(e.target.result, {
        type: 'binary',
      });
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = xlsx.utils.sheet_to_json(first_worksheet);
      this.totalData = json.map((item: any, index: number) => {
        let d;
        if (this.fileType === 'base') {
          d = baseResourceToModel(item, index);
        }
        if (this.fileType === 'extension') {
          d = extensionResourceToModel(item, index);
        }
        return d;
      });
      this.doFliter();
    };
    if (isCSV) {
      reader.readAsText(f);
    } else {
      reader.readAsBinaryString(f);
    }
  }

  exportXlsx() {
    const data = this.fliterData.map((item: any) => {
      let d;
      if (this.fileType === 'base') {
        d = baseModelToResource(item);
      }
      if (this.fileType === 'extension') {
        d = extensionModelToResource(item);
      }
      return d;
    });
    /* make the worksheet */
    const ws = xlsx.utils.json_to_sheet(data);

    /* add to workbook */
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'review');

    /* generate an XLSX file */
    xlsx.writeFile(wb, `${this.fileName}-done.xlsx`);
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
}
.action {
  display: flex;
  padding: 0 60px 20px;
}
.csv-action {
  display: flex;
  padding: 0 0 20px;
  .search {
    width: 178px;
    margin-left: 10px;
  }
}
.el-table .current-row {
  background: #f0f9eb;
}
.pagination {
  display: flex;
}
.checked {
  color: #409EFF;
}
.extension {
  max-height: 100px;
}
</style>
