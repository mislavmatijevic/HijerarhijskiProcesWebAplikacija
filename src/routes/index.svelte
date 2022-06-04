<script>
	import CriteriaInput from '../lib/components/CriteriaInput.svelte';
	import ElementForm from '../lib/components/ElementForm.svelte';
	import ElementsTable from '../lib/components/ElementsTable.svelte';

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
	<ElementsTable bind:criteraArray bind:observedElements />

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
