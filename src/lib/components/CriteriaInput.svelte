<script>
	export let criteraArray;

	let currentNewCriteria = '';

	const addNewElement = (e) => {
		e.preventDefault();
		if (currentNewCriteria !== '') {
			criteraArray = [...criteraArray, currentNewCriteria];
			currentNewCriteria = '';
		}
	};
</script>

<form>
	<input id="input_criteria" bind:value={currentNewCriteria} />
	<button on:click={addNewElement}> Dodaj kriterij </button>
</form>
