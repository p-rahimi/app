import { onMounted, ref } from "vue";
export const useLocalStorageFields = () => {
  const localName = ref<string>("");
  const defaultFields = ref<string[]>([]);
  const allFields = ref<string[]>([]);


  function checkChange(status, value) {
    if (status) {
      //@ts-ignore
      defaultFields.value.push(value);
      setLocalStorage();
    } else {
      const findField = defaultFields.value.indexOf(value);
      defaultFields.value.splice(findField, 1);
      setLocalStorage();
    }
  }

  onMounted(() => {
    if (localStorage.getItem(localName.value)) {
      defaultFields.value = JSON.parse(
        //@ts-ignore
        localStorage.getItem(localName.value)
      );
    } else {
      //@ts-ignore
      setLocalStorage();
    }
  });

  function setLocalStorage() {
    localStorage.setItem(localName.value, JSON.stringify(defaultFields.value));
  }
  return {
    checkChange,
    localName,
    defaultFields,
    allFields,
  };
};
