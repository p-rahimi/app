<template>
  <div class="d-flex flex-column justify-content-center">
    <!--begin::Heading-->
    <div class="text-center mb-10">
      <!--begin::Title-->
      <h1 class="text-dark mb-3">Sign In With QR Code</h1>
      <!--end::Title-->
    </div>
    <!--begin::Heading-->
    <section class="d-flex justify-content-center">
      <!-- /media/trader4/sample-qr.png -->
      <img
        v-if="!loading"
        :src="qrCode.url"
        style="width: 250px; height: 250px"
        class="mx-auto"
        alt="qr-code"
      />
      <div v-else class="spinner-border text-light mx-auto my-5" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </section>

    <div class="mx-auto my-3" v-if="refreshQr">
      <i
        class="bi bi-arrow-clockwise text-light fs-1 cursor-pointer"
        @click="fetchQr"
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Swal from "sweetalert2";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import moment from "moment";

export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const qrCode = ref({});
    const loading = ref(false);

    // Fetch QR Code on mounted
    onMounted(() => {
      fetchQr();
      clearInterval(interval);
    });

    // Fetch QR Code
    const fetchQr = async () => {
      refreshQr.value = false;
      loading.value = true;
      // Send login request
      const res = await store.fetchQr();
      loading.value = false;
      const error = Object.values(store.errors);

      if (error.length) {
        Swal.fire({
          text: error[0] as string,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
          store.errors = {};
        });
      }
      if (res.succeed) {
        qrCode.value = res.results;
        clearInterval(interval);

        checkTimer();
      }
    };

    // Timer for refresh QR code

    let interval = null as any;
    const refreshQr = ref(false);
    const checkTimer = () => {
      const startTime = new Date().getTime();
      interval = setInterval(function () {
        if (new Date().getTime() - startTime > 10000) {
          clearInterval(interval); //stop the interval
          refreshQr.value = true; //show refresh button
          console.log("refresh");
          return;
        }
        console.log("check");
      }, 1000);
    };

    return {
      qrCode,
      refreshQr,
      fetchQr,
      loading,
    };
  },
});
</script>
