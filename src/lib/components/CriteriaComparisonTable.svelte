<script>
	import { calculateAlternativeDominationOverOther } from '../functions/matrixCalculations.js';

	import { observedElements } from './../stores/stores.js';
	export let currentCriteria;
	import intensities from '../data/intensityOfRelativeImportance.json';
	let dominationsIndexedRows = calculateAlternativeDominationOverOther(
		currentCriteria,
		$observedElements
	);

	let dominationMatrix = [];

	$observedElements.forEach((observedElement, indexRow) => {
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
{/if}
