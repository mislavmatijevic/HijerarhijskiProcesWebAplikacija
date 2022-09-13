<script>
	import { observedElements, elementCriteriaComparison } from '../stores/stores';
	import intensityOfRelativeImportance from '../data/intensityOfRelativeImportance.json';
	import { getCurrentElementComparisonName } from '../functions/nameParsing';
	export let criteria;

	export let refreshMatrix;
</script>

{#each $observedElements as elementMain, indexMain}
	{#each $observedElements as elementComparison, indexComparison}
		{#if indexMain < indexComparison}
			{#if elementMain[criteria] !== elementComparison[criteria]}
				<p>
					Usporedi {criteria} za {elementMain['Naziv']} u usporedbi s {elementComparison['Naziv']} ({elementMain[
						criteria
					]}-{elementComparison[criteria]})
				</p>

				<select
					id={getCurrentElementComparisonName(criteria, indexMain, indexComparison)}
					bind:value={$elementCriteriaComparison[
						getCurrentElementComparisonName(criteria, indexMain, indexComparison)
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
							on:click={() => ($observedElements = [...$observedElements])}
							>{importanceValue.definition} ({importanceValue.intensity})</option
						>
					{/each}
				</select>
			{:else}
				{($elementCriteriaComparison[
					getCurrentElementComparisonName(criteria, indexMain, indexComparison)
				] = 1)}
			{/if}
		{/if}
	{/each}
{/each}

<style>
	select {
		margin-bottom: 20px;
	}
</style>
