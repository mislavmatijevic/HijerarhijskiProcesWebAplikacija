<script>
	import CriteriaInput from '../lib/components/CriteriaInput.svelte';
	import DeleteElement from '../lib/components/DeleteElement.svelte';
	import ElementForm from '../lib/components/ElementForm.svelte';
	import ElementsTable from '../lib/components/ElementsTable.svelte';

	import testCriterias from '../lib/data/testCriterias.json';
	import testPhones from '../lib/data/testPhones.json';

	let criteriaArray = ['Naziv'];
	let observedElements = [];
	let currentObservedElementIndex = 0;

	const loadTestValues = () => {
		criteriaArray = testCriterias;
		observedElements = testPhones;
		currentObservedElementIndex = observedElements.length;
	};

	const saveArrays = () => {
		localStorage.setItem('criteriaArray', JSON.stringify(criteriaArray));
		localStorage.setItem('observedElements', JSON.stringify(observedElements));
	};
</script>

<h1>Analitički hijerarhijski proces</h1>
<p>
	Ovaj projekt dostupan je na repozitoriju <a
		href="https://github.com/mislavmatijevic/HijerarhijskiProcesWebAplikacija">na GitHub-u</a
	>.
</p>

<button on:click={loadTestValues}> Učitaj testne vrijednosti </button>

<CriteriaInput bind:criteriaArray />

<ElementForm bind:criteriaArray bind:observedElements bind:currentObservedElementIndex />

{#if observedElements.length > 0}
	<ElementsTable bind:criteriaArray bind:observedElements />
	<DeleteElement bind:observedElements bind:currentObservedElementIndex />
	<a href="/weights" on:click={saveArrays}>Nastavak na odabir prioriteta...</a>
{/if}
