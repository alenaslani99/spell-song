<template>
  <div data-mdb-input-init class="form-outline form-white mb-4">
    <label class="form-label" :for="id">{{ label }}</label>
    <input
      :name="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :type="type"
      :id="id"
      class="form-control form-control-lg"
      :placeholder="placeholder"
    />
    <p v-if="error" class="alert p-1 mt-2 alert-danger">{{ error }}</p>
  </div>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "Label",
    },
    type: {
      type: String,
      default: "text",
    },
    id: {
      type: String,
    },
    error: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    model: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
};
</script>
