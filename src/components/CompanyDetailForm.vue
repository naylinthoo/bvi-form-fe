<template>
  <FormStep title="Company Details">
    <div>
      <!-- Point of Contact Section -->
      <p>Point of contact</p>
      <div class="h-[2px] mt-[-3px] w-full bg-[#5b3ff5]"></div>
      <div class="flex justify-around mt-10">
        <p class="w-2/6 text-sm">
          This is the individual that we will communicate with. Communications related to this form
          but also to the company once incorporated will be sent to the same email address. You can
          change it later on if required.
        </p>
        <div class="w-2/4 space-y-5">
          <TextInput
            label="Full name"
            v-model="formData.full_name"
            name="full_name"
            placeholder="Full name"
            :error="errors.full_name"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
          <TextInput
            label="Email"
            type="email"
            v-model="formData.email"
            name="email"
            placeholder="Enter email"
            :error="errors.email"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
        </div>
      </div>

      <!-- Company Information Section -->
      <p class="mt-10">Company Information</p>
      <div class="h-[2px] mt-[-3px] w-full bg-[#5b3ff5]"></div>
      <div class="flex justify-around mt-10">
        <p class="w-2/6 text-sm">
          Every company must have a name and a deisgnation. For the company name you can use both
          letters and numbers, but not special symbols. For the designations, there is no actual
          different between one or another.
        </p>
        <div class="w-2/4 space-y-5">
          <TextInput
            label="Company name"
            v-model="formData.company_name"
            name="company_name"
            placeholder="Company name"
            :error="errors.company_name"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
          <TextInput
            label="Alternative company name"
            v-model="formData.alt_company_name"
            name="alt_company_name"
            placeholder="Alternative company name"
            :error="errors.alt_company_name"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
          <MultiselectInput
            label="Designation"
            v-model="formData.designation"
            name="designation"
            :options="designations"
            :multiple="false"
            label-field="text"
            track-by="text"
            placeholder="Select a designation"
            :error="errors.designation"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
        </div>
      </div>

      <!-- Countries of Interest Section -->
      <p class="mt-10">Countries of Interest</p>
      <div class="h-[2px] mt-[-3px] w-full bg-[#5b3ff5]"></div>
      <div class="flex justify-around mt-10">
        <p class="w-2/6 text-sm">
          We are required to check that the company will not be interacting with forbidden
          locations. For jurisdiction of operation' if you are alone, select your country of
          residency. If you have more shareholders, pick the most relevant. For 'target
          jurisdiction' select 1-3 countries that are relevant. Even if you will have clients from
          other countries, it's ok.
        </p>
        <div class="w-2/4 space-y-5">
          <MultiselectInput
            label="Jurisdiction of operation"
            v-model="formData.jurisdiction_of_operation"
            name="jurisdiction_of_operation"
            :options="countryOptions"
            :multiple="false"
            label-field="name"
            track-by="code"
            placeholder="Select a country"
            :error="errors.jurisdiction_of_operation"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
          <MultiselectInput
            label="Other countries of operation"
            v-model="formData.selected_countries"
            name="selected_countries"
            :options="countryOptions"
            :multiple="true"
            label-field="name"
            track-by="code"
            placeholder="Select countries"
            :error="errors.selected_countries"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
        </div>
      </div>

      <!-- Shares Structure Section -->
      <p class="mt-10">Shares Structure</p>
      <div class="h-[2px] mt-[-3px] w-full bg-[#5b3ff5]"></div>
      <div class="flex justify-around mt-10">
        <p class="w-2/6 text-sm">
          All companies must have at least 1 share. Apart from that, you can structure things in
          whatever way you like. Issued shares are shares that will be distributed from day 1.
          Unissued shares are shares that you can distribute later on, i.e. to future team members
          or investors. The value per shares represents your personal liability, so, if you wish to
          reduce risks, just pick the smallest number.
        </p>
        <div class="w-2/4 space-y-5">
          <TextInput
            label="Total number of shares"
            type="number"
            v-model="formData.number_of_shares"
            name="number_of_shares"
            placeholder="Enter number of shares"
            :error="errors.number_of_shares"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
          <div>
            <p class="mb-3">Are all shares issued?</p>
            <div class="flex flex-col space-y-3">
              <label
                class="p-2 px-4 bg-[#1e2434] rounded-md flex items-center space-x-2 cursor-pointer"
              >
                <fa
                  :icon="
                    formData.all_shared_issued === true ? ['fas', 'circle-dot'] : ['far', 'circle']
                  "
                />
                <input
                  type="radio"
                  name="issued"
                  :value="true"
                  @blur="$emit('mark-touched', 'all_shared_issued')"
                  v-model="formData.all_shared_issued"
                  class="sr-only"
                  required
                />
                <span>Yes</span>
              </label>

              <label
                class="p-2 px-4 bg-[#1e2434] rounded-md flex items-center space-x-2 cursor-pointer"
              >
                <fa
                  :icon="
                    formData.all_shared_issued === false ? ['fas', 'circle-dot'] : ['far', 'circle']
                  "
                />
                <input
                  type="radio"
                  name="issued"
                  :value="false"
                  @blur="$emit('mark-touched', 'all_shared_issued')"
                  v-model="formData.all_shared_issued"
                  class="sr-only"
                  required
                />
                <span>No</span>
              </label>
            </div>
            <p
              :class="{
                visible: errors.all_shared_issued && touched.all_shared_issued,
                invisible: !errors.all_shared_issued || !touched.all_shared_issued,
              }"
              class="text-sm block min-h-5 w-full text-red-400 mt-1"
            >
              {{ errors.all_shared_issued }}
            </p>
          </div>
          <!-- Add RadioInput for all_shared_issued if needed -->
          <TextInput
            v-if="formData.all_shared_issued === false"
            label="Number of issued shares"
            type="number"
            v-model="formData.number_of_issued_shares"
            name="number_of_issued_shares"
            placeholder="Enter number of issued shares"
            :error="errors.number_of_issued_shares"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
          <TextInput
            label="Value per share (USD)"
            type="number"
            v-model="formData.value_per_share"
            name="value_per_share"
            placeholder="Enter value per share"
            :error="errors.value_per_share"
            :touched="touched"
            @mark-touched="$emit('mark-touched', $event)"
          />
        </div>
      </div>
    </div>
  </FormStep>
</template>

<script setup>
import FormStep from './FormStep.vue'
import TextInput from './TextInput.vue'
import MultiselectInput from './MultiselectInput.vue'

defineProps({
  formData: Object,
  errors: Object,
  touched: Object,
  designations: Array,
  countryOptions: Array,
})
defineEmits(['update:form-data', 'mark-touched'])
</script>
