<template>
  <v-list
    nav
    dense    
  >
    <v-list-item-group
      color="accent"
    >
      <v-list-item 
        v-for="link in links" 
        :key="link.name" 
        
        link
        exact
        @click="$inertia.visit(link.url)"
      >
        <v-list-item-icon>
          <v-icon>{{ link.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ link.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      links: [
        {
          name: 'Dashboard',
          icon: 'mdi-view-dashboard',
          url: '/'
        },
        {
          name: 'Users',
          icon: 'mdi-account-group',
          url: '/users'
        }
      ]
    }
  }
}
</script>