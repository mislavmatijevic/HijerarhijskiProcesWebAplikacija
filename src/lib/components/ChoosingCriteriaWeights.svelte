<script>
	import { getCurrentCriteriaComparisonName } from '../functions/nameParsing';

	export let refreshMatrix;

	import { criteriaArray, criteriaPairwiseImportance } from '../stores/stores';
	import intensityOfRelativeImportance from '../data/intensityOfRelativeImportance.json';
</script>

<h2>1. Određivanje prioriteta kriterija</h2>
{#each $criteriaArray as criteriaMain, indexMain}
	{#if indexMain !== 0}
		{#each $criteriaArray as criteriaComparison, indexComparison}
			{#if indexMain < indexComparison}
				<div class="selections">
					<label
						for={'select_importance_' +
							getCurrentCriteriaComparisonName(criteriaMain, criteriaComparison)}
						>Ocjena važnosti kriterija "{@html '<strong>' + criteriaMain + '</strong>'}" s
						kriterijem "{@html '<strong>' + criteriaComparison + '</strong>'}"</label
					>
					<select
						id={'select_importance_' +
							getCurrentCriteriaComparisonName(criteriaMain, criteriaComparison)}
						bind:value={$criteriaPairwiseImportance[
							getCurrentCriteriaComparisonName(criteriaMain, criteriaComparison)
						]}
						on:change={refreshMatrix}
					>
						{#each intensityOfRelativeImportance as importanceValue, index}
							{#if index === 0}
								<optgroup label="Normalno" />
							{:else if index === 9}
								<optgroup label="Recipročno" />
							{/if}
							<option
								value={importanceValue}
								on:click={() => ($criteriaArray = [...$criteriaArray])}
								>{importanceValue.definition} ({importanceValue.intensity})</option
							>
						{/each}
					</select>
				</div>
			{/if}
		{/each}
	{/if}
{/each}

<style>
	.selections {
		display: flex;
		justify-content: space-between;
		max-width: 75%;
		align-items: flex-end;
	}
	select {
		font-family: Arial;
		border-radius: 5px;
	}
	select:hover {
		background-color: white;
	}
</style>
