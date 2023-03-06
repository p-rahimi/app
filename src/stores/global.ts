import { ref } from "vue";
import Swal from "sweetalert2";
import { isArray } from "helping-js/core/types";
// state
const errors = ref('');

export function setError(error: any) {
  errors.value = error ;
  showError()
}

function showError() {
  console.log(errors.value);
  // error handling from server side validation
  const text = isArray(errors.value) === true ? errors.value[0] as string : errors.value as string | any ;
  Swal.fire({
    text: text,
    icon: "error",
    buttonsStyling: false,
    confirmButtonText: "Try again!",
    heightAuto: false,
    customClass: {
      confirmButton: "btn fw-semobold btn-light-danger",
    },
  }).then(() => {
    errors.value = '';
  });
}
