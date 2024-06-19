<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          href="/local/educationplan/cabinet/"
        />
        <q-toolbar-title>
          Кабинет учителя
        </q-toolbar-title>
        <q-btn href="https://edu.zhcom.ru" filled label="Вернуться на портал" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <Suspense>
        <router-view />
      </Suspense>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'MainLayout',

  components: {
  },
})
</script>

