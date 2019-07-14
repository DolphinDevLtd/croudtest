<template>
  <v-layout column justify-center align-center>
    <v-data-table :headers="headers" :items="users" class="elevation-1">
      <template v-slot:items="props">
        <tr id="dt-row" @click="viewUser(props.item.id)">
          <td>
            {{ props.item.id }}
          </td>
          <td class="text-xs-left">
            {{ props.item.name }}
          </td>
          <td class="text-xs-left">
            {{ props.item.email }}
          </td>
          <td class="text-xs-left">
            {{ props.item.company.name }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Id',
          align: 'left',
          sortable: false,
          value: 'id'
        },
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Company', value: 'company' }
      ]
    }
  },
  computed: {
    ...mapState('users', {
      users: state => state.users
    })
  },
  created() {
    this.allUsers()
  },
  methods: {
    viewUser(userid) {
      this.$router.push(`users/${userid}`)
    },
    ...mapActions('users', [
      'allUsers'
    ])
  }
}
</script>
<style scoped>
#dt-row{
  cursor: pointer;
}
</style>
