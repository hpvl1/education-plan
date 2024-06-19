<template>
    <q-page>
      <div class="q-ma-md">
        <div class="row">
          <div class="col-2">
            <div class="row ">
              <q-input outlined v-model="compName" label="Название" lazy-rules :rules="nameRules" />
            </div>
            <div class="row">
              <q-checkbox ref="requiredC" v-model="req" label="Обязатальная" />
            </div>
            <div class="row">
              <div class="q-gutter-sm">
                <q-radio dense v-model="compType" val="soft" label="SOFT" />
                <q-radio dense v-model="compType" val="hard" label="HARD" />
              </div>
            </div>
            <div class="row q-mt-md">
              <q-btn color="white" text-color="black" label="Создать" @click="submit()" />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-3" >
            <q-card>
              Возьмите курс здесь:
              <ul id="v-for-object" class="demo">
                <li v-for="(categoryParent) in competencies" v-bind:key="categoryParent.catName">
                  <q-expansion-item
                    expand-separator
                    icon="perm_identity"
                    v-bind:caption="categoryParent.catName"
                  >
                    <q-expansion-item
                      v-for="category in categoryParent.categories"
                      v-bind:key="category.catName"
                      expand-separator
                      icon="perm_identity"
                      v-bind:caption="category.catName"
                    >
                      <div class="list-group-item" v-for="element in category.courses" v-bind:key="element.cId">
                        <q-card class="my-card">
                          <q-card-section>
                            <div class="row border-1">
                              <div class="col-10">{{ element.cName }}</div>
                              <div class="col" ><q-icon name="chevron_right" @click="move(element)" class="cursor-pointer" right /></div>
                            </div>
                          </q-card-section>
                        </q-card></div>
                    </q-expansion-item>
                  </q-expansion-item>
                </li>
              </ul>
            </q-card>

            <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
              <q-card class="bg-teal text-white" style="width: 300px">
                <q-card-section>
                  <div class="text-h6">Persistent</div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <div class="row">
<!--                    <q-input outlined v-model="compWeight" type="number" label="Вес" :rules="weightRules" />-->
                  </div>
                </q-card-section>

                <q-card-actions align="right" class="bg-white text-teal">
                  <q-btn flat label="OK" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
        </div>
      </div>
    </q-page>

  </template>
<script>
import {ref} from 'vue';
export default {
  name: "CompetencyPage",
  components: {
  },
  setup () {
    return {
      compName: ref(null),
      req: ref(false),
      compType: ref('soft'),
      nameRules: [val => (val && val.length > 0) || 'Введите значение!'],
    }
  },
  data() {
    return {
      competencies: null,
      competencyList: [],
      persistent: false,
    }
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchStats()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      {immediate: true}
    )
  },

  methods: {
    submit: function () {
      console.log(this.competencies);
  },
    async fetchStats() {
      const apiUrl = 'https://edu.zhcom.ru/api/courses/';
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      this.competencies = res.result;
    },
    move: function (el) {
      this.persistent = true;
      this.competencyList.push(el);
    },
    remove: function (el) {
      this.competencyList.splice(el);
    },
  }
}
</script>

<style scoped>

</style>
