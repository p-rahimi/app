<template>
  <div class="d-flex flex-column justify-content-center">
    <img
      src="/media/trader4/sample-qr.png"
      class="mx-auto"
      width="250"
      height="250"
      alt="qr-code"
    />
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

    onMounted(() => {
      fetchQr();
    });
    const fetchQr = async () => {
      // Send login request
      const res = await store.fetchQr();
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
        console.log(res);
      }
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
    };
  },
});
</script>
