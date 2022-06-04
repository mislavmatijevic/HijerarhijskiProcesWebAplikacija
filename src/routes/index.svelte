<script>
	let criteraArray = ['Naziv'];
	let observedElements = [];
	let currentObservedElementIndex = 0;

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
		} else if (currentObservedElementIndex < observedElements.length) {
			observedElements[currentObservedElementIndex] = object;
		}
	};

	/**
	 * Fills input values with current element's values.
	 * Serves to show user data of currently selected object.
	 */
	const bindInputsWithCurrentElement = () => {
		criteraArray.forEach((criteria) => {
			const currentCriteria = observedElements[currentObservedElementIndex][criteria];

			if (currentCriteria === undefined) {
				currentCriteria = '';
			}

			document.querySelector(`#${giveHtmlValue(criteria)}`).value = currentCriteria;
		});
	};
</script>

<h1>Analitički hijerarhijski proces</h1>
<p>
	Ovaj projekt dostupan je na repozitoriju <a
		href="https://github.com/mislavmatijevic/HijerarhijskiProcesWebAplikacija">na GitHub-u</a
	>.
</p>

<form>
	<input id="input_criteria" />
	<button
		on:click={(e) => {
			e.preventDefault();
			criteraArray = [...criteraArray, document.querySelector('#input_criteria').value];
		}}
	>
		Dodaj kriterij
	</button>
</form>

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
			{/if} vrijednost
		</button>
	{/if}
</form>

{#if observedElements.length > 0}
	<h2>Tablica</h2>

	<table id="table_criteria">
		<thead>
			{#each criteraArray as criteria}
				<th>{criteria}</th>
			{/each}
		</thead>
		<tbody>
			{#each observedElements as element}
				<tr>
					{#each criteraArray as criteria}
						<td>{element[criteria] !== undefined ? element[criteria] : ''}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<form>
		<input id="input_deletion" />
		<button
			on:click={(e) => {
				e.preventDefault();
				const indexForDeletion = document.querySelector('#input_deletion').value;
				if (indexForDeletion !== undefined && indexForDeletion >= 0) {
					observedElements.splice(indexForDeletion, 1);
					observedElements = [...observedElements];
				}
			}}>Izbriši element (0-{observedElements.length - 1})</button
		>
	</form>
{/if}
