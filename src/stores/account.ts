import { ref } from "vue";
import { defineStore } from "pinia";
import { setError } from "./global";
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
  private: boolean|number;
  status: number;
  currency: string;
}

export const useAccountStore = defineStore("account", () => {
 
  const account = ref<Account>({} as Account);
  const isAuthenticated = ref(!!JwtService.getToken());


  //actions
  // fetch account details
  function fetchAccount() {
    return ApiService.get("/v1/account")
      .then(({ data }) => {
        if (data.succeed) {
          account.value = data.results as Account;
        }else{
          setError(data.message);
        }
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.message);
      });
  }
  // update account details
  function updateAccount(payload: Account) {
    return ApiService.put("/v1/account",payload)
      .then(({ data }) => {
        if (data.succeed) {
          return data
        }else{
          setError(data.errors);
        }
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  return {
    account,
    isAuthenticated,
    fetchAccount,
    updateAccount
  };
});
