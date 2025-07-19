<template>
  <div>
    <p class="mb-3">{{ label }}</p>
    <Multiselect
      :modelValue="toMultiselectValue"
      @update:modelValue="$emit('update:modelValue', transformOutput($event))"
      @close="$emit('mark-touched', name)"
      :options="options"
      :multiple="multiple"
      :select-label="''"
      :deselect-label="''"
      :label="labelField"
      :track-by="trackBy"
      :placeholder="placeholder"
      class="w-full rounded-md"
      :class="{
        'ring-1 ring-green-500': !error && touched[name],
        'ring-1 ring-red-500': error && touched[name],
      }"
    />
    <p
      :class="{ visible: error && touched[name], invisible: !error || !touched[name] }"
      class="text-sm block min-h-5 w-full text-red-400 mt-1"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import Multiselect from 'vue-multiselect';
import { computed, watch } from 'vue';

const props = defineProps({
  label: String,
  modelValue: [String, Array, Object],
  name: String,
  options: Array,
  multiple: Boolean,
  labelField: String,
  trackBy: String,
  placeholder: String,
  error: String,
  touched: Object,
});
defineEmits(['update:modelValue', 'mark-touched']);

// Convert modelValue (string or array of strings) to vue-multiselect format (object or array of objects)
const toMultiselectValue = computed(() => {
  if (!props.options || !props.trackBy) {
    console.warn(`[${props.name}] No options or trackBy provided`, {
      options: props.options,
      trackBy: props.trackBy,
    });
    return props.multiple ? [] : null;
  }

  if (props.multiple && Array.isArray(props.modelValue)) {
    const result = props.modelValue
      .map((val) => props.options.find((option) => option[props.trackBy] === val))
      .filter(Boolean);
    return result;
  }

  const result = props.modelValue
    ? props.options.find((option) => option[props.trackBy] === props.modelValue) || null
    : null;
  return result;
});

// Convert vue-multiselect output (object or array of objects) to formData format (string or array of strings)
const transformOutput = (value) => {
  if (Array.isArray(value)) {
    const result = value.map((item) => item[props.trackBy]);
    return result;
  }
  const result = value ? value[props.trackBy] : '';
  return result;
};

</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
.multiselect .multiselect__single {
  background-color: #1e2434 !important;
  color: white;
}
.multiselect .multiselect__tags {
  background-color: #1e2434 !important;
}

.multiselect .multiselect__input {
  background-color: #1e2434 !important;
}

.multiselect .multiselect__content-wrapper {
  background-color: #1e2434 !important;
}

.multiselect .multiselect__tag {
  color: #ffffff;
  background-color: #5b3ff5 !important;
}

.multiselect .multiselect__tag-icon::after {
  color: white;
}

.multiselect .multiselect__content {
  background-color: #1e2434 !important;
  color: #ffffff;
}

.multiselect__content .multiselect__element {
  background-color: #1e2434 !important;
}

.multiselect .multiselect__option--selected {
  background: #1e2434;
  color: #ffffff !important;
}

.multiselect .multiselect__option--highlight {
  background-color: #5b3ff5 !important; /* Tailwind green-500 */
  color: #ffffff !important;
}

:deep(.your-multiselect-container .multiselect__tag-icon) {
  display: none !important;
}

/* Prevent hover style on the icon (if it were visible) */
:deep(.your-multiselect-container .multiselect__tag-icon:hover) {
  background: none !important;
  color: inherit !important;
}
</style>