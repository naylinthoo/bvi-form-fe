<template>
  <FormStep title="Shareholders">
    <div>
      <p class="mt-10">Shareholder Details</p>
      <div class="h-[2px] mt-[-3px] w-full bg-[#5b3ff5]"></div>
      <div class="flex justify-around mt-10">
        <p class="w-2/6 text-sm">
          Please provide details for each shareholder. At least one shareholder is required. The
          total number of shares assigned should match the total number of shares
          {{ formData.all_shared_issued ? '' : '(or issued shares)' }} specified in the previous
          step.
        </p>
        <div class="w-2/4 space-y-5">
          <div class="bg-[#161b29] p-3 rounded-md">
            Total issued shares : <span class="font-bold">{{
              formData.all_shared_issued
                ? formData.number_of_shares
                : formData.number_of_issued_shares
            }}</span>
          </div>
          <div
            v-for="(shareholder, index) in formData.shareholders"
            :key="index"
            class="p-5 py-7 rounded-md space-y-5 bg-[#161b29]"
          >
            <p class="text-white font-semibold">Shareholder {{ index + 1 }}</p>
            <TextInput
              label="Full name"
              v-model="formData.shareholders[index].full_name"
              :name="`shareholders[${index}].full_name`"
              placeholder="Enter shareholder name"
              :error="errors[`shareholders[${index}].full_name`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <TextInput
              label="Email"
              type="email"
              v-model="formData.shareholders[index].email"
              :name="`shareholders[${index}].email`"
              placeholder="Enter shareholder email"
              :error="errors[`shareholders[${index}].email`]"
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <TextInput
              label="Number of shares"
              type="number"
              v-model="formData.shareholders[index].number_of_shares"
              :name="`shareholders[${index}].number_of_shares`"
              placeholder="Enter number of shares"
              :error="
                errors[`shareholders[${index}].number_of_shares`] ||
                (typeof errors.shareholders === 'string' ? errors.shareholders : '')
              "
              :touched="touched"
              @mark-touched="$emit('mark-touched', $event)"
            />
            <button
              v-if="formData.shareholders.length > 1"
              @click="removeShareHolder(index)"
              class="mt-2 text-red-400 hover:text-red-600"
            >
              Remove Shareholder
            </button>
          </div>
          <button
            @click="addShareHolder"
            class="mt-4 bg-[#5b3ff5] text-white px-4 py-2 rounded-md hover:bg-[#4a32c4] underline"
          >
            Add Shareholder
          </button>
          <p
            v-if="errors.shareholders && typeof errors.shareholders === 'string'"
            class="text-sm text-red-400 mt-2"
          >
            {{ errors.shareholders }}
          </p>
        </div>
      </div>
    </div>
  </FormStep>
</template>

<script setup>
import { onMounted } from 'vue'
import FormStep from './FormStep.vue'
import TextInput from './TextInput.vue'

const props = defineProps({
  formData: Object,
  errors: Object,
  touched: Object,
})
defineEmits(['mark-touched'])

onMounted(() => {
  if (props.formData.shareholders.length === 0) addShareHolder()
})

const addShareHolder = () => {
  props.formData.shareholders.push({
    full_name: '',
    email: '',
    number_of_shares: null,
  })
}

const removeShareHolder = (index) => {
  props.formData.shareholders.splice(index, 1)
}
</script>
