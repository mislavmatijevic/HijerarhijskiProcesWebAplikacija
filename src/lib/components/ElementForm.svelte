<script>
	import { criteriaArray, observedElements } from './../stores/stores.js';
	import { getHtmlTagName } from './../functions/nameParsing.js';
	export let currentObservedElementIndex;

	/**
	 * Clears all form inputs.
	 * Good for user experience after an object is added or new object is selected.
	 */
	const clearAllInputs = () => {
		$criteriaArray.forEach((criteria) => {
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
		$criteriaArray.forEach((criteria) => {
			object[criteria] = document.querySelector(`#${getHtmlTagName(criteria)}`).value;
		});

		if (currentObservedElementIndex < 0) {
			currentObservedElementIndex = 0;
		} else if (currentObservedElementIndex > $observedElements.length) {
			currentObservedElementIndex = $observedElements.length;
		}

		if (currentObservedElementIndex == $observedElements.length) {
			$observedElements = [...$observedElements, object];
			currentObservedElementIndex = $observedElements.length;
			clearAllInputs();
		} else if (currentObservedElementIndex < $observedElements.length) {
			$observedElements[currentObservedElementIndex] = object;
		}
	};

	/**
	 * Fills input values with current element's values.
	 * Serves to show user data of currently selected object.
	 */
	const bindInputsWithCurrentElement = () => {
		if (currentObservedElementIndex < 0 || currentObservedElementIndex > $observedElements.length) {
			return;
		}

		if (currentObservedElementIndex == $observedElements.length) {
			clearAllInputs();
		} else {
			$criteriaArray.forEach((criteria) => {
				let currentCriteria = $observedElements[currentObservedElementIndex][criteria];

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
		{#if currentObservedElementIndex === $observedElements.length}
			Nova
		{:else}
			{currentObservedElementIndex + 1}
		{/if} vrijednost
	</h2>
	<div class="form__arrows">
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
				if (currentObservedElementIndex < $observedElements.length) {
					currentObservedElementIndex++;
					bindInputsWithCurrentElement();
				}
			}}>-&gt;</button
		>
	</div>
	<br />
	{#each $criteriaArray as criteria, indexCriteria}
		<label for={getHtmlTagName(criteria)}>{criteria}: </label>
		<input id={getHtmlTagName(criteria)} type={indexCriteria !== 0 && 'number'} />
		<br />
	{/each}
	{#if $criteriaArray.length > 0}
		<button on:click={saveCurrentElement} class="form__new">
			{#if currentObservedElementIndex == $observedElements.length}
				Dodaj novi element u tablicu
			{:else}
				Pohrani {currentObservedElementIndex + 1} element.
			{/if}
		</button>
	{/if}
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	button,
	input {
		max-width: 300px;
	}
	.form__new {
		margin-top: 20px;
	}
</style>
