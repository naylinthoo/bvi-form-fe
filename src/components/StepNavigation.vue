<template>
    <ul class="flex justify-evenly mt-10">
    <li v-for="(step, index) in steps" :key="index">
      <div class="flex space-x-2 items-center">
        <div
          class="flex h-12 w-12 rounded-full justify-center items-center"
          :class="currentStep === index ? 'bg-[#5b3ff5] text-white' : 'bg-[#272d3b] text-gray-400'"
        >
          {{ index + 1 }}
        </div>
        <p :class="currentStep === index ? 'text-[#5b3ff5]' : 'text-gray-400'">
          {{ step.label }}
        </p>
      </div>
    </li>
  </ul>
</template>
<script setup>
defineProps({
    steps: Array,
    currentStep: Number
})
</script>