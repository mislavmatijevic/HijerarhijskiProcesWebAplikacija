<script>
	import { getHtmlTagName } from '../lib/functions/getHtmlTagName';
	import intensityOfRelativeImportance from '../lib/data/intensityOfRelativeImportance.json';

	let criteriaArray;
	try {
		criteriaArray = JSON.parse(localStorage.getItem('criteriaArray'));
	} catch {}

	const getCurrentComparisonName = (criteriaMain, criteriaComparison) =>
		getHtmlTagName(criteriaMain) + '_' + getHtmlTagName(criteriaComparison);
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
					>
						{#each intensityOfRelativeImportance as importanceValue, index}
							{#if index === 5}
								<optgroup />
							{/if}
							<option>{importanceValue.definition} ({importanceValue.intensity})</option>
						{/each}
					</select>
					<br />
				{/if}
			{/each}
		{/if}
	{/each}
{/if}
<!-- Loaded content -->
