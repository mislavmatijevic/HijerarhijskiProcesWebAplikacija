<script>
	export let observedElements;
	export let currentObservedElementIndex;

	/**
	 * Deletes an element from the table for entered index.
	 * @param event Click event.
	 */
	const deleteElement = (event) => {
		event.preventDefault();
		const indexForDeletion = document.querySelector('#input_deletion').value;
		if (indexForDeletion !== undefined && indexForDeletion >= 0) {
			observedElements.splice(indexForDeletion, 1);
			observedElements = [...observedElements];

			if (currentObservedElementIndex > observedElements.length) {
				currentObservedElementIndex = observedElements.length;
			}
		}
	};
</script>

<form>
	<input id="input_deletion" />
	<button on:click={deleteElement}
		>Izbriši element po indeksu (0-{observedElements.length - 1})</button
	>
</form>
