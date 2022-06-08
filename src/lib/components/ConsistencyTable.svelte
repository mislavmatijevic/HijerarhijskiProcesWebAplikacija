<script>
	import {
		criteriaArray,
		matrix,
		rowValuesSumColumn,
		weightedSumValues
	} from './../stores/stores.js';
</script>

<h2>4. Omjer konzistentnosti</h2>
{#if $criteriaArray !== undefined && $matrix !== undefined}
	<table id="table_criteria">
		<thead>
			{#each $criteriaArray as criteria}
				<th>{criteria}</th>
			{/each}
			<th>Težinska vrijednost zbroja</th>
		</thead>
		<tbody>
			{#each $matrix as pairIntensityRow, indexRow}
				<tr>
					<td>{$criteriaArray[indexRow + 1]}</td>
					{#each pairIntensityRow as pairIntensityValue, indexColumn}
						<td>{parseFloat(pairIntensityValue * $rowValuesSumColumn[indexColumn]).toFixed(4)}</td>
					{/each}
					<td>{parseFloat($weightedSumValues[indexRow]).toFixed(4)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
