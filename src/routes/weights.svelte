<script>
	import { calculatePairwiseMatrix } from './../lib/functions/matrixCalculations.js';
	import { getCurrentComparisonName } from '../lib/functions/nameParsing';
	import intensityOfRelativeImportance from '../lib/data/intensityOfRelativeImportance.json';
	import WeightsTable from '../lib/components/WeightsTable.svelte';

	let criteriaArray;
	let pairsCount = 0;
	let criteriaPairwiseImportance = {};
	try {
		criteriaArray = JSON.parse(localStorage.getItem('criteriaArray'));

		criteriaArray.forEach((criteriaUpper, indexUpper) => {
			if (indexUpper !== 0)
				criteriaArray.forEach((criteriaLower, indexLower) => {
					if (indexLower !== 0) {
						if (indexUpper < indexLower) {
							pairsCount++;
							// Set default intensity to 1 (Equally important/'Jednako važno' value).
							criteriaPairwiseImportance[getCurrentComparisonName(criteriaUpper, criteriaLower)] =
								intensityOfRelativeImportance[0];
						}
					}
				});
		});
	} catch {}

	let matrix = [];

	const refreshMatrix = () => {
		matrix = calculatePairwiseMatrix(criteriaArray, criteriaPairwiseImportance);
		console.log(matrix);
	};
</script>

<h1>Određivanje prioriteta kriterija</h1>

{#if criteriaArray === undefined}
	<span>Pričekajte...</span>
{:else}
	{#each criteriaArray as criteriaMain, indexMain}
		{#if indexMain !== 0}
			{#each criteriaArray as criteriaComparison, indexComparison}
				{#if indexMain < indexComparison}
					<label
						for={'select_importance_' + getCurrentComparisonName(criteriaMain, criteriaComparison)}
						>Ocjena važnosti kriterija "{@html '<strong>' + criteriaMain + '</strong>'}" s
						kriterijem "{@html '<strong>' + criteriaComparison + '</strong>'}"</label
					>
					<select
						id={'select_importance_' + getCurrentComparisonName(criteriaMain, criteriaComparison)}
						bind:value={criteriaPairwiseImportance[
							getCurrentComparisonName(criteriaMain, criteriaComparison)
						]}
						on:change={refreshMatrix}
					>
						{#each intensityOfRelativeImportance as importanceValue, index}
							{#if index === 0}
								<optgroup label="Normalno" />
							{:else if index === 9}
								<optgroup label="Recipročno" />
							{/if}
							<option value={importanceValue} on:click={() => (criteriaArray = [...criteriaArray])}
								>{importanceValue.definition} ({importanceValue.intensity})</option
							>
						{/each}
					</select>
					<br />
				{/if}
			{/each}
		{/if}
	{/each}
	{#if pairsCount !== 0 && Object.keys(criteriaPairwiseImportance).length === pairsCount}
		<WeightsTable bind:criteriaArray bind:matrix />
	{/if}
{/if}
<!-- Loaded content -->
