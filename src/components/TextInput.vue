<template>
  <div>
    <p class="mb-3">{{ label }}</p>
    <div class="relative">
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('mark-touched', name)"
        class="bg-[#1e2434] p-2 w-full rounded-md"
        :class="{
          'focus:outline-none ring-1 ring-green-500': !error && touched[name],
          'focus:outline-none ring-1 ring-red-500': error && touched[name],
        }"
        :placeholder="placeholder"
      />
      <fa
        v-if="!error && touched[name]"
        :icon="['fas', 'check-circle']"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500"
      />
      <fa
        v-if="error && touched[name]"
        :icon="['fas', 'exclamation-circle']"
        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500"
      />
    </div>
    <p
      :class="{ visible: error && touched[name], invisible: !error || !touched[name] }"
      class="text-sm block min-h-5 w-full text-red-400 mt-1"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup>

defineProps({
  label: String,
  type: { type: String, default: 'text' },
  modelValue: [String, Number],
  name: String,
  placeholder: String,
  error: String,
  touched: Object,
});

defineEmits(['update:modelValue', 'mark-touched']);
</script>