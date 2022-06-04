<script>
	import { getHtmlTagName } from './../functions/getHtmlTagName.js';
	export let criteriaArray;
	export let observedElements;
	export let currentObservedElementIndex;

	const clearAllInputs = () => {
		criteriaArray.forEach((criteria) => {
			document.querySelector(`#${getHtmlTagName(criteria)}`).value = '';
		});
	};

	/**
	 * Creates a new object according to existing attributes and entered attribute names.
	 * Saves object into 'observedElements' array.
	 * @param event Event from form's submit button.
	 */
	const saveCurrentElement = (event) => {
		event.preventDefault();
		const object = {};
		criteriaArray.forEach((criteria) => {
			object[criteria] = document.querySelector(`#${getHtmlTagName(criteria)}`).value;
		});

		if (currentObservedElementIndex < 0) {
			currentObservedElementIndex = 0;
		} else if (currentObservedElementIndex > observedElements.length) {
			currentObservedElementIndex = observedElements.length;
		}

		if (currentObservedElementIndex == observedElements.length) {
			observedElements = [...observedElements, object];
			currentObservedElementIndex = observedElements.length;
			clearAllInputs();
		} else if (currentObservedElementIndex < observedElements.length) {
			observedElements[currentObservedElementIndex] = object;
		}
	};

	/**
	 * Fills input values with current element's values.
	 * Serves to show user data of currently selected object.
	 */
	const bindInputsWithCurrentElement = () => {
		if (currentObservedElementIndex < 0 || currentObservedElementIndex > observedElements.length) {
			return;
		}

		if (currentObservedElementIndex == observedElements.length) {
			clearAllInputs();
		} else {
			criteriaArray.forEach((criteria) => {
				let currentCriteria = observedElements[currentObservedElementIndex][criteria];

				if (currentCriteria === undefined) {
					currentCriteria = '';
				}

				document.querySelector(`#${getHtmlTagName(criteria)}`).value = currentCriteria;
			});
		}
	};
</script>

<form>
	<h2>
		{#if currentObservedElementIndex == observedElements.length}
			Nova
		{:else}
			{currentObservedElementIndex + 1}
		{/if} vrijednost
	</h2>
	<button
		on:click={(e) => {
			e.preventDefault();
			if (currentObservedElementIndex > 0) {
				currentObservedElementIndex--;
				bindInputsWithCurrentElement();
			}
		}}>&lt;-</button
	>
	<button
		on:click={(e) => {
			e.preventDefault();
			if (currentObservedElementIndex < observedElements.length) {
				currentObservedElementIndex++;
				bindInputsWithCurrentElement();
			}
		}}>-&gt;</button
	>
	<br />
	{#each criteriaArray as criteria}
		<label for={getHtmlTagName(criteria)}>{criteria}: </label>
		<input id={getHtmlTagName(criteria)} type="number" />
		<br />
	{/each}
	{#if criteriaArray.length > 0}
		<button on:click={saveCurrentElement}>
			{#if currentObservedElementIndex == observedElements.length}
				Dodaj novi element u tablicu
			{:else}
				Pohrani {currentObservedElementIndex + 1} element.
			{/if}
		</button>
	{/if}
</form>
