<template>
  <div class="form-check form-check-inline">
    <input
      v-model="model"
      class="form-check-input"
      type="checkbox"
      :id="inputValue"
    />
    <label class="form-check-label" :for="inputValue">{{ label }}</label>
  </div>
</template>
<script>
export default {
  name: "CheckBox",
  props: {
    label: {
      type: String,
      default: "Label",
    },
    inputValue: {
      type: String,
    },
  },
  computed: {
    model: {
      get() {
        return this.valuel;
      },
      set() {
        this.$emit("input", value);
      },
    },
  },
};
</script>
