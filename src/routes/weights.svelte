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
	import ChoosingCriteriaWeights from '../lib/components/ChoosingCriteriaWeights.svelte';
	import ChoosingAlternativeCriteriaWeights from '../lib/components/ChoosingAlternativeCriteriaWeights.svelte';

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

<div class="container">
	<h1>AHP metoda</h1>
	{#if $criteriaArray === undefined}
		<span>Pričekajte...</span>
	{:else}
		<ChoosingCriteriaWeights {refreshMatrix} />
		{#if pairsCount !== 0 && Object.keys($criteriaPairwiseImportance).length === pairsCount && $matrix.length !== 0}
			<PairWiseComparisonMatrix />
			<NormalizedPairWiseComparisonMatrix
				criteriaArray={$criteriaArray}
				normalizedMatrix={$normalizedMatrix}
				rowValuesSumColumn={$rowValuesSumColumn}
			/>
			<div class="container__criteria-comparisons">
				{#each $criteriaArray as criteria, indexCriteria}
					{#if indexCriteria > 0}
						<div>
							<h2>{indexCriteria + 4}. ({criteria}) MAX</h2>
							<ChoosingAlternativeCriteriaWeights {refreshMatrix} {criteria} />
							<CriteriaComparisonTable currentCriteria={criteria} />
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	{/if}
</div>

<!-- Loaded content -->
<style>
	.container {
		margin: 20px;
		margin-right: 0;
		padding-right: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.container__criteria-comparisons {
		display: grid;
		grid-template: auto 1fr / auto 1fr;
		gap: 50px;
	}
</style>
