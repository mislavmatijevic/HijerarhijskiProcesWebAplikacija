<script>
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
			{#each matrix as pairIntensityRow, indexRow}
				<tr>
					<td>{criteriaArray[indexRow + 1]}</td>
					{#each pairIntensityRow as pairIntensityValue}
						<td>{pairIntensityValue}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
