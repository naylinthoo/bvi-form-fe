<template>
  <section class="w-4/5 mx-auto mt-10 space-y-10">
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: String,
});
</script>