<template>
  <q-page>
    <h3>План развития</h3>
    <div class="q-ma-md">
      <div class="column q-ma-md">
        <div class="row q-mt-md">
          <q-select filled use-input behavior="dialog" ref="nameRef"
                    v-model="userSelect" fill-input hide-selected @filter="this.filterFn"
                    :options="userOptionsShow" label="Пользователь" hint="Введите минимум 2 символа"
                    @update:model-value="fetchUserPlans"
          />
        </div>
        <div class="row">
          <div class="col-3">

<!--            <q-select filled ref="planRef" v-model="eduPlanSelect" :options="planOptions" @update:model-value="this.fetchStats" label="Учебный план" />-->
            <q-list v-if="planOptions.length > 0" bordered separator>
              <span style="font-weight: bold"> Планы пользователя </span>
              <q-item v-for="item in planOptions" v-bind:key="item.id" v-ripple>
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div class="column">
          <div class="row">
            <span style="font-weight: bold; font-size: 16px;">Компетенции для годового развития</span></div>
          <div class="row">
            <div class="q-gutter q-pa-md">
              <q-select
                filled
                behavior="dialog"
                v-model="compGroup"
                multiple
                use-input
                :options="filteredCompOptions"
                @filter="this.filterComp"
                @update:model-value="updateCompOptions"
                use-chips
                stack-label
                label="Выбор компетенций"
              />
              <div class="row"><span style="font-weight: bold; font-size: 16px;">Курсы для годового развития</span></div>
              <q-select
                filled
                behavior="dialog"
                v-model="courseGroup"
                multiple
                use-input
                :options="filteredCoursesOptions"
                @filter="this.filterCourse"
                use-chips
                stack-label
                label="Выбор курсов"
              />
              <div class="column items-end">
                <q-btn push color="primary q-ma-md" label="Назначить" @click="submit" v-if="this.planId"  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>
<script>
import {defineComponent, ref} from 'vue';

export default defineComponent({
  name: 'IndividualPlanPage',
  components: {
  },
  setup () {
    return {
      userSelect: ref(null),
      eduPlanSelect: ref(null),
      courseGroup: ref([]),
      compGroup: ref([]),
      competenciesAsOptions: ref([]),
      filteredCompOptions: ref([]),
      filteredCoursesOptions: ref([]),
      coursesAsOptions: ref([]),
      nameRef: ref(null),
      planRef: ref(null),
      planId: ref(0),
    }
  },
  data () {
    return {
      coursesRes: [],
      planCourseList: [],
      planOptions: [],
      userOptions: [],
      userOptionsShow: ref([]),
    }
  },


  async created () {
    const usersResponse = await this.fetchUsers();
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
    this.userOptions = this.userOptionsShow = userOptions;
  },
  methods: {
    fetchCoursesForComp: async function(compId) {
      const apiUrl = 'https://edu.zhcom.ru/api/eduplan/coursesForComp/' + compId;
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res.result;
    },
    updateCompOptions: async function(val) {
      let compsArr = [];
      let coursesArr = [];
      for (const comp of val) {
        compsArr = Object.values(await this.fetchCoursesForComp(comp.value));
        compsArr.forEach(function(val) {
          coursesArr.push(
            {
              label: val.shortname,
              value: val.id
            }
          );
        })
      }
      this.coursesAsOptions = coursesArr;
    },
    fetchUserIpr: async function (userId) {
      const apiUrl = 'https://edu.zhcom.ru/api/eduplan/getIpr/' + userId;
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      this.planId = res.result.planId;
    },
    fetchIpr: async function (userId) {
      await this.fetchUserIpr(userId);

      const apiUrl = 'https://edu.zhcom.ru/api/competencies/list/forIpr/' + userId;
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      const competencies = Object.values(res.result.competencies);
      let competenciesAsOptions = [];
      competencies.forEach(function (element) {
        competenciesAsOptions.push(
          {
            label: element.name,
            value: element.id
          },
        )
      });
      this.competenciesAsOptions = competenciesAsOptions;
      1
      await this.fetchValues(this.planId);
    },
    fetchValues: async function (iprId) {
      const apiUrl = 'https://edu.zhcom.ru/api/eduplan/getIprValues/' + iprId;
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      const fetchedCourses = Object.values(res.result.courses);
      let courseValues = [];
      fetchedCourses.forEach(function (element) {
        courseValues.push(
          {
            label: element.name,
            value: element.id
          },
        )
      });
      let compValues = [];
      let coursesOptions = [];
      const fetchedCompetencies = Object.values(res.result.competencies)
      for (const element of fetchedCompetencies) {
        let fetchedCourses = [];
        fetchedCourses = Object.values(await this.fetchCoursesForComp(element.id));
        fetchedCourses.forEach((course) => {
          coursesOptions.push(
            {
              label: course.shortname,
              value: course.id
            }
          )
        });
        compValues.push(
          {
            label: element.name,
            value: element.id
          },
        )
      }
      this.compGroup = compValues;
      this.courseGroup = courseValues;
      this.coursesAsOptions = coursesOptions;
      return res;
    },
    fetchUsers: async function () {
      const apiUrl = 'https://edu.zhcom.ru/api/users/list/';
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      return res;
    },
    someFn: function (val) {
      console.log(val.value);
    },
    filterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
       this.userOptionsShow = this.userOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterComp (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredCompOptions = this.competenciesAsOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterCourse (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.filteredCoursesOptions = this.coursesAsOptions.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    fetchUserPlans: async function(user) {
      const apiUrl = 'https://edu.zhcom.ru/api/eduplan/userPlan/' + user.value;
      let res = {};
      const response = await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      const usersResponse = await res;
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
      this.planOptions = userOptions;
      await this.fetchIpr(user.value);

    },
    fetchCoursesUser: async function(user)
    {
      return []
    },
    async sendData(data) {
        const apiUrl = 'https://edu.zhcom.ru/api/eduplan/createIndPlan/';
        let res = '';
        const response = await fetch(
          apiUrl,
          {
            method: "post",
            mode: 'no-cors',
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          alert('Индивидуальный план назначен');
          location.reload();

    },
    async submit () {
      if (!this.userSelect) {
        alert('Введите имя пользователя');
        return
      }
      if (!this.planId) {
        alert('Введите план');
        return
      }
      let formData = {
        "uId": this.userSelect.value,
        "competencies": this.compGroup,
        'courses': this.courseGroup,
        'planId': this.planId
      };
      await this.sendData(formData)
    },
  }
});
</script>

<style scoped>

</style>
