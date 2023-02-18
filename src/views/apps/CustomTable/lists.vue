<template>
  <div class="">
    <section class="my-5">
      <FilterBox @showFieldDialog="dialogVisible = true" />
    </section>
    <el-table
      :key="defaultFields.length"
      :data="filterTableData"
      :border="false"
      class="rounded-md shadow-sm custom-table rounded-4 mt-4"
      cell-class-name="py-5 "
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'createdDate', order: 'descending' }"
      style="width: 100%"
      :flexible="true"
      stripe
    >
      <el-table-column type="expand">
        <template #default="props">
          <div class="p-4">
            <p m="t-0 b-2">customer: {{ props.row.customer }}</p>
            <p m="t-0 b-2">billing: {{ props.row.billing }}</p>
            <p m="t-0 b-2">product: {{ props.row.product }}</p>
            <p m="t-0 b-2">
              createdDate:
              {{ moment(props.row.createdDate).format("DD/MM/YYYY") }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55" />
      <el-table-column
        sortable
        label="ID"
        v-if="defaultFields.includes('id')"
        prop="id"
      >
        <template #default="{ row }">
          {{ row.id }}
        </template>
      </el-table-column>
      <el-table-column
        sortable
        label="CUSTOMER"
        v-if="defaultFields.includes('customer')"
        prop="customer"
      >
        <template #default="{ row }">
          <editable-cell
            :show-input="row.edit"
            :value="row.customer"
            @input="(val) => (row.customer = val)"
          >
            <template #content>{{ row.customer }}</template>
          </editable-cell>
        </template>
      </el-table-column>

      <el-table-column
        v-if="defaultFields.includes('status')"
        sortable
        label="STATUS"
        prop="status"
      >
        <template #default="{ row }">
          <editable-cell
            :show-input="row.editMode"
            editable-component="el-select"
            close-event="change"
            :value="row.status"
            @input="(val) => (row.status = val)"
          >
            <template #content>
              <div :class="`badge badge-light-${row.color}`">
                {{ row.status }}
              </div>
            </template>

            <template #edit-component-slot>
              <el-option value="Active" label="Active"></el-option>
              <el-option value="Expiring" label="Expiring"></el-option>
              <el-option value="Suspended" label="Suspended"></el-option>
            </template>
          </editable-cell>
        </template>
      </el-table-column>
      <el-table-column
        label="BILLING"
        prop="billing"
        v-if="defaultFields.includes('billing')"
      />
      <el-table-column
        label="PRODUCT"
        prop="product"
        v-if="defaultFields.includes('product')"
      />
      <el-table-column
        sortable
        label="CREATEDDATE"
        prop="createdDate"
        v-if="defaultFields.includes('createdDate')"
      >
        <template #default="{ row }">
          <editable-cell
            :show-input="row.editMode"
            editable-component="el-date-picker"
            :value="row.createdDate"
            @input="(val) => (row.createdDate = val)"
          >
            <template #content>{{
              moment(row.createdDate).format("DD/MM/YYYY")
            }}</template>
          </editable-cell>
        </template>
      </el-table-column>
      <el-table-column align="right" min-width="120px">
        <template #header>
          <el-input
            v-model="search"
            size="small"
            placeholder="Type to search"
          />
        </template>
        <template #default="scope">
          <el-button type="success" size="small"> Confirm</el-button>
          <router-link
            class="el-button el-button--primary el-button--small"
            :to="{
              name: 'apps-custom-table-lists-edit',
              params: { id: scope.row.id },
            }"
          >
            Edit
          </router-link>
          <el-popconfirm title="Are you sure to delete this?" width="250">
            <template #reference>
              <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
              >
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <section class="my-5 d-flex justify-content-center">
      <el-pagination
        class="p-3 rounded-4 shadow-sm"
        :class="themeMode === 'light' ? 'bg-white' : 'bg-gray-300'"
        background
        layout="prev, pager, next"
        :total="data.length"
      />
    </section>

    <el-dialog v-model="dialogVisible" title="Select Fields" width="40%">
      <template class="d-flex flex-row flex-wrap">
        <div
          v-for="(field, index) in allFields"
          :key="index"
          class="col-3 py-3 mx-4"
        >
          <el-checkbox
            :model-value="defaultFields.includes(field) ? true : false"
            class="w-100"
            :label="field"
            border
            @change="checkChange"
          />
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, reactive } from "vue";
import EditableCell from "@/components/el-table/EditableCell.vue";
import FilterBox from "@/components/el-table/FilterBox.vue";
import moment from "moment";
import { themeMode } from "@/core/helpers/config";

const dialogVisible = ref(false);

const multipleSelection = ref([]);

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const search = ref("");
const filterTableData = computed(() =>
  //@ts-ignore
  data.value.filter(
    (data) =>
      !search.value ||
      data.customer.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row) => {
  console.log(index, row);
};
const handleDelete = (index: number, row) => {
  console.log(index, row);
};
function cancelEdit(row) {
  row.title = row.originalTitle;
  row.edit = false;
}
function confirmEdit(row) {
  row.edit = false;
  row.originalTitle = row.title;
}
let defaultFields = ref<string[]>([
  "customer",
  "status",
  "billing",
  "createdDate",
]);
let allFields = ref<string[]>([
  "customer",
  "status",
  "billing",
  "createdDate",
  "id",
  "product",
]);
onMounted(() => {
  if (localStorage.getItem("custom-table-fields")) {
    defaultFields.value = JSON.parse(
      //@ts-ignore
      localStorage.getItem("custom-table-fields")
    );
  } else {
    //@ts-ignore
    setLocalStorage();
  }
});
function checkChange(status, { target: { value } }) {
  if (status) {
    //@ts-ignore
    defaultFields.value.push(value);
    setLocalStorage();
  } else {
    const findField = defaultFields.value.indexOf(value);
    defaultFields.value.splice(findField, 1);
    setLocalStorage();
  }
}
function setLocalStorage() {
  localStorage.setItem(
    "custom-table-fields",
    JSON.stringify(defaultFields.value)
  );
}
const data = ref([
  {
    id: 1,
    customer: "Emma Smith",
    status: "Active",
    color: "success",
    billing: "Auto-debit",
    product: "Basic",
    createdDate: "Oct 25, 2021",
  },
  {
    id: 2,
    customer: "Melody Macy",
    status: "Active",
    color: "success",
    billing: "Manual - Credit Card",
    product: "Basic",
    createdDate: "Mar 10, 2021",
  },
  {
    id: 3,
    customer: "Max Smith",
    status: "Active",
    color: "primary",
    billing: "Manual - Cash",
    product: "Teams Bundle",
    createdDate: "Jul 25, 2021",
  },
  {
    id: 4,
    customer: "Sean Bean",
    status: "Expiring",
    color: "warning",
    billing: "Manual - Paypal",
    product: "Enterprise",
    createdDate: "Aug 19, 2021",
  },
  {
    id: 5,
    customer: "Brian Cox",
    status: "Expiring",
    color: "warning",
    billing: "Auto-debit",
    product: "Basic",
    createdDate: "May 05, 2021",
  },
  {
    id: 6,
    customer: "Mikaela Collins",
    status: "Active",
    color: "success",
    billing: "Auto-debit",
    product: "Enterprise Bundle",
    createdDate: "Aug 19, 2021",
  },
  {
    id: 7,
    customer: "Francis Mitcham",
    status: "Active",
    color: "success",
    billing: "Auto-debit",
    product: "Teams",
    createdDate: "Jun 20, 2021",
  },
  {
    id: 8,
    customer: "Olivia Wild",
    status: "Suspended",
    color: "danger",
    billing: "--",
    product: "Enterprise",
    createdDate: "Jun 24, 2021",
  },
  {
    id: 9,
    customer: "Neil Owen",
    status: "Expiring",
    color: "warning",
    billing: "Auto-debit",
    product: "Basic",
    createdDate: "Aug 19, 2021",
  },
  {
    id: 10,
    customer: "Dan Wilson",
    status: "Active",
    color: "success",
    billing: "Auto-debit",
    product: "Enterprise Bundle",
    createdDate: "Feb 21, 2021",
  },
  {
    id: 11,
    customer: "Emma Bold",
    status: "Active",
    color: "success",
    billing: "Manual - Credit Card",
    product: "Enterprise",
    createdDate: "May 05, 2021",
  },
  {
    id: 12,
    customer: "Ana Crown",
    status: "Active",
    color: "success",
    billing: "Manual - Credit Card",
    product: "Basic",
    createdDate: "Jun 24, 2021",
  },
  {
    id: 13,
    customer: "Robert Doe",
    status: "Suspended",
    color: "danger",
    billing: "--",
    product: "Teams Bundle",
    createdDate: "Jul 25, 2021",
  },
  {
    id: 14,
    customer: "John Miller",
    status: "Active",
    color: "success",
    billing: "Manual - Paypal",
    product: "Enterprise",
    createdDate: "Sep 22, 2021",
  },
  {
    id: 15,
    customer: "Lucy Kunic",
    status: "Active",
    color: "success",
    billing: "Manual - Credit Card",
    product: "Basic",
    createdDate: "Nov 10, 2021",
  },
  {
    id: 16,
    customer: "Neil Owen",
    status: "Suspended",
    color: "danger",
    billing: "--",
    product: "Basic Bundle",
    createdDate: "Jun 20, 2021",
  },
  {
    id: 17,
    customer: "Dan Wilson",
    status: "Expiring",
    color: "warning",
    billing: "Manual - Paypal",
    product: "Enterprise",
    createdDate: "May 05, 2021",
  },
  {
    id: 18,
    customer: "Emma Smith",
    status: "Active",
    color: "success",
    billing: "Auto-debit",
    product: "Teams",
    createdDate: "Apr 15, 2021",
  },
  {
    id: 19,
    customer: "Melody Macy",
    status: "Active",
    color: "success",
    billing: "Manual - Credit Card",
    product: "Basic",
    createdDate: "Oct 25, 2021",
  },
  {
    id: 20,
    customer: "Max Smith",
    status: "Suspended",
    color: "danger",
    billing: "--",
    product: "Basic Bundle",
    createdDate: "Feb 21, 2021",
  },
]);
</script>
<style lang="scss">
.editable-input {
  border: 0 !important;
}
</style>
