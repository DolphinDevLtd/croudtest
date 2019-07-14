<template>
  <v-toolbar :clipped-left="clipped" fixed app>
    <v-btn icon to="/">
      <v-icon>web</v-icon>
    </v-btn>

    <v-toolbar-title v-text="title" />
  </v-toolbar>
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      title: 'Croud Test'
    }
  }
}
</script>
