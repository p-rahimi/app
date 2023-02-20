import { ref } from "vue";
import { defineStore } from "pinia";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

export interface User {
  id: string;
}

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref<User>({} as User);
  const isAuthenticated = ref(!!JwtService.getToken());

  function setAuth(authUser: User) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    JwtService.saveToken(user.value.api_token);
  }

  function setError(error: any) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {} as User;
    errors.value = [];
    JwtService.destroyToken();
  }

  function login(credentials: User) {
    return ApiService.post("/v1/oauth/sign", credentials)
      .then(({ data }) => {
        setError({});
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function logout() {
    purgeAuth();
  }

  function register(credentials: User) {
    return ApiService.post("register", credentials)
      .then(({ data }) => {
        setAuth(data);
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function forgotPassword(email: string) {
    return ApiService.post("forgot_password", email)
      .then(() => {
        setError({});
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyAuth() {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.post("verify_token", { api_token: JwtService.getToken() })
        .then(({ data }) => {
          setAuth(data);
        })
        .catch(({ response }) => {
          setError(response.data.errors);
          purgeAuth();
        });
    } else {
      purgeAuth();
    }
  }
  function fetchQr() {
    return ApiService.get("/v1/oauth/qr")
      .then(({ data }) => {
        setError({});
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }
  function verifyQr(payload: Object) {
    return ApiService.post("/v1/oauth/qr/authorize", payload)
      .then(({ data }) => {
        setError({});
        return data;
      })
      .catch(({ response }) => {
        setError(response.data.errors);
      });
  }

  function verifyTwoStep(payload: Object) {
    return ApiService.post("/v1/oauth/verify", payload)
      .then(({ data }) => {
        /* setAuth(data); */
        console.log(data)
        return data;
      })
      .catch(({ response }) => {
        setError(response.data);
        return response.data;

      });
  }

  return {
    errors,
    user,
    isAuthenticated,
    login,
    logout,
    register,
    forgotPassword,
    verifyAuth,
    fetchQr,
    verifyQr,
    verifyTwoStep,
  };
});
