<script>
	import { criteriaArray, normalizedMatrix, rowValuesSumColumn } from './../stores/stores.js';
</script>

<h2>3. Normalizirana matrica parova</h2>
{#if $criteriaArray !== undefined && $normalizedMatrix !== undefined}
	<table id="table_criteria">
		<thead>
			{#each $criteriaArray as criteria}
				<th>{criteria}</th>
			{/each}
			<th>Težine kriterija</th>
		</thead>
		<tbody>
			{#each $normalizedMatrix as pairIntensityRow, indexColumn}
				<tr>
					<td><strong>{$criteriaArray[indexColumn + 1]}</strong></td>
					{#each pairIntensityRow as pairIntensityValue, indexRow}
						<td>{pairIntensityValue}</td>
					{/each}
					<td>{parseFloat($rowValuesSumColumn[indexColumn]).toFixed(4)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
{/if}
