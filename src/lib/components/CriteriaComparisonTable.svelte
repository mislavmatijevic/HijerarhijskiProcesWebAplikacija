<script>
	import {
		calculateAlternativeDominationOverOther,
		calculateWeightedSumValueColumn,
		getRowValuesSumColumn,
		normalizePairwiseMatrix
	} from '../functions/matrixCalculations.js';

	import { matrix, observedElements } from './../stores/stores.js';
	export let currentCriteria;
	import intensities from '../data/intensityOfRelativeImportance.json';
	import NormalizedPairWiseComparisonMatrix from './NormalizedPairWiseComparisonMatrix.svelte';
	let dominationsIndexedRows = calculateAlternativeDominationOverOther(
		currentCriteria,
		$observedElements
	);

	let dominationMatrix = [];
	let normalizedMatrix = [];
	let rowValuesSumColumn = [];
	let weightedSumValues = [];
	let observedElementsName = ['Elementi']; // First element

	$observedElements.forEach((observedElement, indexRow) => {
		observedElementsName.push(observedElement.Naziv);
		dominationMatrix.push(
			dominationsIndexedRows.map((domination, indexColumn) => {
				if (domination[indexRow] < 0) {
					let reciprocalNumber = parseFloat(1 / intensities[-domination[indexRow]].intensity);
					if (reciprocalNumber > 1) {
						return Math.round(reciprocalNumber);
					} else {
						return parseFloat(parseFloat(reciprocalNumber).toFixed(2));
					}
				} else {
					return intensities[domination[indexRow]].intensity;
				}
			})
		);
	});
	const refreshNormalizedMatrix = () => {
		normalizedMatrix = normalizePairwiseMatrix(dominationMatrix);
		rowValuesSumColumn = getRowValuesSumColumn(normalizedMatrix);
		weightedSumValues = calculateWeightedSumValueColumn(normalizedMatrix, rowValuesSumColumn);
	};

	matrix.subscribe(() => {
		refreshNormalizedMatrix();
	});
</script>

{#if $observedElements !== undefined}
	<table id="table_criteria">
		<thead>
			<th>{currentCriteria}</th>
			{#each $observedElements as element}
				<th>{element['Naziv']}</th>
			{/each}
		</thead>
		<tbody>
			{#each dominationMatrix as dominationRow, indexRow}
				<tr>
					<td><strong>{$observedElements[indexRow]['Naziv']}</strong></td>
					{#each dominationRow as domination}
						<td>{domination}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
	<NormalizedPairWiseComparisonMatrix
		criteriaArray={observedElementsName}
		{normalizedMatrix}
		{rowValuesSumColumn}
	/>
{/if}

<style>
	table,
	th,
	td {
		padding: 5px;
		margin-bottom: 1vh;
		border: 1px solid #aeaeae;
		border-collapse: collapse;
		max-width: fit-content;
	}
</style>
