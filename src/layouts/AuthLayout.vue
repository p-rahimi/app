<template>
  <!--begin::Authentication Layout -->
  <div class="d-flex flex-column flex-lg-row flex-column-fluid">
    <!--begin::Body-->
    <div
      class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
    >
      <!--begin::Form-->
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">
        <!--begin::Wrapper-->
        <div class="<?php echo $params['wrapperClass']?> p-10">
          <router-view></router-view>
        </div>
        <!--end::Wrapper-->
      </div>
      <!--end::Form-->

      <!--begin::Footer-->
      <div class="d-flex flex-center flex-wrap px-5 justify-content-between">
        <!-- beign:Change Langauge -->
        <el-dropdown trigger="click">
          <span class="menu-title position-relative px-5">
            <span
              class="fs-6 rounded bg-light px-5 py-3 translate-middle-y top-50 end-0"
            >
              <img
                class="w-15px h-15px rounded-1 ms-2 mx-2"
                :src="currentLangugeLocale.flag"
                alt="metronic"
              />
              {{ currentLangugeLocale.name }}
              <i class="bi bi-chevron-down"></i>
            </span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <ChangeLang @getCurrentLangugeLocale="getCurrentLangugeLocale" />
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- end:Change Langauge -->
        <!--begin::Links-->
        <div class="d-flex fw-semibold text-primary fs-base">
          <a href="#" class="px-5" target="_blank">Terms</a>

          <a href="#" class="px-5" target="_blank">Plans</a>

          <a href="#" class="px-5" target="_blank">Contact Us</a>
        </div>
        <!--end::Links-->
      </div>
      <!--end::Footer-->
    </div>
    <!--end::Body-->

    <!--begin::Aside-->
    <div
      class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
      style="background-image: url('/media/misc/auth-bg.png')"
    >
      <div
        class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
        v-if="$route.name === 'sign-in'"
      >
        <QrCode />
      </div>
      <!--begin::Content-->
      <div
        v-else
        class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
      >
        <!--begin::Logo-->
        <router-link to="/" class="mb-0 mb-lg-12">
          <img
            alt="Logo"
            src="/media/logos/custom-1.png"
            class="h-60px h-lg-75px"
          />
        </router-link>
        <!--end::Logo-->

        <!--begin::Image-->
        <img
          class="d-none d-lg-block mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
          src="/media/misc/auth-screens.png"
          alt=""
        />
        <!--end::Image-->

        <!--begin::Title-->
        <h1
          class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
        >
          Fast, Efficient and Productive
        </h1>
        <!--end::Title-->

        <!--begin::Text-->
        <div class="d-none d-lg-block text-white fs-base text-center">
          In this kind of post,
          <a href="#" class="opacity-75-hover text-warning fw-bold me-1"
            >the blogger</a
          >

          introduces a person they’ve interviewed <br />
          and provides some background information about

          <a href="#" class="opacity-75-hover text-warning fw-bold me-1"
            >the interviewee</a
          >
          and their <br />
          work following this is a transcript of the interview.
        </div>
        <!--end::Text-->
      </div>
      <!--end::Content-->
    </div>
    <!--end::Aside-->
  </div>
  <!--end::Authentication Layout -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import LayoutService from "@/core/services/LayoutService";
import { useBodyStore } from "@/stores/body";

import ChangeLang from "@/components/shared/ChangeLang.vue";
import QrCode from "@/components/qr-code/index.vue";

export default defineComponent({
  name: "auth-layout",
  components: { ChangeLang, QrCode },
  setup() {
    const store = useBodyStore();
    const currentLangugeLocale = ref({});

    onMounted(() => {
      LayoutService.emptyElementClassesAndAttributes(document.body);

      store.addBodyClassname("app-blank");
      store.addBodyClassname("bg-body");
    });
    function getCurrentLangugeLocale(payload) {
      currentLangugeLocale.value = payload;
    }
    return {
      getCurrentLangugeLocale,
      currentLangugeLocale,
    };
  },
});
</script>
