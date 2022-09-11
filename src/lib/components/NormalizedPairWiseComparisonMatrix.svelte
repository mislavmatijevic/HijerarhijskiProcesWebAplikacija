<script>
	export let criteriaArray;
	export let normalizedMatrix;
	export let rowValuesSumColumn;
</script>

<h2>Normalizirana matrica parova</h2>
{#if criteriaArray !== undefined && normalizedMatrix !== undefined}
	<table id="table_criteria">
		<thead>
			{#each criteriaArray as criteria}
				<th>{criteria}</th>
			{/each}
			<th>Težine kriterija</th>
		</thead>
		<tbody>
			{#each normalizedMatrix as pairIntensityRow, indexColumn}
				<tr>
					<td><strong>{criteriaArray[indexColumn + 1]}</strong></td>
					{#each pairIntensityRow as pairIntensityValue, indexRow}
						<td>{pairIntensityValue}</td>
					{/each}
					<td>{parseFloat(rowValuesSumColumn[indexColumn]).toFixed(4)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}

<style>
	table,
	th,
	td {
		padding: 5px;
		margin-bottom: 1vh;
		border: 1px solid greenyellow;
		border-collapse: collapse;
	}
</style>
