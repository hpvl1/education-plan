<template>
  <q-page>
    <h3>Зачисление пользователей в план</h3>
    <div class="q-ma-md">
      <div class="column q-ma-md">
        <div class="row">
          <div class="col-3">
            <q-select filled v-model="eduPlanSelect" :options="planOptionsShow" label="Учебный план" use-input @filter="filterPlans"/>
          </div>
        </div>
        <div class="row q-mt-md">
          <q-select filled use-input behavior="dialog" v-model="userSelect" fill-input hide-selected @filter="filterFn" :options="userOptionsShow" label="Пользователь" hint="Введите минимум 2 символа" />
          <q-btn class="q-ma-md" color="white" text-color="black" label="Зачислить" @click="submitUser(userSelect, eduPlanSelect)" />
        </div>
        <div class="row q-mt-md">
          <q-select filled use-input behavior="dialog" v-model="cohortSelect" fill-input hide-selected @filter="this.filterGroups" :options="cohortOptionsShow" label="Глобальная группа" hint="Введите минимум 2 символа" />
          <q-btn class="q-ma-md" color="white" text-color="black" label="Зачислить" @click="submitCohort(cohortSelect, eduPlanSelect) " />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {defineComponent} from "vue";
import {ref} from "vue";

export default defineComponent({
  name: 'AssignEducationPlanPage',
  components: {},
  async setup () {
    async function fetchPlans() {
      const apiUrl = 'https://edu.zhcom.ru/api/eduplan/list/';
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res;
    }
    const plansResponse = await fetchPlans();
    const planList = Object.values(plansResponse.result);
    let planOptions = [];

    planList.forEach(function (element) {
      planOptions.push(
        {
          label: element.name,
          value: element.id
        },
      )
    })
      //part #2
    async function fetchUsers() {
      const apiUrl = 'https://edu.zhcom.ru/api/users/list/';
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res;
    }
    const usersResponse = await fetchUsers();
    const userList = Object.values(usersResponse.result);
    let userOptions = [];

    userList.forEach(function (element) {
      userOptions.push(
        {
          label: element.name,
          value: element.id
        },
      )
    })
    const userOptionsShow = ref(userOptions);
    const planOptionsShow = ref(planOptions);
    //part #3
    async function fetchUserCohorts() {
      const apiUrl = 'https://edu.zhcom.ru/api/users/cohortList/';
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res;
    }
    const cohortsResponse = await fetchUserCohorts();
    const cohortList = Object.values(cohortsResponse.result);
    let cohortOptions = [];

    cohortList.forEach(function (element) {
      cohortOptions.push(
        {
          label: element.name,
          value: element.id
        },
      )
    })
    const cohortOptionsShow = ref(cohortOptions);
    return {
      eduPlanSelect: ref(null),
      userSelect: ref(null),
      cohortSelect: ref(null),
      planOptionsShow,
      planOptions,
      userOptions,
      cohortOptions,
      cohortOptionsShow,
      userOptionsShow,
      async sendData(data, apiUrl) {
        try {

          let res = {};
          const response = await fetch(
            apiUrl,
            {
              method: "post",
              mode: 'no-cors',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
            .then (response => response.json())
            .then (aJson => {
              res = aJson
            });
          if (res.result.res === 'ok') {
            alert('Запрос выполнен. ' + res.result.text);
          }
        } catch (err) {
          console.log(err);
        }
      },
      filterFn (val, update, abort) {

        update(() => {
          const needle = val.toLowerCase()
          userOptionsShow.value = userOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
      filterPlans (val, update, abort) {

        update(() => {
          const needle = val.toLowerCase()
          planOptionsShow.value = planOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
        })
      },
    }
  },
  methods: {
    submitCohort (cohort, plan) {
      if (cohort && plan) {
        let fData = {
          'planId': plan.value,
          'cohortId': cohort.value
        }
        this.sendData(fData, 'https://edu.zhcom.ru/api/eduplan/assignCohort/');
      } else {
        alert('Введите план и группу!')
      }
    },
    submitUser (user, plan) {

      if (user && plan) {
        let fData = {
          'planId': plan.value,
          'userId': user.value
        }
        this.sendData(fData, 'https://edu.zhcom.ru/api/eduplan/assignUser/');
      } else {
        alert('Введите план и пользователя!')
      }
    },
    filterGroups (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.cohortOptionsShow = this.cohortOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
  }
});
</script>

<style scoped>

</style>
