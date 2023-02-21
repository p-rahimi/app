<template>
  <div
    class="d-flex flex-column justify-content-center"
    style="position: relative"
  >
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
        :style="refreshQr ? 'opacity:0.25' : ''"
        style="width: 250px; height: 250px"
        class="mx-auto"
        alt="qr-code"
      />
      <div
        v-else
        class="absolute spinner-border text-light mx-auto my-5"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </section>

    <div class="mx-auto my-3 refresh-icon" v-if="refreshQr">
      <i
        class="bi bi-arrow-clockwise text-light cursor-pointer"
        @click="fetchQr"
      ></i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";

import Swal from "sweetalert2";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
interface QrCode {
  expired_at: String;
  token: String;
  url: String;
}
export default defineComponent({
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const qrCode = ref({} as QrCode);
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
        clearAllIntervals();

        // function to check the remaining time and stop the interval
        checkTimer();
        sendQrCodeInterval();
      }
    };
    // Timer for refresh QR code
    let interval = null as any;
    const refreshQr = ref(false);
    const checkTimer = () => {
      const startTime = new Date().getTime();
      const expireTime = qrCode.value.expired_at;
      interval = setInterval(function () {
        if (
          new Date().getTime() - startTime > // current time - start time = elapsed time
          new Date(expireTime as string).getTime() - startTime // expired time - start time = remaining time
        ) {
          clearAllIntervals(); //stop the interval
          refreshQr.value = true; //show refresh button
          return;
        }
      }, 1000);
    };

    // Submit QR Code
    const submitQrCode = async () => {
      const payload = {
        token: qrCode.value.token,
      };
      const res = await store.verifyQr(payload);
      if (res.succeed) {
        router.push({ name: "dashboard" });
      }
    };

    let intervalSendCode = null as any;
    const sendQrCodeInterval = () => {
      intervalSendCode = setInterval(function () {
        submitQrCode();
      }, 10000);
    };

    const clearAllIntervals = () => {
      clearInterval(interval);
      clearInterval(intervalSendCode);
    };
    onUnmounted(() => {
      clearAllIntervals();
    });

    return {
      qrCode,
      refreshQr,
      fetchQr,
      loading,
    };
  },
});
</script>
<style lang="scss">
.refresh-icon {
  position: absolute;
  left: 35%;
  top: 46%;
  i {
    font-size: 6rem;
  }
}
</style>
