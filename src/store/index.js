import { defineStore } from 'pinia'

export const store = defineStore('mainstore', {
    state: () => ({
        token: '',
        login: false,
    }),
    getters: {
        isLogin(state) {
            if (state.token == '') {
                return false;
            } else {
                return true;
            }
        }
    },
    actions: {
        writeToken(token) {
            this.token = token;
        },
    },
})
