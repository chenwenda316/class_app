/*
 * @Author: chenwenda316
 * @Date: 2022-12-03 22:10:15
 * @LastEditTime: 2023-02-22 01:03:37
 * @FilePath: \class_app_dev\src\store\index.js
 */
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
