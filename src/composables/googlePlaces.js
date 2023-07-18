// Function to verify the existence of a script by its source link

let autocompleteSerivce

// Exported function to use Google Places API for autocomplete suggestions
export const useGooglePlaces = (options) => {
  const response = reactive({
    suggestions: []
  })

  const { input, restrictions, apiKey } = options

  // Link to the Google Maps API with the necessary libraries and API key
  const link = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`

  // Function to fetch autocomplete suggestions
  async function fetchSuggestions() {
    let request = {
      input: input.value,
      types: ['locality'],
      componentRestrictions: restrictions
    }

    // Call the Google Maps AutocompleteService to get place predictions based on the request
    autocompleteSerivce.getPlacePredictions(request, (predictions, status) => {
      // eslint-disable-next-line no-undef
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // If the status is OK, update the suggestions in the response object
        response.suggestions = predictions
      }
    })
  }

  // Lifecycle hook when the component is mounted
  onMounted(async () => {
    // Verify the existence of the Google Maps script by its link
    await verifyScriptExistence(link)
    // eslint-disable-next-line no-undef
    autocompleteSerivce = new google.maps.places.AutocompleteService()
  })

  // Watcher for changes in the input value
  watch(input, () => {
    fetchSuggestions()
  })

  // Return reactive references to the response object
  return toRefs(response)
}

function verifyScriptExistence(link) {
  return new Promise((resolve, reject) => {
    let googleScript = document.querySelector(`script[src="${link}"]`)

    // If the script does not exist, create a new script element and append it to the head of the document
    if (!googleScript) {
      googleScript = document.createElement('script')
      googleScript.src = link
      googleScript.async = true
      document.head.append(googleScript)

      // Event listener for script error
      googleScript.addEventListener('error', () => {
        reject()
      })

      // Event listener for script load
      googleScript.addEventListener('load', () => {
        resolve()
      })
    }
  })
}
