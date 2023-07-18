<template>
  <VContainer>
    <VCardText>
      <WelcomeTitleSubtitle subtitle="Where do you want to work?" title="Location" />
    </VCardText>

    <VRow>
      <VCol cols="12">
        <div class="mx-[1px]">
          <VAutocomplete
            ref="countryAutocompleteRef"
            v-model="selectedCountries"
            :items="allCountries"
            chips
            item-title="name"
            item-value="code"
            label="Countries"
            multiple
            no-data-text="No Country found"
            variant="outlined"
          />
        </div>
      </VCol>

      <VCol cols="12">
        <VAutocomplete
          v-model="selectedCites"
          v-model:search="city"
          :disabled="!selectedCountries.length"
          :items="suggestions"
          chips
          item-title="description"
          item-value="place_id"
          label="Cities"
          multiple
          no-data-text="No City found"
          return-object
          variant="outlined"
        ></VAutocomplete>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup>
import { useDebouncedRef } from '@U/methods'
import allCountries from '@/@core/data/countries'

const countryAutocompleteRef = ref()
const city = useDebouncedRef('', 400)

let { selectedCountries, selectedCites } = toRefs(useAppStore())

const { suggestions } = useGooglePlaces({
  apiKey: import.meta.env.VITE_GOOGLE_PLACES_API_KEY,
  input: city,
  restrictions: reactive({ country: selectedCountries })
})
</script>
