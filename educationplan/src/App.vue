
  <template>
<!--    v-if="store.isAdmin"-->
    <router-view />
  </template>
<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useCounterStore } from "stores/user";
export default defineComponent({
  name: 'App',
  setup() {
    const store = useCounterStore()
    return {
      store
    }
  },
  async beforeMount () {
    const $q = useQuasar()
    $q.loading.show();
    const sto = useCounterStore()
    await sto.getIsAdmin();
    $q.loading.hide();
  },
})
</script>
