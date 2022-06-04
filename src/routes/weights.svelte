<script>
	import { getCurrentComparisonName, getHtmlTagName } from '../lib/functions/nameParsing';
	import intensityOfRelativeImportance from '../lib/data/intensityOfRelativeImportance.json';
	import WeightsTable from '../lib/components/WeightsTable.svelte';

	let criteriaArray;
	try {
		criteriaArray = JSON.parse(localStorage.getItem('criteriaArray'));
	} catch {}

	let criteriaPairwiseImportance = {};
</script>

<h1>Određivanje prioriteta kriterija</h1>

{#if criteriaArray === undefined}
	<span>Pričekajte...</span>
{:else}
	{#each criteriaArray as criteriaMain, indexMain}
		{#if indexMain !== 0}
			{#each criteriaArray as criteriaComparison, indexComparison}
				{#if indexMain < indexComparison}
					<label
						for={'select_importance_' + getCurrentComparisonName(criteriaMain, criteriaComparison)}
						>Ocjena važnosti kriterija "{@html '<strong>' + criteriaMain + '</strong>'}" s
						kriterijem "{@html '<strong>' + criteriaComparison + '</strong>'}"</label
					>
					<select
						id={'select_importance_' + getCurrentComparisonName(criteriaMain, criteriaComparison)}
						bind:value={criteriaPairwiseImportance[
							getCurrentComparisonName(criteriaMain, criteriaComparison)
						]}
					>
						{#each intensityOfRelativeImportance as importanceValue, index}
							{#if index === 5}
								<optgroup />
							{/if}
							<option value={importanceValue} on:click={() => (criteriaArray = [...criteriaArray])}
								>{importanceValue.definition} ({importanceValue.intensity})</option
							>
						{/each}
					</select>
					<br />
				{/if}
			{/each}
		{/if}
	{/each}
	<WeightsTable bind:criteriaArray bind:criteriaPairwiseImportance />
{/if}
<!-- Loaded content -->
