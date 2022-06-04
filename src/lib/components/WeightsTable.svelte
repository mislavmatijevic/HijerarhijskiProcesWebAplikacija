<script>
	import { getCurrentComparisonName } from '../functions/nameParsing';

	export let criteriaArray;
	export let criteriaPairwiseImportance;

	/**
	 * Returns intensity of this comparison pair.
	 * Uses special HTML tag value name generated for this pair.
	 * If elements are given in opposite order, returns the reciprocal value.
	 * So, on upper side of matrix an intensity for a pair can be e.g. 2,
	 * but on the bottom side it's going to be 1/2 for the same pair.
	 * @param criteriaOne First criteria (order of the pair matters!)
	 * @param criteriaTwo Second criteria (order of the pair matters!)
	 */
	const getPairIntensity = (criteriaOne, criteriaTwo) => {
		let intensityValue;
		let pairComparisonName = getCurrentComparisonName(criteriaOne, criteriaTwo);

		if (criteriaPairwiseImportance[pairComparisonName] !== undefined) {
			intensityValue = criteriaPairwiseImportance[pairComparisonName].intensity;
		} else {
			pairComparisonName = getCurrentComparisonName(criteriaTwo, criteriaOne);
			intensityValue = 1 / criteriaPairwiseImportance[pairComparisonName]?.intensity;
			intensityValue = parseFloat(intensityValue.toFixed(2));
		}

		return intensityValue;
	};
</script>

<table id="table_criteria">
	<thead>
		{#each criteriaArray as criteria}
			<th>{criteria}</th>
		{/each}
	</thead>
	<tbody>
		{#each criteriaArray as criteriaMain, indexRow}
			{#if indexRow !== 0}
				<tr>
					<td>{criteriaMain}</td>
					{#each criteriaArray as criteriaComparison, indexColumn}
						{#if indexColumn !== 0}
							{#if indexRow === indexColumn}
								<td>1</td>
							{:else}
								<td>{getPairIntensity(criteriaMain, criteriaComparison)}</td>
							{/if}
						{/if}
					{/each}
				</tr>
			{/if}
		{/each}
	</tbody>
</table>
