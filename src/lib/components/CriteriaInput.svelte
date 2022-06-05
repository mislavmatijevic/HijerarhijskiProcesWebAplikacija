<script>
	export let criteriaArray;

	let currentNewCriteria = '';

	/**
	 * Adds new criteria in the application.
	 * Criterias are root of future calculations.
	 * @param event Click event.
	 */
	const addNewElement = (event) => {
		event.preventDefault();
		if (currentNewCriteria !== '') {
			criteriaArray = [...criteriaArray, currentNewCriteria];
			currentNewCriteria = '';
		}
	};
</script>

<form>
	<input id="input_criteria" bind:value={currentNewCriteria} />
	<button on:click={addNewElement}> Dodaj kriterij </button>
</form>
