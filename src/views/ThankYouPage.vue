<script setup lang="ts">
import router from '@/router'
</script>

<template>
  <div class="w-screen h-screen bg-[#0c1124] flex justify-center items-center">
    <div
      class="inline-block rounded-md text-white p-10 flex flex-col items-center bg-[#161b29] space-y-5"
    >
      <fa :icon="['fas', 'circle-check']" class="text-white text-green-300 text-6xl" />
      <p class="text-md text-thin text-green-300">Form Submitted Successfully</p>
      <pre class="font-sans text-center">
Thank you! The form has been submitted successfully. 
        We will reply to you back soon!</pre
      >
    </div>
  </div>
</template>
