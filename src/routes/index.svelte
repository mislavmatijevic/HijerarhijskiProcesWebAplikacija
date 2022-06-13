<script>
	import { criteriaArray, observedElements } from './../lib/stores/stores.js';
	import CriteriaInput from '../lib/components/CriteriaInput.svelte';
	import DeleteElement from '../lib/components/DeleteElement.svelte';
	import ElementForm from '../lib/components/ElementForm.svelte';
	import ElementsTable from '../lib/components/ElementsTable.svelte';

	import testCriterias from '../lib/data/testCriterias.json';
	import testPhones from '../lib/data/testPhones.json';

	let currentObservedElementIndex = 0;
	try {
		$criteriaArray = JSON.parse(localStorage.getItem('criteriaArray')) ?? ['Naziv'];
		$observedElements = JSON.parse(localStorage.getItem('observedElements')) ?? [];
		currentObservedElementIndex = $observedElements.length;
	} catch (error) {}

	/**
	 * Deletes all data from the application.
	 */
	const deleteValues = () => {
		localStorage.clear();
		$criteriaArray = ['Naziv'];
		$observedElements = [];
		currentObservedElementIndex = 0;
	};

	/**
	 * Loads test data from JSON file.
	 */
	const loadTestValues = () => {
		$criteriaArray = testCriterias;
		$observedElements = testPhones;
		currentObservedElementIndex = $observedElements.length;
	};

	/**
	 * Saves arrays in localStorage for usage on next page (and for future uses of the application).
	 */
	const saveArrays = () => {
		localStorage.setItem('criteriaArray', JSON.stringify($criteriaArray));
		localStorage.setItem('observedElements', JSON.stringify($observedElements));
	};
</script>

<div class="container">
	<h1>Analitički hijerarhijski proces</h1>
	<p>
		Ovaj projekt dostupan je na repozitoriju <a
			href="https://github.com/mislavmatijevic/HijerarhijskiProcesWebAplikacija">na GitHub-u</a
		>.
	</p>

	<div class="container__buttons">
		<button on:click={deleteValues}> Izbriši sve vrijednosti </button>
		<button on:click={loadTestValues}> Učitaj testne vrijednosti </button>
	</div>

	<CriteriaInput />

	<div class="separator" />

	<div class="elements-view">
		<div class="elements-view__form">
			<ElementForm bind:currentObservedElementIndex />
		</div>

		<div class="elements-view__form">
			{#if $observedElements.length > 0}
				<ElementsTable />
				<div class="separator" />
				<DeleteElement bind:currentObservedElementIndex />
				<a href="/weights" on:click={saveArrays}>Pohrani i nastavi na odabir prioriteta...</a>
			{/if}
		</div>
	</div>
</div>

<style>
	.container {
		margin: 20px;
		display: flex;
		flex-direction: column;
	}
	button {
		max-width: 30%;
		margin: 20px 0;
	}
	.separator {
		margin: 30px;
		height: 1px;
		width: 100%;
		background-color: #aeaeae;
	}
	.elements-view {
		display: flex;
		gap: 10%;
		width: 100%;
	}
</style>
