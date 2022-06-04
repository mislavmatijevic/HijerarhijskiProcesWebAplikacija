<script>
	export let criteraArray;
	export let observedElements;
	export let currentObservedElementIndex;

	/**
	 * Turns name of a criteria from human-readable into HTML 'id' format for input fields.
	 * e.g.: Camera (MP) -> input_camera_mp
	 * @param normalCritera Normal name of what is to become 'id' attribute value.
	 */
	const giveHtmlValue = (normalCritera) => {
		return (
			'input_' +
			normalCritera
				.trim()
				.replace(/\s/gi, '_')
				.replace(/(\(|\))/gi, '')
				.toLowerCase()
		);
	};

	const clearAllInputs = () => {
		criteraArray.forEach((criteria) => {
			document.querySelector(`#${giveHtmlValue(criteria)}`).value = '';
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
		criteraArray.forEach((criteria) => {
			object[criteria] = document.querySelector(`#${giveHtmlValue(criteria)}`).value;
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
			criteraArray.forEach((criteria) => {
				const currentCriteria = observedElements[currentObservedElementIndex][criteria];

				if (currentCriteria === undefined) {
					currentCriteria = '';
				}

				document.querySelector(`#${giveHtmlValue(criteria)}`).value = currentCriteria;
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
	{#each criteraArray as criteria}
		<label for={giveHtmlValue(criteria)}>{criteria}: </label>
		<input id={giveHtmlValue(criteria)} />
		<br />
	{/each}
	{#if criteraArray.length > 0}
		<button on:click={saveCurrentElement}>
			{#if currentObservedElementIndex == observedElements.length}
				Dodaj novi element u tablicu
			{:else}
				Pohrani {currentObservedElementIndex + 1} element.
			{/if}
		</button>
	{/if}
</form>
