import { ref } from "vue";
import { defineStore } from "pinia";
import { setError } from "./global";
import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";

// interface ProfileDetails
export interface TradingAccount {
    uuid: string
    name: string
    broker: number
    company: string
    identity: string
    secret: string
    read_only_secret: string
    trade_mode: number
    margin_type: number
    order_limit: number
    trade_allowed: boolean
    hedge: boolean
    capital_road: boolean
    server: string
    balance: number
    credit: number
    equity: string
    currency: string
    margin: string
    free_margin: string
    margin_level: string
    leverage: string
    stopout_level: string
    market: string
    report: number
    status: number
}

export const useTradingAccountStore = defineStore("account", () => {

    const account = ref<TradingAccount>({} as TradingAccount);
    const isAuthenticated = ref(!!JwtService.getToken());


    //actions
    // fetch account details
    function fetchAccount() {
        return ApiService.get("/v1/trading-accounts")
            .then(({ data }) => {
                if (data.succeed) {
                    account.value = data.results as TradingAccount;
                } else {
                    setError(data.message);
                }
                return data;
            })
            .catch(({ response }) => {
                setError(response.data.message);
            });
    }

    // update account details
    function updateAccount(payload: TradingAccount) {
        return ApiService.put(`/v1/trading-accounts/${payload.uuid}`, payload)
            .then(({ data }) => {
                if (data.succeed) {
                    return data
                } else {
                    setError(data.errors);
                }
            })
            .catch(({ response }) => {
                setError(response.data.errors);
            });
    }

    // Create account details
    function createAccount(payload: TradingAccount) {
        return ApiService.post("/v1/trading-accounts", payload)
            .then(({ data }) => {
                if (data.succeed) {
                    return data
                } else {
                    setError(data.errors);
                }
            })
            .catch(({ response }) => {
                setError(response.data.errors);
            });
    }

    // Create account details
    function deleteAccount(uuid: string) {
        return ApiService.delete(`/v1/trading-accounts/${uuid}`)
            .then(({ data }) => {
                if (data.succeed) {
                    return data
                } else {
                    setError(data.errors);
                }
            })
            .catch(({ response }) => {
                setError(response.data.errors);
            });
    }

    return {
        account,
        createAccount,
        deleteAccount,
        isAuthenticated,
        fetchAccount,
        updateAccount
    };
});
