<template>
  <q-page>
    <h3>Редактор учебных планов</h3>
    <div>
      <div class="row">
        <div class="col-3 on-right">
          <div class="q-pa-md">
            <q-input
              ref="nameRef"
              filled
              v-model="nameField"
              label="Название"
              :rules="[val => !!val || 'Обязательное поле']"
            />
          </div>
        </div>
        <div class="col">
          <div class="row q-pt-xl">
            <span style="font-size: 150%"> Студенты в данном плане: </span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-3">
          <div class="q-gutter q-pa-md">
            <q-select
              filled
              behavior="dialog"
              v-model="group"
              multiple
              use-input
              :options="filteredOptions"
              @filter="this.filterFn"
              use-chips
              stack-label
              label="Выбор компетенций"
            />
          </div>
          <div class="column items-end">
            <q-btn push color="primary q-ma-md" label="Редактировать" @click="submit"  />
          </div>
        </div>
        <div class="col-6">
          <div class="q-gutter q-pa-md">
            <q-select
              filled
              behavior="dialog"
              v-model="students"
              multiple
              use-input
              :options="studentsOptions"
              @filter="this.filterStudentFn"
              use-chips
              :loading="loading"
              stack-label
            />
          </div>
          <div class="column items-end">
            <q-btn push color="primary q-ma-md" label="Редактировать" @click="submit"  />
          </div>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'
import {useRoute} from "vue-router";
import { computed, nextTick } from 'vue'



export default defineComponent({
  name: 'EducationPlanPage',
  components: {},
  async setup () {
    async function fetchStats() {
      const apiUrl = 'https://edu.zhcom.ru/api/competencies/list/';
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res;
    }
    const planId = useRoute().query.planId;
    async function fetchPlanData(planId) {

      const apiUrl = 'https://edu.zhcom.ru/api/eduplan/planData/' + planId;
      let res = {};
      await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res.result;
    };
    let choosed = [];

    const planData = await fetchPlanData(planId);
    Object.values(planData.competencies).forEach(function (element) {
      choosed.push(
        {
          label: element.name,
          value: element.id
        },
      )
    })
    let dataStudents = [];
    Object.values(planData.students).forEach(function (element) {
      dataStudents.push(
        {
          label: element.name,
          value: element.id
        },
      )
    })
    const res = await fetchStats();
    const competencies = Object.values(res.result);
    let competenciesAsOptions = [];
    competencies.forEach(function (element) {
      competenciesAsOptions.push(
        {
          label: element.name,
          value: element.id
        },
      )
    })
    const loading = ref(false)
    const nextPage = ref(2)
    const pageSize = 50
//@TODO ДОПИЛИТЬ!
    return {
      filteredOptions: ref([]),
      studentsOptions: ref (dataStudents),
      dataStudents,
      students: ref(dataStudents),
      group: ref(choosed),
      competenciesAsOptions,
      nameField: ref(planData.name),
      nameRef: ref(null),
      planId,
      nextPage,
      loading,
    }
  },
  methods: {
    async sendData(data) {
      try {
        const apiUrl = 'https://edu.zhcom.ru/api/eduplan/update/' + this.planId;
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
          alert('Учебный план изменен');
          location.reload();
        }
      } catch (err) {
      }
    },
    submit: function () {
      this.nameRef.validate();
      if (this.nameRef.hasError || this.group.length === 0) {
        alert('Введите имя и укажите компетенции!!');
        return
      }
      let fData = {
        'name': this.nameField,
        'competencies': this.group,
        'students': this.students
      };
      this.sendData(fData);
    },
    filterFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredOptions = this.competenciesAsOptions.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterStudentFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.studentsOptions = this.dataStudents.filter(
          v => v.label.toLowerCase().indexOf(needle) > -1
        )
      })
    }
  }
})
</script>

