<template>
  <q-page>
    <div class="q-ma-md">
      <div class="row">
        <div class="col-2">
          <div class="row ">
            <q-input outlined ref="nameRef" v-model="compName" label="Название" lazy-rules :rules="nameRules" />
          </div>
          <div class="row">
            <div class="q-gutter-sm">
              <q-radio dense v-model="compType" val="soft" label="SOFT" />
              <q-radio dense v-model="compType" val="hard" label="HARD" />
            </div>
          </div>
          <div class="row q-mt-md">
            <q-btn color="white" text-color="black" label="Изменить" @click="submit(competencyList, compType)" />
          </div>
        </div>
        <div class="col">
          <div class="row">
            <div class="col-3" >
              <CourseCatSelect v-model="eduCourseCatSelect" :cats="courseCatOpts" @fetchCourses="this.fetchCourses"/>
              <q-input label="искать курс" v-if="coursesRes.length > 0" v-model="courseFilter" :rules="[ this.filterCourses ]"></q-input>
              <q-virtual-scroll
                style="max-height: 300px;"
                :items="coursesRes"
                separator
                v-slot="{ item, index }"
              >
                <q-item
                  :key="index"
                  dense
                >
                  <q-item-section>
                    <q-item-label>
                      <div class="row border-1">
                        <div class="col-10">{{ item.cname }}</div>
                        <div class="col" ><q-icon name="chevron_right" @click="check(item)" class="cursor-pointer" right /></div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-virtual-scroll>
              <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
                <q-card class="bg-teal text-white" style="width: 300px">
                  <q-card-section>
                    <div class="text-h6">Введите вес!</div>
                  </q-card-section>

                  <q-card-section class="q-pt-none">
                    <div class="row">
                      <q-input outlined ref="weightRef"  v-model="compWeight" type="number" label="Вес" :rules="weightRules" />
                    </div>
                    <div class="row">
                      <q-checkbox ref="requiredC" v-model="req" label="Обязательная" />
                    </div>
                  </q-card-section>

                  <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="OK" v-close-popup @click="move(dataTransfer)" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>

            <div class="col-3 on-right">
              <q-card>
                Вставьте сюда
                <draggable
                  class="list-group"
                  :list="competencyList"
                  group="courses"
                  @change="log"
                  itemKey="cId"
                >
                  <template #item="{ element, index }">

                    <div class="list-group-item">    <q-card class="my-card">
                      <q-card-section>
                        <div class="row border-1">
                          <div class="col-10">{{ element.cname }}</div>
                          <div class="col" ><q-icon name="close" @click="remove(index)" class="cursor-pointer" right /></div>
                        </div>
                      </q-card-section>
                    </q-card></div>
                  </template>
                </draggable>
              </q-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>

</template>
<script>
import draggable from "vuedraggable";
import { ref } from 'vue';
import {useRoute} from "vue-router";

import CourseCatSelect from "components/CourseCatSelect.vue";
export default {
  display: "Two Lists",
  order: 1,

  components: {
    draggable,
    CourseCatSelect,
  },
  data() {
    return {
      courseFilter: ref(null),
    };
  },
  async mounted() {
    let comps = await this.fetchCourseCats();
    this.cats = Object.values(
      comps
    );
    let catOptions = [];
    this.cats.forEach(function (element) {
      catOptions.push(
        {
          label: element.name,
          value: element.id
        }
      )
    });
    this.courseCatOpts = catOptions;

  },
  async setup() {
    let compWeight = ref('100');
    const compId = useRoute().query.compId;

    async function fetchCompData() {
      const compId = useRoute().query.compId;
      const apiUrl = 'https://edu.zhcom.ru/api/competency/get/' + compId;
      let res = {};
      await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res.result;
    }

    const requiredC = ref(false);
    const upFormData = await fetchCompData();
    let competencyList = ref([]);
    Object.values(upFormData.competencies).forEach(function (element) {
      competencyList.value.push({
        isRequired: element.required,
        weight: element.weight,
        cname: element.shortname,
        value: element.courseid,
        id: element.courseid,
      })
    });
    return {
      compType: upFormData.type,
      compName: upFormData.name,
      compWeight,
      dataTransfer: ref(null),
      courseCatOpts: ref([]),
      competencyList,
      compId,
      upFormData,
      req: ref(false),
      cats: [],
      shape: ref('soft'),
      filteredCourses: ref([]),
      coursesRes: ref([]),
      persistent: ref(false),
      requiredC,
      nameRef: ref(null),
      weightRef: ref('100'),
      eduCourseCatSelect: ref(null),
      nameRules: [
        val => (val && val.length > 0) || 'Введите значение!'
      ],
      weightRules: [
        val => (val && val.length > 0 && val < 101) || 'Допустимое значение от 0 до 100'
      ],
      async sendData(data) {
        try {
          const apiUrl = 'https://edu.zhcom.ru/api/competencies/update/' + data.compId;
          await fetch(
            apiUrl,
            {
              method: "post",
              mode: 'no-cors',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            })
          alert('Компетенция изменена');
          location.reload();
        } catch (err) {
          console.log(err);
        }
      },
    }
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
    },
    move: function (el) {
      el.weight = this.compWeight;
      el.isRequired = this.req;
      this.competencyList.push(el);
    },
    remove: function (el) {
      this.competencyList.splice(el, 1);
    },
    async submit (competencies, compType) {
      this.nameRef.validate();
      if (this.nameRef.hasError) {
        alert('Введите имя компетенции!');
        return
      }
      let formData = {
        'compId': this.compId,
        "cName": this.compName,
        "competencies": competencies,
        'compType': compType
      };
      await this.sendData(formData);
    },
    check: function (el) {
      this.dataTransfer = el;
      this.persistent = true;
    },
    fetchCourseCats: async function () {
      const apiUrl = 'https://edu.zhcom.ru/api/course/cats/';
      let res = {};
      await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res.result;
    },
    filterCourses(val) {
      if (val === '') {
        this.filteredCourses = this.coursesRes;
      }
      else {
        const needle = val.toLowerCase();
        this.filteredCourses = this.coursesRes.filter(
          v => v.cname.toLowerCase().indexOf(needle) > -1
        )
      }
    },
    fetchCourses: async function (val) {
      const catId = val.value;
      const apiUrl = 'https://edu.zhcom.ru/api/courses/' + catId;
      let res = {};
      await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      this.coursesRes = Object.values(res.result);
      this.filteredCourses = this.coursesRes;
    },
  }
};
</script>

<style scoped>

</style>
