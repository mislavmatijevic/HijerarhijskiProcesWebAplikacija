<script>
	import { calculateMatrixColumnSum } from '../functions/matrixCalculations';

	export let criteriaArray;
	export let matrix;
</script>

{#if criteriaArray !== undefined && matrix !== undefined}
	<table id="table_criteria">
		<thead>
			{#each criteriaArray as criteria}
				<th>{criteria}</th>
			{/each}
		</thead>
		<tbody>
			{#each matrix as pairIntensityRow, indexColumn}
				<tr>
					<td>{criteriaArray[indexColumn + 1]}</td>
					{#each pairIntensityRow as pairIntensityValue, indexRow}
						<td
							>{parseFloat(pairIntensityValue / calculateMatrixColumnSum(matrix, indexRow)).toFixed(
								4
							)}</td
						>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
