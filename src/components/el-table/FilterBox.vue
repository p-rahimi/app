<template>
  <div
    :class="themeMode === 'light' ? 'bg-white' : ''"
    class="filter-box py-3 border border-gray-200 my-2 px-1 rounded-4 shadow-sm"
  >
    <el-collapse accordion class="border-0">
      <el-collapse-item name="1" class="filter-box-collapse">
        <template v-slot:title>
          <div class="text-dark size-xs font-weight-bold">
            <span>
              <i class="bi bi-filter text-dark"></i>
            </span>
            <span class=""> Smart filter </span>
          </div>
        </template>
        <el-form
          class="d-flex flex-row align-items-center justify-content-between my-3 px-2"
          @submit.prevent="setFilter"
        >
          <div v-if="searchFields" class="d-flex flex-column w-50 mr-1">
            <p class="mb-0 size-xs text-gray-600 font-weight-bold">
              Sample Filter
            </p>

            <el-input
              v-model="filter.search"
              :placeholder="`Search ${searchFields.replaceAll('|', ',')}`"
            />
          </div>

          <div class="mx-1">
            <p class="mb-0 size-xs text-gray-600 font-weight-bold">
              Sample Filter
            </p>
            <el-select v-model="filter.sort" placeholder="Sort">
              <el-option
                v-for="item in sortOptions"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </div>
          <div
            v-for="(item, index) in filter.booleans"
            :key="index"
            class="mx-1"
          >
            <p class="mb-0 size-xs text-gray-600 font-weight-bold">
              {{ item.label }}
            </p>
            <el-select v-model="item.value" :placeholder="item.name">
              <el-option
                v-for="option in booleanFilterOptions"
                :key="option.value"
                :label="option.name"
                :value="option.value"
              />
            </el-select>
          </div>

          <div class="mx-1">
            <p class="mb-0 size-xs text-gray-600 font-weight-bold">
              Sample Filter
            </p>
            <el-select v-model="filter.pageSize" placeholder="Page Size">
              <el-option
                v-for="item in pageSizeOptions"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </div>
          <div class="mx-1">
            <el-button
              type="primary"
              native-type="submit"
              class="border-0 mt-6 px-4 half-border-radius"
              @click="$emit('showFieldDialog')"
            >
              Fields
            </el-button>
          </div>
          <div>
            <el-button
              type="primary"
              native-type="submit"
              class="border-0 mt-6 px-4 half-border-radius"
            >
              <i class="bi bi-search text-white"></i>
            </el-button>
          </div>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import { themeMode } from "@/core/helpers/config";
export default {
  name: "FilterBox",
  props: {
    booleansList: {
      type: Array,
      required: false,
      default: () => [],
    },
    searchFields: {
      type: String,
      default: "code|email|mobileNumber",
      required: false,
    },
    sortField: {
      type: String,
      default: "createdAt",
      required: false,
    },
  },
  data() {
    return {
      filter: {
        search: null,
        booleans: this.booleansList,
        sort: "-",
        pageSize: 25,
      },
      booleanFilterOptions: [
        { name: "All", value: null },
        { name: "Active", value: true },
        { name: "Not Active", value: "false|undefined" },
      ],
      sortOptions: [
        { name: "Descending", value: "-" },
        { name: "Aescending", value: "" },
      ],
      pageSizeOptions: [10, 25, 50, 100],
    };
  },
  methods: {
    setFilter() {
      let query = "";
      query += `?sort=${this.filter.sort}${this.sortField}`;
      if (this.filter.search) {
        query += `&filter[${this.searchFields}]="${this.filter.search}"`;
      }
      this.filter.booleans.forEach((item) => {
        if (item.value !== null) {
          query += `&filter[${item.name}]=${item.value}`;
        }
      });
      query.replace(/\s/g, "");
      this.$emit("filters", { payload: query, pageSize: this.filter.pageSize });
    },
  },
  setup() {
    return {
      themeMode,
    };
  },
};
</script>
<style lang="scss">
.filter-box-collapse {
  .el-collapse-item__wrap {
    border-bottom: unset;
  }
  .el-collapse-item__header {
    margin: 10px auto;
    border: 0;
    padding: 10px;

    .el-collapse-item__arrow {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
