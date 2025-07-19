<template>
  <FormStep title="Director">
    <div>
      <p class="mt-10">Director information</p>
      <div class="h-[2px] mt-[-3px] w-full bg-[#5b3ff5]"></div>
      <div class="flex justify-around mt-10">
        <p class="w-2/6 text-sm">
          Please provide details for the company’s appointed director. This individual is
            responsible for managing the company. Enter their full name, email address, and country
            of residence. This information will appear on company documents.
        </p>
        <div class="w-2/4 space-y-5">
          <div
            v-for="(director, index) in formData.directors"
            :key="index"
            class="p-5 py-7 rounded-md space-y-5 bg-[#161b29]"
          >
            <p class="text-white font-semibold">Director {{ index + 1 }}</p>
            <TextInput
              label="Full name"
              v-model="formData.directors[index].full_name"
              :name="`directors[${index}].full_name`"
              placeholder="Enter director name"
              :error="errors[`directors[${index}].full_name`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <TextInput
              label="Email"
              type="email"
              v-model="formData.directors[index].email"
              :name="`directors[${index}].email`"
              placeholder="Enter director email"
              :error="errors[`directors[${index}].email`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <MultiselectInput
              label="Country of Residence"
              v-model="formData.directors[index].country"
              :name="`directors[${index}].country`"
              :options="countryOptions"
              :multiple="false"
              label-field="name"
              track-by="code"
              placeholder="Select a country"
              :error="errors[`directors[${index}].country`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <button
              v-if="formData.directors.length > 1"
              @click="removeDirector(index)"
              class="mt-2 text-red-400 hover:text-red-600 underline"
            >
              Remove Shareholder
            </button>
          </div>
          <button
            @click="addDirector"
            class="mt-4 bg-[#5b3ff5] text-white px-4 py-2 rounded-md hover:bg-[#4a32c4]"
          >
            Add Director
          </button>
        </div>
      </div>
    </div>
  </FormStep>
</template>

<script setup>
import FormStep from './FormStep.vue'
import TextInput from './TextInput.vue'
import MultiselectInput from './MultiselectInput.vue'
import { onMounted } from 'vue'

const props = defineProps({
  formData: Object,
  errors: Object,
  touched: Object,
  countryOptions: Array,
})
defineEmits(['mark-touched'])

const addDirector = () => {
  props.formData.directors.push({
    full_name: '',
    email: '',
    country: '',
  })
}

onMounted(() => {
  if (props.formData.directors.length == 0) addDirector();
})

const removeDirector = (index) => {
  props.formData.directors.splice(index, 1)
}
</script>
