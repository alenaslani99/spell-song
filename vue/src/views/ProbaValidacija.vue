<template>
  <h1>Proba</h1>
  <Form @submit="onSubmit" :validation-schema="schema" v-slot="errors">
    <div class="form-group col-5">
      <label>First Name</label>
      <Field
        v-model="firstName"
        name="firstName"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.firstName }"
      />
      <div class="invalid-feedback">{{ errors.firstName }}</div>
      <p>{{ errors.firstName }}</p>
    </div>
    <div class="form-group col">
      <label>Email</label>
      <Field
        name="email"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.email }"
      />
      <div class="invalid-feedback">{{ errors.email }}</div>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary mr-1">Submit</button>
    </div>
  </Form>
</template>
<script>
import { Form, Field } from "vee-validate";
import * as Yup from "yup";
export default {
  components: { Form, Field },
  data() {
    const schema = Yup.object().shape({
      firstName: Yup.string().required("First name is required."),
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),
    });
    return {
      schema,
    };
  },
  methods: {
    onSubmit(values) {
      alert("SUCCESS!! :-)\n\n" + JSON.stringify(values, null, 4));
    },
  },
};
</script>
