<template>
  <div>
    <div role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion1 variant="light">User data</b-btn>
        </b-card-header>
        <b-collapse id="accordion1" visible accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <div>
              <span v-b-modal.email>change email</span>
            </div>
            <hr>
            <div>
              <span v-b-modal.password>change password</span>
            </div>
            <hr>
          </b-card-body>
        </b-collapse>
      </b-card>
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-btn block href="#" v-b-toggle.accordion2 variant="light">Application settings</b-btn>
        </b-card-header>
        <b-collapse id="accordion2" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minus fugit officiis ducimus perferendis neque quam accusamus quod? Velit dicta nam ex placeat rerum sit, consequatur, quod optio libero fuga voluptate.
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>

    <!-- Modal -->
    <b-modal id="email" hide-footer title="Change your email">
      <label for="">Email:</label>
      <input type="email" class="form-control" :value="$store.state.email">
    </b-modal>
    <b-modal id="password" hide-footer title="Change your password">
      <label for="">Password:</label>
      <input type="email" class="form-control" :value="$store.state.email">
    </b-modal>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isEdit: false,
        isEditEmail: false,
        showCollapse: true
      }
    },
    methods: {
      editUserData() {
        this.isEdit = !this.isEdit
      },
      editEmail() {
        this.isEditEmail = true
      }
    }
  }
</script>


