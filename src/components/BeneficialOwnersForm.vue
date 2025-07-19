<template>
  <FormStep title="Beneficia Owner">
    <div>
      <p class="mt-10">Beneficial Owner information</p>
      <div class="h-[2px] mt-[-3px] w-full bg-[#5b3ff5]"></div>
      <div class="flex justify-around mt-10">
        <p class="w-2/6 text-sm">
          A beneficial owner is the individual who ultimately owns or controls the company. Please
          provide their full name, email address, and country of residence. This information is
          required for compliance purposes and can be updated later if necessary.
        </p>
        <div class="w-2/4 space-y-5">
          <div
            v-for="(benefialOwner, index) in formData.benefial_owners"
            :key="index"
            class="p-5 py-7 rounded-md space-y-5 bg-[#161b29]"
          >
            <p class="text-white font-semibold">Beneficial Owner {{ index + 1 }}</p>
            <TextInput
              label="Full name"
              v-model="formData.benefial_owners[index].full_name"
              :name="`benefial_owners[${index}].full_name`"
              placeholder="Enter beneficial owner name"
              :error="errors[`benefial_owners[${index}].full_name`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <TextInput
              label="Email"
              type="email"
              v-model="formData.benefial_owners[index].email"
              :name="`benefial_owners[${index}].email`"
              placeholder="Enter beneficial owner email"
              :error="errors[`benefial_owners[${index}].email`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <MultiselectInput
              label="Country of Residence"
              v-model="formData.benefial_owners[index].country"
              :name="`benefial_owners[${index}].country`"
              :options="countryOptions"
              :multiple="false"
              label-field="name"
              track-by="code"
              placeholder="Select a country"
              :error="errors[`benefial_owners[${index}].country`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <button
              v-if="formData.benefial_owners.length > 1"
              @click="removeBeneficialOwner(index)"
              class="mt-2 text-red-400 hover:text-red-600 underline"
            >
              Remove Shareholder
            </button>
          </div>
          <button
            @click="addBeneficialOwner"
            class="mt-4 bg-[#5b3ff5] text-white px-4 py-2 rounded-md hover:bg-[#4a32c4]"
          >
            Add Beneficial Owner
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

const addBeneficialOwner = () => {
  props.formData.benefial_owners.push({
    full_name: '',
    email: '',
    country: '',
  })
}

onMounted(() => {
  if (props.formData.benefial_owners.length == 0) addBeneficialOwner();
})

const removeBeneficialOwner = (index) => {
  props.formData.benefial_owners.splice(index, 1)
}
</script>
