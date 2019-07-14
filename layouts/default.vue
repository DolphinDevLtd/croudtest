<template>
  <v-app dark>
    <Toolbar />
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from '~/components/Toolbar.vue'
export default {
  components: {
    Toolbar
  }
}
</script>
