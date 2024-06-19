<template>
  <div>
    <q-select filled v-model="eduCourseCatSelect" :options="cats" label="Категория курса" @update:model-value="this.changeBase" />
    <div v-for="(catg, index) in this.catTree" v-bind:key="catg.id" >
      <q-select filled :options="catg.categories" label="Подкатегории"  @update:model-value="evt => { this.fetchCats(evt, index)}" v-model="catg.val" />
    </div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  name: "CourseCatSelect",
  props: ['cats'],
  emits: ['fetchCourses'],
  setup () {
    return {
      eduCourseCatSelect: ref(null),
      categories: ref([]),
      cat: ref(null),
      currentCat: ref(null),
      secVisibility: ref(false),
      catTree: ref([]),
      depth: ref(0)
    };
  },
  methods: {
    changeBase: async function(val) {
      this.catTree = [];
      this.depth = 1;
      await this.fetchCats(val);
    },
    fetchCats: async function (val, index = 0) {
      const catId = val.value;
      const apiUrl = 'https://edu.zhcom.ru/api/coursesCats/' + catId;
      let res = {};
      await fetch(apiUrl)
        .then(response => response.json())
        .then(aJson => {
          res = aJson
        })
      this.categories = Object.values(
        res.result
      );
      let catOptions = [];
      this.categories.forEach(function (element) {
        catOptions.push(
          {
            label: element.name,
            value: element.id
          }
        )
      });
      this.currentCat = val;
      this.$emit('fetchCourses', this.currentCat)
      this.secVisibility = catOptions.length > 0;
      this.categories = catOptions;
      if (this.secVisibility) {
        if (index++ !== this.catTree.length) {
          this.catTree = this.catTree.slice(0, index);
        }
        this.catTree.push({id: this.depth, categories: catOptions, value: val})
      }
    },
  }
}
</script>

<style scoped>

</style>
