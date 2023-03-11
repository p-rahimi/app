<template>
    <div class="">
        <section class="my-5">
            <FilterBox @showFieldDialog="dialogVisible = true" />
        </section>
        <el-table :key="defaultFields.length" :data="filterTableData" :border="false"
            class="rounded-md shadow-sm custom-table rounded-4 mt-4" cell-class-name="py-5"
            @selection-change="handleSelectionChange" style="width: 100%" :flexible="true" stripe>

            <!-- Selection Checkbox -->
            <el-table-column type="selection" width="55" />

            <!-- More Data Dropdown -->
            <el-table-column type="expand">
                <template #default="props">
                    <div class="p-4">
                        <p v-for="expandItem, expandIndex in props.row">
                            {{ expandIndex }} : {{ expandItem }}
                        </p>
                    </div>
                </template>
            </el-table-column>

            <!-- Simple Fields -->
            <el-table-column v-if="defaultFields.includes('name')" label="Name" prop="name" />
            <el-table-column v-if="defaultFields.includes('broker')" label="Broker" prop="broker" />
            <el-table-column v-if="defaultFields.includes('company')" label="Company" prop="company" />
            <el-table-column v-if="defaultFields.includes('trader_mode')" label="Trader Mode" prop="trader_mode" />
            <el-table-column v-if="defaultFields.includes('margin_type')" label="Margin Type" prop="margin_type" />

            <!-- Search Input -->
            <el-table-column align="right" min-width="120px">
                <template #header>
                    <el-input v-model="search" size="small" placeholder="Type to search" />
                </template>
                <template #default="scope">
                    <el-button type="success" size="small"> Confirm</el-button>
                    <router-link class="el-button el-button--primary el-button--small" to="/">
                        Edit
                    </router-link>
                    <el-popconfirm title="Are you sure to delete this?" width="250">
                        <template #reference>
                            <el-button size="small" type="danger"
                                @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <!-- Pagination -->
        <section class="my-5 d-flex justify-content-center">
            <el-pagination class="p-3 rounded-4 shadow-sm" :class="themeMode === 'light' ? 'bg-white' : 'bg-gray-300'"
                background layout="prev, pager, next" :total="data.length" />
        </section>

        <!-- Custom Field Filter -->
        <el-dialog v-model="dialogVisible" title="Select Fields" width="40%">
            <template class="d-flex flex-row flex-wrap">
                <div v-for="(field, index) in allFields" :key="index" class="col-3 py-3 mx-4">
                    <el-checkbox :model-value="defaultFields.includes(field) ? true : false" class="w-100" :label="field"
                        border @change="checkChangeEvent" />
                </div>
            </template>
        </el-dialog>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, computed } from "vue";
import FilterBox from "@/components/el-table/FilterBox.vue";
import { themeMode } from "@/core/helpers/config";
import { useLocalStorageFields } from "@/components/el-table/localStorageFields";
import { useTradingAccountStore, type TradingAccount } from "@/stores/TradingAccounts";

const dialogVisible = ref(false);
const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
    multipleSelection.value = val;
};

// client side search
const search = ref("");
const filterTableData = computed(() =>
    //@ts-ignore
    data.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
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

// handel local storage fields
const { allFields, defaultFields, localName, checkChange } =
    useLocalStorageFields();
// local storage name
localName.value = "trading-accounts-field";
// default fields
defaultFields.value = ["name", "broker", "company", "trade_mode", "margin_type"];
// all fields
allFields.value = [...defaultFields.value,];
// check change
const checkChangeEvent = (status, { target: { value } }) => {
    checkChange(status, value);
};

// mock data
// const data = ref([
//     {
//         id: 1,
//         customer: "Emma Smith",
//         status: "Active",
//         color: "success",
//     },
//     {
//         id: 2,
//         customer: "Melody Macy",
//         status: "Active",
//         color: "success",
//     },
//     {
//         id: 3,
//         customer: "Max Smith",
//         status: "Active",
//         color: "primary",
//     },
// ]);


// Api and Server Data
const store = useTradingAccountStore()
const data = ref<TradingAccount[]>([] as TradingAccount[])

// Get all Data
store.fetchAccount().then(res => {
    data.value = res.results
})
</script>
<style lang="scss">
.editable-input {
    border: 0 !important;
}
</style>