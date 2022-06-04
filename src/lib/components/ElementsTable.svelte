<script>
	export let criteriaArray;
	export let observedElements;
</script>

<h2>Tablica</h2>

<table id="table_criteria">
	<thead>
		{#each criteriaArray as criteria}
			<th>{criteria}</th>
		{/each}
	</thead>
	<tbody>
		{#each observedElements as element}
			<tr>
				{#each criteriaArray as criteria}
					<td>{element[criteria] !== undefined ? element[criteria] : ''}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	table,
	th,
	td {
		padding: 10px;
		margin-bottom: 5vh;
		border: 1px solid black;
		border-collapse: collapse;
	}
</style>
