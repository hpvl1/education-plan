<template>
  <q-page>
    <q-table
      title="Компетенции"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      rows-per-page-label="Компетенций:"
      :rows-per-page-options="[20, 40, 0]"
      v-model:selected="selected"
    >
      <template v-slot:top-left>
        <q-btn to="/addcomp/" label="создать компетенцию" outline color="purple" />
      </template>
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Поиск">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <template v-slot:body-cell-name1="val">
        {{ val.row.name }}
        <a v-bind:href="'/local/educationplan/cabinet/#/editcomp/?compId=' + val.key"><q-icon name="edit"  class="pen" right /></a>
        <a><q-icon name="close" class="cursor-pointer" right  @click="remove(val)" /></a>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import {ref, defineComponent} from "vue";
export default defineComponent({
  name: 'CompetenciesPage',
  setup () {
    const columns = [
      {
        name: 'name1',
        required: true,
        label: 'Название компетенции',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
      },
    ]
    return {
      columns,
      competencies: {},
      selected: ref([]),
      filter: ref(''),
      removeBtn: ref(null),
    }
  },
  async mounted() {
    let comps = await this.fetchStats();
    this.competencies = Object.values(
      comps
    );
    let rows = [];
    this.competencies.forEach(function (element) {
      rows.push(
        {
          'name': element.name,
          'id': element.id
        }
      )
    });
    this.rows = rows;
  },
  data () {

    return {
      rows: this.rows
    }
  },
  methods: {
    fetchStats: async function () {
      const apiUrl = 'https://edu.zhcom.ru/api/competencies/list/';
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res.result;
    },
    remove: async function (val) {
      const apiUrl = 'https://edu.zhcom.ru/api/competency/delete/' + val.key;
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      this.rows.splice(val.rowIndex, 1);
    }
  }
})
</script>

<style scoped>

</style>
