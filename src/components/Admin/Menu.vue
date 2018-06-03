<template>
  <div>
    <div v-if="!$store.state.Menu.length > 0">
      <b-alert show variant="info">No items in menu</b-alert>
    </div>
    <div v-else>
      <b-table striped responsive  hover :items="$store.state.Menu" :dark="true" :fields="fields">
        <template slot="show_details" slot-scope="row">
          <b-button size="sm" @click.stop="removeItemFromMenu(row.index)" class="mr-2">X</b-button>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import {dbMenuRef} from '../../firebase/firebase-config'

export default {
  created() {
    this.$store.dispatch('importMenu', dbMenuRef)
  },
  data() {
    return {
      fields: {
        name: {
          label: 'Pizza name'
        },
        show_details: {
          label: 'Delete'
        }
      }
    }
  },
  methods: {
    removeItemFromMenu(index) {
      let key = this.$store.state.Menu[index]['.key']
      this.$store.dispatch('removeItemFromMenu', {key, index})
    }
  }
}
</script>
