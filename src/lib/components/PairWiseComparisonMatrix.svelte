<script>
	import { calculateMatrixColumnSum } from '../functions/matrixCalculations';

	export let criteriaArray;
	export let matrix;
</script>

<h2>2. Matrica parova</h2>
{#if criteriaArray !== undefined && matrix !== undefined}
	<table id="table_criteria">
		<thead>
			{#each criteriaArray as criteria}
				<th>{criteria}</th>
			{/each}
		</thead>
		<tbody>
			{#each matrix as pairIntensityRow, indexRow}
				<tr>
					<td>{criteriaArray[indexRow + 1]}</td>
					{#each pairIntensityRow as pairIntensityValue}
						<td>{pairIntensityValue}</td>
					{/each}
				</tr>
			{/each}
			<tr>
				<td>Ukupno</td>
				{#each matrix as pairIntensityColumn, indexColumn}
					<td>{parseFloat(calculateMatrixColumnSum(matrix, indexColumn)).toFixed(2)}</td>
				{/each}
			</tr>
		</tbody>
	</table>
{/if}
