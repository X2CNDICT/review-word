<template>
  <section class="container">
    <section style="width: 60%">
      <section class="csv-action">
        <input
          type="file"
          hidden
          ref="file"
          @change="selectFile($event);$refs.file.value=null"
          accept=".xls,.xlsx,.csv"
        >
        <el-button @click="$refs.file.click()">
          import
          <i class="el-icon-upload2"></i>
        </el-button>
        <el-button type="primary" @click="exportXlsx">
          export
          <i class="el-icon-download"></i>
        </el-button>
        <span style="flex: 1"></span>
      </section>
      <el-table
        :data="tableData"
        :row-class-name="tableRowClassName"
        @row-click="rowClick"
        @filter-change="fliterChange"
      >
        <el-table-column
          prop="word"
          label="word"
          width="80">
        </el-table-column>
        <el-table-column
          prop="pos"
          label="pos"
          width="80"
          :filters="posFilters"
          filter-placement="bottom-end"
        >
        </el-table-column>
        <el-table-column
          prop="meaning"
          label="meaning"
          width="140"
        >
        </el-table-column>
        <el-table-column
          prop="checked"
          label="checked"
          :filters="[{ text: 'true', value: true },{ text: 'false', value: false }]"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-button
              :type="scope.row && scope.row.checked ? 'primary': 'default'"
              icon="el-icon-document-checked"
              circle
              size="mini"
              @click="handleCheck(scope.row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="variations"
          label="variations">
          <template slot-scope="scope">
            {{scope.row.variations}}
          </template>
        </el-table-column>
        <el-table-column
          prop="extension"
          label="extension">
          <template slot-scope="scope">
            {{scope.row.extension}}
          </template>
        </el-table-column>
        <el-table-column width="120" label="action">
           <template slot="header" slot-scope="_scope">
              <el-input
                v-model="searchWord"
                @input="searchWordChange"
                size="mini"
                placeholder="search word"/>
          </template>
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-document-copy"
              circle
              size="mini"
              @click="handleCopy(scope.$index, scope.row)">
            </el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="handleDelete(scope.$index)"
            ></el-button>
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
    <section
      style="width: 40%"
      v-if="data.word"
    >
      <section class="action">
        <el-button
          :disabled="currentIndex === 0"
          @click="prev"
        >prev</el-button>
        <div style="flex: 1"></div>
        <el-button
          :disabled="currentIndex === tableData.length - 1"
          type="primary"
          @click="next"
        >next</el-button>
      </section>
      <div v-if="!descriptorMap[data.pos]" style="color: red">unsupport pos</div>
      <dynamic-form
        v-if="descriptorMap[data.pos]"
        v-model="data"
        :descriptors="descriptorMap[data.pos]">
      </dynamic-form>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DynamicForm from 'vue-dynamic-form-component';
import descriptorMap from '@/config/en';
import xlsx from 'xlsx';
import { cloneDeep } from 'lodash';

@Component({
  components: {
    DynamicForm,
  },
})
export default class En extends Vue {
  totalData: any[] = [];

  tableData: any[] = [];

  fliterData: any[] = [];

  pageSize = 10;

  page = 1;

  descriptorMap = descriptorMap;

  currentIndex = 0;

  data = this.tableData[0] || {};

  fileName = '';

  searchWord = '';

  posFilters: {text: string; value: string}[] = [];

  fliter = {
    word: '',
    pos: [],
    checked: [],
  };

  prev() {
    this.currentIndex -= 1;
    this.data = this.tableData[this.currentIndex];
  }

  next() {
    this.currentIndex += 1;
    this.data = this.tableData[this.currentIndex];
  }

  rowClick(row: any, column: any) {
    if (column.label === 'action' || column.label === 'checked') return;
    this.currentIndex = this.tableData.findIndex((data) => data === row);
    this.data = row;
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
    if (key.includes('_column_2')) {
      this.fliter.pos = filters[key];
    }
    if (key.includes('_column_4')) {
      this.fliter.checked = filters[key];
    }
    this.doFliter();
  }

  searchWordChange() {
    this.fliter.word = this.searchWord;
    this.doFliter();
  }

  doFliter() {
    this.fliterData = this.totalData
      .filter((data) => {
        if (this.fliter.pos.length) {
          return (this.fliter.pos as any).includes(data.pos);
        }
        return true;
      })
      .filter((data) => {
        if (this.fliter.checked.length) {
          return (this.fliter.checked as any).includes(data.checked);
        }
        return true;
      })
      .filter((data) => {
        if (this.fliter.word) {
          return data.word.includes(this.fliter.word);
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
    while (i <= end && this.fliterData[i]) {
      array.push(this.fliterData[i]);
      i += 1;
    }
    return array;
  }

  handleCopy(index: number, row: any) {
    const startIndex = (this.page - 1) * this.pageSize;
    this.totalData.splice(startIndex + index, 0, cloneDeep(row));
    this.doFliter();
  }

  handleDelete(index: number) {
    const startIndex = (this.page - 1) * this.pageSize;
    this.totalData.splice(startIndex + index, 1);
    this.doFliter();
  }

  handleCheck(row: any) {
    // eslint-disable-next-line no-param-reassign
    row.checked = true;
  }

  selectFile(event: any) {
    const { files } = event.target;
    const f = files[0];
    const fileExtension = f.name.split('.').pop().toLowerCase();
    this.fileName = f.name.replace(`.${fileExtension}`, '');
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const workbook = xlsx.read(e.target.result, {
        type: 'binary',
      });
      const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = xlsx.utils.sheet_to_json(first_worksheet);
      this.totalData = json.map((item: any) => {
        let variations;
        let extension;
        try {
          variations = JSON.parse(item.variations);
          extension = JSON.parse(item.extension || item['extension ']);
        } catch {
        // empty
        }
        const word = {
          word: item.word,
          pos: item.dict_pos,
          meaning: item.meaning,
          variations: {
            original: '',
            formats: [],
            ...variations,
          },
          extension: extension || {},
          checked: false,
        };
        if (!this.posFilters.find((i) => i.value === item.dict_pos)) {
          this.posFilters.push({
            text: item.dict_pos,
            value: item.dict_pos,
          });
        }
        return word;
      });
      this.doFliter();
    };
    reader.readAsText(f);
  }

  exportXlsx() {
    const data = this.fliterData.map((item: any) => ({
      ...item,
      variations: JSON.stringify(item.variations),
      extension: JSON.stringify(item.extension),
    }));
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
</style>
