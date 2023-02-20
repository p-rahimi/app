<template>
  <div class="d-flex flex-column justify-content-center">
    <!--begin::Heading-->
    <div class="text-center mb-10">
      <!--begin::Title-->
      <h1 class="text-dark mb-3">Sign In With QR Code</h1>
      <!--end::Title-->
    </div>
    <!--begin::Heading-->
    <img
      v-if="!loading"
      :src="qrCode.url"
      class="mx-auto"
      width="250"
      height="250"
      alt="qr-code"
    />
    <div v-else class="spinner-border text-light mx-auto my-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div class="mx-auto" v-if="refreshQr">
      <i
        class="bi bi-arrow-clockwise text-light fs-1 cursor-pointer"
        @click="fetchQr"
      ></i>
    </div>
    <div>
      <!--begin::Form-->
      <VForm
        class="form w-100"
        id="kt_login_signin_form"
        @submit="onSubmitLogin"
        :validation-schema="login"
        :initial-values="{}"
      >
        <!--begin::Input group-->
        <div class="fv-row my-10">
          <!--begin::Label-->
          <label class="form-label fs-6 fw-bold text-dark">Code</label>
          <!--end::Label-->

          <!--begin::Input-->
          <Field
            tabindex="1"
            class="form-control form-control-lg form-control-solid"
            type="text"
            name="code"
            autocomplete="off"
          />
          <!--end::Input-->
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="code" />
            </div>
          </div>
        </div>
        <!--end::Input group-->

        <!--begin::Actions-->
        <div class="text-center">
          <!--begin::Submit button-->
          <button
            tabindex="3"
            type="submit"
            ref="submitButton"
            id="kt_sign_in_submit"
            class="btn btn-lg btn-primary w-100 mb-5"
          >
            <span class="indicator-label"> Continue </span>

            <span class="indicator-progress">
              Please wait...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
          <!--end::Submit button-->
        </div>
        <!--end::Actions-->
      </VForm>
      <!--end::Form-->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

import Swal from "sweetalert2";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import * as Yup from "yup";
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

    // Timer
    const startTime = new Date().getTime();
    let interval = null as any;
    const refreshQr = ref(false);
    const checkTimer = () => {
      interval = setInterval(function () {
        if (new Date().getTime() - startTime > 60000) {
          clearInterval(interval); //stop the interval
          refreshQr.value = true; //show refresh button
          return;
        }
      }, 1000);
    };

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const login = Yup.object().shape({
      code: Yup.string().required().label("Code"),
    });

    //Form submit function
    const onSubmitLogin = async (values: any) => {
      values = values as Object;
      const pyaload = {
        token: values.code,
      };
      // Send login request
      await store.verifyQr(pyaload);
      console.log(pyaload);
      const error = Object.values(store.errors);

      if (error.length === 0) {
        Swal.fire({
          text: "You have successfully logged in!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(() => {
          // Go to page after successfully login
          router.push({ name: "dashboard" });
        });
      } else {
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

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };
    return {
      qrCode,
      onSubmitLogin,
      login,
      submitButton,
      refreshQr,
      fetchQr,
      loading,
    };
  },
});
</script>
