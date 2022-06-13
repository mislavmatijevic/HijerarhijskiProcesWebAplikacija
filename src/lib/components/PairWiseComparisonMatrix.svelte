<script>
	import { criteriaArray, matrix } from './../stores/stores.js';
	import { calculateMatrixColumnSum } from '../functions/matrixCalculations';
</script>

<h2>2. Matrica parova</h2>
{#if $criteriaArray !== undefined && $matrix !== undefined}
	<table id="table_criteria">
		<thead>
			{#each $criteriaArray as criteria}
				<th>{criteria}</th>
			{/each}
		</thead>
		<tbody>
			{#each $matrix as pairIntensityRow, indexRow}
				<tr>
					<td><strong>{$criteriaArray[indexRow + 1]}</strong></td>
					{#each pairIntensityRow as pairIntensityValue}
						<td>{pairIntensityValue}</td>
					{/each}
				</tr>
			{/each}
			<tr>
				<td><strong>Ukupno</strong></td>
				{#each $matrix as _pairIntensityColumn, indexColumn}
					<td>{parseFloat(calculateMatrixColumnSum($matrix, indexColumn)).toFixed(2)}</td>
				{/each}
			</tr>
		</tbody>
	</table>
{/if}

<style>
	table,
	th,
	td {
		padding: 5px;
		margin-bottom: 1vh;
		border: 1px solid green;
		border-collapse: collapse;
	}
</style>
