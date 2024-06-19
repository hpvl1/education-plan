<template>
  <div class="row ">
    <q-select
      filled
      v-model="nameSelect"
      use-input
      input-debounce="0"
      @new-value="this.createValue"
      :options="filterOptions"
      style="width: 250px"
      @filter="filterFn"
      @update:model-value="this.checkExistRedirect"
      :rules="rules"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]
export default {
  name: "CompetencySelect",
  emits: ['fillCompName'],
  props: [ 'opts', 'rules' ],
  setup () {
    return {
      nameSelect: ref(null),
      filterOptions: ref([]),
      stringOptions,
    }
  },
  methods: {
    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = this.opts;
        }
        else {
          const needle = val.toLowerCase();
          this.filterOptions = this.opts.filter(
            v => v.label.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    },
    createValue: function (val, done) {
      done(val);
      this.$emit('fillCompName', val);
    },
    checkExistRedirect: function (val) {
        for(let i = 0; i < this.opts.length; i++){
          if( this.opts[i].label === val || this.opts[i].label === val.label ){
            this.$router.push({ name: 'editcomp', query: { compId: this.opts[i].value } })
            // window.location.reload();
          }
        }
    }
  },
}
</script>

<style scoped>

</style>
