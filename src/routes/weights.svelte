<script>
	import CriteriaComparisonTable from './../lib/components/CriteriaComparisonTable.svelte';
	import {
		criteriaArray,
		criteriaPairwiseImportance,
		matrix,
		normalizedMatrix,
		rowValuesSumColumn,
		weightedSumValues,
		observedElements
	} from './../lib/stores/stores.js';
	import {
		calculatePairwiseMatrix,
		calculateWeightedSumValueColumn,
		getRowValuesSumColumn,
		normalizePairwiseMatrix
	} from './../lib/functions/matrixCalculations.js';
	import { getCurrentComparisonName } from '../lib/functions/nameParsing';
	import intensityOfRelativeImportance from '../lib/data/intensityOfRelativeImportance.json';
	import PairWiseComparisonMatrix from '../lib/components/PairWiseComparisonMatrix.svelte';
	import NormalizedPairWiseComparisonMatrix from '../lib/components/NormalizedPairWiseComparisonMatrix.svelte';

	let pairsCount = 0;

	// Svelte Kit just assumes I want SSR. I DON'T.
	// So, it first calculates code on the server side, and then it sends it down here.
	// All great and stuff, but I need my local storage here.
	// So I "geniously" implemented this aweful try-catch just to get around SSR and get down to business.
	try {
		$criteriaArray = JSON.parse(localStorage.getItem('criteriaArray'));
		$observedElements = JSON.parse(localStorage.getItem('observedElements'));

		// Wait for all criterias to get ready before displaying the bottom 'PairWiseComparisonMatrix'.
		$criteriaArray.forEach((criteriaUpper, indexUpper) => {
			if (indexUpper !== 0)
				$criteriaArray.forEach((criteriaLower, indexLower) => {
					if (indexLower !== 0) {
						if (indexUpper < indexLower) {
							pairsCount++;
							// Set default intensity to 1 (Equally important/'Jednako važno' value).
							$criteriaPairwiseImportance[getCurrentComparisonName(criteriaUpper, criteriaLower)] =
								intensityOfRelativeImportance[0];
						}
					}
				});
		});
	} catch {}

	/**
	 * Clunky way of recalculating all of the values in the $matrix.
	 * It's not the best way, but hey, it works.
	 * This is a random small college project after all (I should remember that more often for my own good)... :)
	 */
	const refreshMatrix = () => {
		$matrix = calculatePairwiseMatrix($criteriaArray, $criteriaPairwiseImportance);
		$normalizedMatrix = normalizePairwiseMatrix($matrix);
		$rowValuesSumColumn = getRowValuesSumColumn($normalizedMatrix);
		$weightedSumValues = calculateWeightedSumValueColumn($normalizedMatrix, $rowValuesSumColumn);
	};
	try {
		refreshMatrix();
	} catch {}
</script>

<h1>AHP metoda</h1>
{#if $criteriaArray === undefined}
	<span>Pričekajte...</span>
{:else}
	<h2>1. Određivanje prioriteta kriterija</h2>
	{#each $criteriaArray as criteriaMain, indexMain}
		{#if indexMain !== 0}
			{#each $criteriaArray as criteriaComparison, indexComparison}
				{#if indexMain < indexComparison}
					<label
						for={'select_importance_' + getCurrentComparisonName(criteriaMain, criteriaComparison)}
						>Ocjena važnosti kriterija "{@html '<strong>' + criteriaMain + '</strong>'}" s
						kriterijem "{@html '<strong>' + criteriaComparison + '</strong>'}"</label
					>
					<select
						id={'select_importance_' + getCurrentComparisonName(criteriaMain, criteriaComparison)}
						bind:value={$criteriaPairwiseImportance[
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
							<option
								value={importanceValue}
								on:click={() => ($criteriaArray = [...$criteriaArray])}
								>{importanceValue.definition} ({importanceValue.intensity})</option
							>
						{/each}
					</select>
					<br />
				{/if}
			{/each}
		{/if}
	{/each}
	{#if pairsCount !== 0 && Object.keys($criteriaPairwiseImportance).length === pairsCount && $matrix.length !== 0}
		<PairWiseComparisonMatrix />
		<NormalizedPairWiseComparisonMatrix />
		{#each $criteriaArray as criteria, indexCriteria}
			{#if indexCriteria > 0}
				<h2>{indexCriteria + 4}. ({criteria}) MAX</h2>
				<CriteriaComparisonTable currentCriteria={criteria} />
			{/if}
		{/each}
	{/if}
{/if}
<!-- Loaded content -->
