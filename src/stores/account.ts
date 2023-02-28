import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

// interface ProfileDetails
export interface Account {
  avatar: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email: string;
  mobile: string;
  phone_number: string;
  country: string;
  language: string;
  timezone: string;
  last_connection: string;
  private: string;
  status: number;
  currency: string;
}

export const useAccountStore = defineStore("account", () => {
  // state
  const errors = ref({});
  const account = ref<Account>({} as Account);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setError(error: any) {
    errors.value = { ...error };
  }

  //actions
  // fetch account details
  function fetchAccount() {
    return ApiService.get("/v1/account")
      .then(({ data }) => {
        if (data.succeed) {
          account.value = data.results;
        }
        setError({});
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  return {
    errors,
    account,
    isAuthenticated,
    fetchAccount,
  };
});
