import { ref } from "vue";
import Swal from "sweetalert2";

// state
const errors = ref({});

export function setError(error: any) {
  errors.value = { ...error };
  showError()
}

function showError() {
  // error handling from server side validation
  const error = Object.values(errors.value);
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
    errors.value = {};
  });
}
