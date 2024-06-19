<template>
  <q-page>
    <h3>Редактор учебных планов</h3>
    <div>
      <div class="row">
        <div class="col on-right">
          <span class="text-weight-bold">Создать учебный план</span>
          <div class="row q-pa-md">
            <q-input
              ref="nameRef"
              filled
              v-model="nameField"
              label="Название"
              :rules="[val => !!val || 'Обязательное поле']"
            />
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
            <q-btn push color="primary q-ma-md" label="Создать" @click="submit"  />
          </div>
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import {defineComponent} from 'vue'
import {ref} from 'vue'

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
    return {
      filteredOptions: ref([]),
      group: ref([]),
      competenciesAsOptions,
      nameField: ref(null),
      nameRef: ref(null),
    }
  },
  methods: {
    async sendData(data) {
      try {
        const apiUrl = 'https://edu.zhcom.ru/api/eduplan/create/';
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
          alert('Учебный план добавлен');
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
        'competencies': this.group
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
    }
}
})
</script>

