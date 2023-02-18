<template>
  <div class="mb-4">
    <section>
      <!--begin::Heading-->
      <div class="d-flex flex-stack fw-semobold mb-4">
        <!--begin::Label-->
        <span class="text-muted fs-6 me-2">Recently Searched</span>
        <!--end::Label-->
      </div>
      <!--end::Heading-->
      <!--begin::Items-->
      <div class="scroll-y mh-200px mh-lg-325px">
        <!--begin::Item-->
        <div class="d-flex align-items-center mb-5">
          <!--begin::Symbol-->
          <div class="symbol symbol-40px symbol-circle me-4">
            <span class="symbol-label bg-light">
              <span class="svg-icon svg-icon-2 svg-icon-primary">
                <inline-svg src="/media/icons/duotune/electronics/elc004.svg" />
              </span>
            </span>
          </div>
          <!--end::Symbol-->
          <!--begin::Title-->
          <div class="d-flex flex-column">
            <a
              href="#"
              class="fs-6 text-gray-800 text-hover-primary fw-semobold"
              >BoomApp by Keenthemes</a
            >
            <p class="text-gray-500">
              Define and launch AWS resources in a logically isola
            </p>
            <div class="">
              <button
                type="button"
                class="btn btn-sm btn-light border text-primary border-gray-300 py-1"
              >
                Pricing
              </button>
              <button
                type="button"
                class="btn btn-sm btn-light border text-primary border-gray-300 py-1 mx-2"
              >
                Documentation
              </button>
              <button
                type="button"
                class="btn btn-sm btn-light border text-primary border-gray-300 py-1"
              >
                Calculator
              </button>
            </div>
          </div>
          <!--end::Title-->
        </div>
      </div>
      <!--end::Items-->
    </section>
    <section class="border-top py-3">
      <!--begin::Heading-->
      <div class="d-flex flex-stack fw-semobold mb-4">
        <!--begin::Label-->
        <span class="text-muted fs-6 me-2">Related Pages</span>
        <!--end::Label-->
      </div>
      <!--end::Heading-->
      <!--begin::Items-->
      <div class="scroll-y mh-200px mh-lg-325px px-2">
        <h6 class="text-primary cursor-pointer">Compute</h6>
        <h6 class="text-primary cursor-pointer">Getting Started</h6>
      </div>
      <!--end::Items-->
    </section>
    <section class="border-top py-3">
      <!--begin::Heading-->
      <div class="d-flex flex-stack fw-semobold mb-4">
        <!--begin::Label-->
        <span class="text-muted fs-6 me-2">Tutorials</span>
        <!--end::Label-->
      </div>
      <!--end::Heading-->
      <!--begin::Items-->
      <div class="scroll-y mh-200px mh-lg-325px px-2">
        <h6 class="text-primary cursor-pointer">
          Host a Static Website with S3
        </h6>
        <h6 class="text-primary cursor-pointer">
          Launch a WordPress Website with EC2
        </h6>
      </div>
      <!--end::Items-->
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-main",
  components: {},
});
</script>
