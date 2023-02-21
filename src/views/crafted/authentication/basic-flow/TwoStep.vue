<template>
  <div class="d-flex flex-column flex-root" id="kt_app_root">
    <!--begin::Authentication - Two-stes -->
    <div class="d-flex flex-column flex-lg-row flex-column-fluid">
      <!--begin::Body-->
      <div
        class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
      >
        <!--begin::Form-->
        <div class="d-flex flex-center flex-column flex-lg-row-fluid">
          <!--begin::Wrapper-->
          <div class="w-lg-500px p-10">
            <!--begin::Form-->
            <form
              class="form w-100 mb-13"
              novalidate="novalidate"
              id="kt_sing_in_two_steps_form"
            >
              <!--begin::Icon-->
              <div class="text-center mb-10">
                <img
                  alt="Logo"
                  class="mh-125px"
                  src="/media/svg/misc/smartphone-2.svg"
                />
              </div>
              <!--end::Icon-->
              <!--begin::Heading-->
              <div class="text-center mb-10">
                <!--begin::Title-->
                <h1 class="text-dark mb-3">Two Step Verification</h1>
                <!--end::Title-->
                <!--begin::Sub-title-->
                <div class="text-muted fw-semibold fs-5 mb-5">
                  Enter the verification code we sent to
                </div>
                <!--end::Sub-title-->
                <!--begin::Mobile no-->
                <div class="fw-bold text-dark fs-3">{{ $route.query.id }}</div>
                <!--end::Mobile no-->
              </div>
              <!--end::Heading-->
              <!--begin::Section-->
              <div class="mb-10">
                <!--begin::Label-->
                <div
                  class="fw-bold d-flex flex-row justify-content-between text-start text-dark fs-6 mb-1 ms-1"
                >
                  <div>Type your 6 digit security code</div>

                  <!-- Clear Input -->
                  <div class="text-primary cursor-pointer" @click="clearInputs">
                    Clear
                  </div>
                </div>
                <!--end::Label-->
                <!--begin::Input group-->
                <div class="d-flex flex-wrap flex-stack">
                  <input
                    v-for="input in inputs"
                    :id="`pin-${input.id}`"
                    :key="input.id"
                    :ref="`pin-${input.id}`"
                    v-model="inputs[input.id].value"
                    type="text"
                    :name="`code_${input.id + 1}`"
                    maxlength="1"
                    class="form-control bg-transparent h-60px w-60px fs-2qx text-center mx-1 my-2"
                  />
                </div>
                <!--begin::Input group-->
              </div>
              <!--end::Section-->
              <!--begin::Submit-->
              <div class="d-flex flex-center">
                <button
                  type="button"
                  id="kt_sing_in_two_steps_submit"
                  class="btn btn-lg btn-primary fw-bold"
                >
                  <span class="indicator-label">Submit</span>
                  <span class="indicator-progress"
                    >Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span
                  ></span>
                </button>
              </div>
              <!--end::Submit-->
            </form>
            <!--end::Form-->
            <!--begin::Notice-->
            <div class="text-center fw-semibold fs-5">
              <span class="text-muted me-1">Didn’t get the code ?</span>
              <a href="#" class="link-primary fs-5 me-1">Resend</a>
              <span class="text-muted me-1">or</span>
              <a href="#" class="link-primary fs-5">Call Us</a>
            </div>
            <!--end::Notice-->
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Form-->
      </div>
      <!--end::Body-->
    </div>
    <!--end::Authentication - Two-stes-->
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import Swal from "sweetalert2";
import { useAuthStore } from "@/stores/auth";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "TwoStep",
  props: {
    inputCount: {
      type: Number,
      required: false,
      default: 4,
    },
  },
  setup() {
    const store = useAuthStore();
    const router = useRouter();
    const route = useRoute();

    const inputs = ref([]);
    setInputFields();
    onMounted(() => {
      KTSigninTwoSteps().init();
    });
    function setInputFields() {
      for (let i = 0; i < 6; i++) {
        inputs.value.push({
          id: i,
          value: "",
        });
      }
    }
    const pinNumber = computed(() => {
      let output = "";
      inputs.value.forEach((input) => {
        output += input.value;
      });
      return output;
    });

    function clearInputs() {
      inputs.value.forEach((input) => {
        input.value = "";
      });
    }

    function KTSigninTwoSteps() {
      // Elements
      let form;
      let submitButton;

      // Handle form
      let handleForm = (e) => {
        // Handle form submit
        submitButton.addEventListener("click", function (e) {
          e.preventDefault();

          let validated = true;

          let inputs = [].slice.call(
            form.querySelectorAll('input[maxlength="1"]')
          );
          inputs.map(function (input) {
            if (input.value === "" || input.value.length === 0) {
              validated = false;
            }
          });

          if (validated === true) {
            // Show loading indication
            submitButton.setAttribute("data-kt-indicator", "on");

            // Disable button to avoid multiple click
            submitButton.disabled = true;

            // Simulate ajax request
            const payload = {
              id: route.query.id,
              code: pinNumber.value,
            };
            store.verifyTwoStep(payload).then((res) => {
              if (res?.succeed === true) {
                router.push({ name: "dashboard" });
              } else {
                Swal.fire({
                  text: res.message,
                  icon: "error",
                  buttonsStyling: false,
                  confirmButtonText: "Try again!",
                  heightAuto: false,
                  customClass: {
                    confirmButton: "btn fw-semobold btn-light-danger",
                  },
                });
              }
              setTimeout(() => {
                // Hide loading indication
                submitButton.removeAttribute("data-kt-indicator");

                // Enable button
                submitButton.disabled = false;
              }, 1000);
            });
          } else {
            Swal.fire({
              text: "Please enter valid securtiy code and try again.",
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "Ok, got it!",
              customClass: {
                confirmButton: "btn fw-bold btn-light-primary",
              },
            });
          }
        });
      };

      var handleType = function () {
        var input1 = form.querySelector("[name=code_1]");
        var input2 = form.querySelector("[name=code_2]");
        var input3 = form.querySelector("[name=code_3]");
        var input4 = form.querySelector("[name=code_4]");
        var input5 = form.querySelector("[name=code_5]");
        var input6 = form.querySelector("[name=code_6]");

        input1.focus();

        input1.addEventListener("keyup", function () {
          if (this.value.length === 1) {
            input2.focus();
          }
        });

        input2.addEventListener("keyup", function () {
          if (this.value.length === 1) {
            input3.focus();
          }
        });

        input3.addEventListener("keyup", function () {
          if (this.value.length === 1) {
            input4.focus();
          }
        });

        input4.addEventListener("keyup", function () {
          if (this.value.length === 1) {
            input5.focus();
          }
        });

        input5.addEventListener("keyup", function () {
          if (this.value.length === 1) {
            input6.focus();
          }
        });

        input6.addEventListener("keyup", function () {
          if (this.value.length === 1) {
            input6.blur();
          }
        });
      };

      // Public functions
      return {
        // Initialization
        init: function () {
          form = document.querySelector("#kt_sing_in_two_steps_form");
          submitButton = document.querySelector("#kt_sing_in_two_steps_submit");

          handleForm();
          handleType();
        },
      };
    }
    return {
      inputs,
      pinNumber,
      clearInputs,
    };
  },
};
</script>
