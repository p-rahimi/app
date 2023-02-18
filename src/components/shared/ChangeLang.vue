<template>
  <!--begin::Menu sub-->
  <div class="change-lang">
    <!--begin::Menu item-->
    <div class="menu-item px-3" v-for="(item, index) in countries" :key="index">
      <a
        @click="setLang(item.value)"
        href="#"
        class="menu-link d-flex px-5 text-dark"
        :class="{ active: currentLanguage === item.value }"
      >
        <span class="symbol symbol-20px me-4">
          <img class="rounded-1" :src="item.flag" alt="metronic" />
        </span>
        {{ item.name }}
      </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu sub-->
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "ChangeLang",
  setup(props, { emit }) {
    const i18n = useI18n();

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "en";

    const countries = {
      en: {
        flag: "/media/flags/united-states.svg",
        name: "English",
        value: "en",
      },
      es: {
        flag: "/media/flags/spain.svg",
        name: "Spanish",
        value: "es",
      },
      de: {
        flag: "/media/flags/germany.svg",
        name: "German",
        value: "de",
      },
      ja: {
        flag: "/media/flags/japan.svg",
        name: "Japanese",
        value: "ja",
      },
      fr: {
        flag: "/media/flags/france.svg",
        name: "French",
        value: "fr",
      },
    };

    const setLang = (lang: string) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
      window.location.reload();
    };

    const currentLanguage = computed(() => {
      return i18n.locale.value;
    });

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value as keyof typeof countries];
    });
    onMounted(() => {
      emit("getCurrentLangugeLocale", currentLangugeLocale.value);
    });
    return {
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries
    };
  },
});
</script>
