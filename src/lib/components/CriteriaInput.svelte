<script>
	export let criteriaArray;

	let currentNewCriteria = '';

	const addNewElement = (e) => {
		e.preventDefault();
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
