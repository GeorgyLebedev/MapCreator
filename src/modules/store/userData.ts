import {Module} from "vuex";
import store from "@/modules/store/store";
import AxiosRequest from "@/modules/services/axiosRequest";
import router from "@/router";

enum tabs {
    logIn = 'logIn',
    signUp = 'signUp',
    forgotPassword = 'forgotPassword',
    newPassword = 'newPassword',
    confirm = 'confirm'
}

interface LoginData {
    id: null | string;
    username: string;
    password: string;
    emailToPasReset: string;
    newPassword: string;
    newPasswordRepeat: string;
}

interface RegisterData {
    email: string;
    registerPassword: string;
    passwordRepeat: string;
}

interface ConfirmData {
    confirmType: string,
    confirmCode: string,
    enteredCode: string
}

interface UserState {
    tab: string,
    loginData: LoginData;
    registerData: RegisterData;
    confirmData: ConfirmData
}

const userState: Module<UserState, any> = {
    namespaced: true,
    state: () => ({
        tab: "logIn" as string,
        loginData: {
            id: null,
            username: "",
            password: "",
            emailToPasReset: "",
            newPassword: "",
            newPasswordRepeat: ""
        },
        registerData: {
            email: "",
            registerPassword: "",
            passwordRepeat: ""
        },
        confirmData: {
            confirmType: "",
            enteredCode: "",
            confirmCode: "",
        }
    } as unknown as UserState),
    mutations: {
        setTab: (state, tab: string) => state.tab = tab,
        setLoginDataId: (state, id: null | string) => state.loginData.id = id,
        setLoginDataUsername: (state, username: string) => state.loginData.username = username,
        setLoginDataPassword: (state, password: string) => state.loginData.password = password,
        setLoginDataEmailToPasReset: (state, email: string) => state.loginData.emailToPasReset = email,
        setLoginDataNewPassword: (state, newPassword: string) => state.loginData.newPassword = newPassword,
        setLoginDataNewPasswordRepeat: (state, newPasswordRepeat: string) => state.loginData.newPasswordRepeat = newPasswordRepeat,
        setRegisterDataEmail: (state, email: string) => state.registerData.email = email,
        setRegisterDataPassword: (state, registerPassword: string) => state.registerData.registerPassword = registerPassword,
        setRegisterDataPasswordRepeat: (state, passwordRepeat: string) => state.registerData.passwordRepeat = passwordRepeat,
        setConfirmDataType: (state, confirmType: string) => state.confirmData.confirmType = confirmType,
        setConfirmDataCode: (state, confirmCode: string) => state.confirmData.confirmCode = confirmCode,
        setConfirmDataEnteredCode: (state, enteredCode: string) => state.confirmData.enteredCode = enteredCode
    },
    getters: {
        getTab: (state): string => state.tab,
        getLoginDataId: (state): string | null => state.loginData.id,
        getLoginDataUsername: (state): string => state.loginData.username,
        getLoginDataPassword: (state): string => state.loginData.password,
        getLoginDataEmailToPasReset: (state): string => state.loginData.emailToPasReset,
        getLoginDataNewPassword: (state): string => state.loginData.newPassword,
        getLoginDataNewPasswordRepeat: (state): string => state.loginData.newPasswordRepeat,
        getRegisterDataEmail: (state): string => state.registerData.email,
        getRegisterDataPassword: (state): string => state.registerData.registerPassword,
        getRegisterDataPasswordRepeat: (state): string => state.registerData.passwordRepeat,
        getConfirmDataType: (state): string => state.confirmData.confirmType,
        getConfirmDataCode: (state): string => state.confirmData.confirmCode,
        getConfirmDataEnteredCode: (state): string => state.confirmData.enteredCode
    },
    actions: {
        async enter({getters}) {
            let enterData: { email: string, password: string }
            if (getters.getLoginDataNewPassword.length > 0 && getters.getLoginDataEmailToPasReset)
                enterData = {
                    email: getters.getLoginDataEmailToPasReset.toLowerCase(),
                    password: getters.getLoginDataNewPassword
                }
            else if ((getters.getLoginDataUsername.length > 0 && getters.getLoginDataPassword))
                enterData = {
                    email: getters.getLoginDataUsername.toLowerCase(),
                    password: getters.getLoginDataPassword
                }
            else
                enterData = {
                    email: getters.getRegisterDataEmail.toLowerCase(),
                    password: getters.getRegisterDataPassword
                }
            const request = await new AxiosRequest("auth/login", "post", enterData)
            const response = await request.sendRequest()
            if (response.token) {
                localStorage.setItem('TOKEN', response.token)
                await router.push({path: "/Main"})
            }
        },
        async resetPassword() {
            const response = await store.dispatch('userState/confirmEmail', 'pasReset')
            if (response) {
                store.commit('userState/setTab', 'confirm')
                store.commit("userState/setConfirmDataType", 'resetPas')
                store.commit("userState/setConfirmDataCode", String(response.code))
                store.commit("userState/setLoginDataId", response.id)
            }
        },
        async confirmEmail({getters}, src: string) {
            try {
                const request: AxiosRequest = await new AxiosRequest("user/confirm/", "post", {
                    email: getters.getLoginDataEmailToPasReset ? getters.getLoginDataEmailToPasReset.toLowerCase() : getters.getRegisterDataEmail.toLowerCase(),
                    src: src
                })
                const response: any = await request.sendRequest()
                return response
            } catch (e: any) {
                store.commit("setNotification", ["error", e.message])
                return
            }
        },
        async confirmNewUser({getters}) {
            const response: any = await store.dispatch('userState/confirmEmail', 'register')
            if (response?.code) {
                store.commit('userState/setTab', 'confirm')
                store.commit("userState/setConfirmDataType", 'register')
                store.commit("userState/setConfirmDataCode", String(response.code))
            }
        },
        async register() {
            await store.dispatch('userState/addNewUser')
            await store.dispatch('userState/enter')
            await store.dispatch('userState/createUserOptions')
        },
        async updatePassword({getters}) {
            try {
                const request: AxiosRequest = await new AxiosRequest(`user/${getters.getLoginDataId}`, "put", {password: getters.getLoginDataNewPassword})
                await request.sendRequest()
            } catch (e: any) {
                store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
                return
            }
            store.commit("setNotification", ["success", "Пароль обновлён!"])
            store.commit('userState/setTab', 'logIn')
            //здесь нужен экран ожидания
            setTimeout(() =>
                    store.dispatch('userState/enter'),
                3000
            )
        },
        async addNewUser({getters}) {
            try {
                const request: AxiosRequest = await new AxiosRequest("user/", "post",
                    {
                        email: getters.getRegisterDataEmail.toLowerCase(),
                        password: getters.getRegisterDataPassword,
                        registrationDate: new Date(),
                    })
                const response: any = await request.sendRequest()
                return response
            } catch (e: any) {
                store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
                return
            }
        },
        async createUserOptions() {
            try {
                const request: AxiosRequest = await new AxiosRequest('options/', "post",)
                await request.sendRequest()
            } catch (e: any) {
                store.commit("setNotification", ["error", "Ошибка сервера: " + e.message])
                return
            }
        },
    }
};

export default userState;
