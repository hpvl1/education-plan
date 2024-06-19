import {defineStore} from 'pinia'

async function fetchAuth() {
    const apiUrl = 'https://edu.zhcom.ru/api/auth/isAdmin/';
    let res = {};
    const response = await fetch(apiUrl)
      .then(response => response.json())
      .then(aJson => {
        res = aJson
      })

  return res.result.adminAuth;
}
export const useCounterStore = defineStore('counter', {
  state: () => ({
    isAdmin: false,
  }),
  getters: {
  },
  actions: {
    async getIsAdmin() {
      this.isAdmin = await fetchAuth()
    },
  },
})
