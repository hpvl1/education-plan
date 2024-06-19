<template>
  <q-page>
    <div class="row">
      <div class="col-5 flex flex-center">
        <StatisticTable />
      </div>
      <div class="col">
        <div class="column">
          <div class="col"><q-btn to="competencies/list/" label="Компетенции" outline color="purple" /></div>
          <div class="col"><q-btn to="plans/list/" label="Учебные планы" outline color="purple" /></div>
          <div class="col"><q-btn to="eduplan/adduser/" label="Назначить учебный план" outline color="purple" /></div>
          <div class="col"><q-btn to="eduplan/individual/" label="Назначить план развития" outline color="purple" /></div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import StatisticTable from "components/StatisticTable.vue";


export default defineComponent({
  name: 'IndexPage',
  components: {StatisticTable},
})
</script>
<style lang="sass" scoped>
@import "../css/main.sass"
</style>
