<script>
	import CriteriaInput from '../lib/components/CriteriaInput.svelte';
	import ElementForm from '../lib/components/ElementForm.svelte';

	let criteraArray = ['Naziv'];
	let observedElements = [];
	let currentObservedElementIndex = 0;
</script>

<h1>Analitički hijerarhijski proces</h1>
<p>
	Ovaj projekt dostupan je na repozitoriju <a
		href="https://github.com/mislavmatijevic/HijerarhijskiProcesWebAplikacija">na GitHub-u</a
	>.
</p>

<CriteriaInput bind:criteraArray />

<ElementForm bind:criteraArray bind:observedElements bind:currentObservedElementIndex />

{#if observedElements.length > 0}
	<h2>Tablica</h2>

	<table id="table_criteria">
		<thead>
			{#each criteraArray as criteria}
				<th>{criteria}</th>
			{/each}
		</thead>
		<tbody>
			{#each observedElements as element}
				<tr>
					{#each criteraArray as criteria}
						<td>{element[criteria] !== undefined ? element[criteria] : ''}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>

	<form>
		<input id="input_deletion" />
		<button
			on:click={(e) => {
				e.preventDefault();
				const indexForDeletion = document.querySelector('#input_deletion').value;
				if (indexForDeletion !== undefined && indexForDeletion >= 0) {
					observedElements.splice(indexForDeletion, 1);
					observedElements = [...observedElements];
				}
			}}>Izbriši element (0-{observedElements.length - 1})</button
		>
	</form>
{/if}
