<template>
  <div class="bg-[#0c1124] min-h-screen w-full text-white">
    <h2 class="text-center pt-7 text-2xl font-bold tracking-widest">
      Time to start your BVI company!
    </h2>
    <pre class="text-center font-light text-xs pt-3 font-sans text-gray-400">
      All questions below must be answered. Take your time, and if you need to 
      take a break, the form will save automatically and you can continue later. 
      Good Luck!
    </pre>
    <StepNavigation :steps="steps" :current-step="currentStep" />
    <component
      :is="steps[currentStep].component"
      :form-data="formData"
      :errors="errors"
      :touched="touched"
      :designations="designations"
      :country-options="countryOptions"
      @update:form-data="$emit('update:form-data', $event)"
      @mark-touched="markTouched"
    />
    <section class="mx-auto flex w-4/5 items-center justify-between mt-14 py-14">
      <button
        type="button"
        @click="goToPrev"
        class="bg-[#1e2434] px-4 py-3"
        :class="{ disabled: currentStep == 0 }"
      >
        <fa :icon="['fas', 'arrow-left-long']" /> BACK
      </button>
      <button type="button" @click="goToNext" class="bg-[#5b3ff5] px-4 py-3">
        NEXT <fa :icon="['fas', 'arrow-right-long']" />
      </button>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, markRaw } from 'vue';
import axios from 'axios';
import router from '@/router';
import StepNavigation from '../components/StepNavigation.vue';
import CompanyDetailsForm from '../components/CompanyDetailForm.vue';
import ShareholdersForm from '../components/ShareholdersForm.vue';
import BeneficialOwnersForm from '../components/BeneficialOwnersForm.vue';
import DirectorsForm from '../components/DirectorsForm.vue';
import { countries } from 'countries-list';

const countryOptions = Object.entries(countries).map(([code, { name }]) => ({
  code,
  name,
}));
const designations = ref([
  { text: 'Ltd.' },
  { text: 'Pvt.Ltd.' },
  { text: 'LLC' },
  { text: 'Inc.' },
  { text: 'PLC' },
  { text: 'Co.,Ltd' },
  { text: 'GmbH' },
  { text: 'SARL' },
]);
const currentStep = ref(0);
const errors = ref({});
const touched = ref({});

const steps = ref([
  { label: 'Company Details', component: markRaw(CompanyDetailsForm) },
  { label: 'Shareholders', component: markRaw(ShareholdersForm) },
  { label: 'Beneficial Owner', component: markRaw(BeneficialOwnersForm) },
  { label: 'Director', component: markRaw(DirectorsForm) },
]);

const formData = ref({
  full_name: '',
  email: '',
  company_name: '',
  alt_company_name: '',
  designation: '',
  jurisdiction_of_operation: '',
  selected_countries: [],
  number_of_shares: null,
  all_shared_issued: null,
  number_of_issued_shares: null,
  value_per_share: null,
  shareholders: [],
  benefial_owners: [], // Typo preserved from original
  directors: [],
});

// Validation logic for all steps
const validateStep = (stepIndex) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const newErrors = {};

  if (stepIndex === 0) {
    if (!formData.value.full_name) newErrors.full_name = 'Full name is required';
    if (!formData.value.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.value.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!formData.value.company_name) newErrors.company_name = 'Company name is required';
    if (!formData.value.alt_company_name) newErrors.alt_company_name = 'Alternative name required';
    if (!formData.value.designation) newErrors.designation = 'Select a designation';
    if (!formData.value.jurisdiction_of_operation)
      newErrors.jurisdiction_of_operation = 'Select a country';
    if (formData.value.selected_countries.length === 0)
      newErrors.selected_countries = 'Select at least one country';
    if (!formData.value.number_of_shares)
      newErrors.number_of_shares = 'Number of shares is required';
    if (formData.value.all_shared_issued === null)
      newErrors.all_shared_issued = 'Select if all shares are issued';
    if (formData.value.all_shared_issued === false) {
      if (
        formData.value.number_of_issued_shares === null ||
        formData.value.number_of_issued_shares === ''
      ) {
        newErrors.number_of_issued_shares = 'Number of issued shares is required';
      } else if (
        Number(formData.value.number_of_issued_shares) >=
        Number(formData.value.number_of_shares)
      ) {
        newErrors.number_of_issued_shares =
          'Number of issued shares cannot be greater than total shares';
      }
    }
    if (!formData.value.value_per_share)
      newErrors.value_per_share = 'Value per share is required';
  }

  if (stepIndex === 1) {
    formData.value.shareholders.forEach((shareholder, index) => {
      if (!shareholder.full_name)
        newErrors[`shareholders[${index}].full_name`] = 'Full name is required';
      if (!shareholder.email) {
        newErrors[`shareholders[${index}].email`] = 'Email is required';
      } else if (!emailRegex.test(shareholder.email)) {
        newErrors[`shareholders[${index}].email`] = 'Enter a valid email address';
      }
      if (!shareholder.number_of_shares) {
        newErrors[`shareholders[${index}].number_of_shares`] =
          'Number of shares is required';
      }
    });
    const totalShares = formData.value.shareholders.reduce(
      (acc, curr) => acc + Number(curr.number_of_shares || 0),
      0,
    );
    if (
      totalShares !==
      Number(
        formData.value.all_shared_issued
          ? formData.value.number_of_shares
          : formData.value.number_of_issued_shares,
      )
    ) {
      newErrors.shareholders = 'Total shares held must equal the number issued';
    }
  }

  if (stepIndex === 2) {
    formData.value.benefial_owners.forEach((owner, index) => {
      if (!owner.full_name)
        newErrors[`benefial_owners[${index}].full_name`] = 'Full name is required';
      if (!owner.email) {
        newErrors[`benefial_owners[${index}].email`] = 'Email is required';
      } else if (!emailRegex.test(owner.email)) {
        newErrors[`benefial_owners[${index}].email`] = 'Enter a valid email address';
      }
      if (!owner.country)
        newErrors[`benefial_owners[${index}].country`] = 'Select a country';
    });
  }

  if (stepIndex === 3) {
    formData.value.directors.forEach((director, index) => {
      if (!director.full_name)
        newErrors[`directors[${index}].full_name`] = 'Full name is required';
      if (!director.email) {
        newErrors[`directors[${index}].email`] = 'Email is required';
      } else if (!emailRegex.test(director.email)) {
        newErrors[`directors[${index}].email`] = 'Enter a valid email address';
      }
      if (!director.country)
        newErrors[`directors[${index}].country`] = 'Select a country';
    });
  }

  errors.value = newErrors;
  return Object.keys(newErrors).length === 0;
};

const markTouched = (key) => {
  touched.value[key] = true;
  validateStep(currentStep.value);
};

const goToNext = () => {
  if (validateStep(currentStep.value)) {
    console.log("validated and ", currentStep.value)
    if (currentStep.value < steps.value.length - 1) {
      currentStep.value += 1;
      localStorage.setItem('step', currentStep.value);
      scrollToTop();
    } else {
      saveFormRequest();
    }
  } else {
    touched.value = {
      ...touched.value,
      ...Object.keys(errors.value).reduce((acc, key) => ({ ...acc, [key]: true }), {}),
    };
  }
};

const goToPrev = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1;
    localStorage.setItem('step', currentStep.value);
    scrollToTop();
  }
};

const saveFormRequest = async () => {
  try {
    await axios.post('http://localhost:80/api/form/save', formData.value, {
      headers: { 'Content-Type': 'application/json' },
    });
    localStorage.removeItem('bvi_form_data')
    localStorage.removeItem('step')
    router.push('/success');
  } catch (error) {
    console.error(error.response.data);
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Load saved data from localStorage
onMounted(() => {
  const savedData = localStorage.getItem('bvi_form_data');
  const savedStep = localStorage.getItem('step');
  if (savedData) formData.value = JSON.parse(savedData);
  if (savedStep) currentStep.value = parseInt(savedStep);
});

// Save form data to localStorage
watch(formData, (newValue) => {
  localStorage.setItem('bvi_form_data', JSON.stringify(newValue));
  localStorage.setItem('step', currentStep.value);
}, { deep: true });
</script>