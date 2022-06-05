import { getCurrentComparisonName } from './nameParsing';
/**
 * Returns intensity of this comparison pair.
 * Uses special HTML tag value name generated for this pair.
 * If elements are given in opposite order, returns the reciprocal value.
 * So, on upper side of matrix an intensity for a pair can be e.g. 2,
 * but on the bottom side it's going to be 1/2 for the same pair.
 * @param criteriaOne First criteria (order of the pair matters!)
 * @param criteriaTwo Second criteria (order of the pair matters!)
 */
const getPairIntensity = (criteriaOne, criteriaTwo, criteriaPairwiseImportanceObject) => {
	let intensityValue;
	let pairComparisonName = getCurrentComparisonName(criteriaOne, criteriaTwo);

	if (criteriaPairwiseImportanceObject[pairComparisonName] !== undefined) {
		intensityValue = criteriaPairwiseImportanceObject[pairComparisonName].intensity;
	} else {
		pairComparisonName = getCurrentComparisonName(criteriaTwo, criteriaOne);
		intensityValue = 1 / criteriaPairwiseImportanceObject[pairComparisonName]?.intensity;
		intensityValue = parseFloat(intensityValue.toFixed(2));
		if (criteriaPairwiseImportanceObject[pairComparisonName]?.intensity < 1) {
			intensityValue = Math.round(intensityValue);
		}
	}

	return intensityValue;
};

/**
 * 
 Calculates pairwise matrix for criteria pairs.
 Matrix is used to generate pairwise table and for later calculations.
 @param criteriaArray Array filled with strings (names of criterias)
 */
export const calculatePairwiseMatrix = (criteriaArray, criteriaPairwiseImportanceObject) => {
	const pairsWiseMatrix = [];
	criteriaArray.forEach((criteriaMain, indexMain) => {
		if (indexMain !== 0) {
			pairsWiseMatrix[indexMain - 1] = [];
			criteriaArray.forEach((criteriaComparison, indexComparison) => {
				if (indexComparison !== 0) {
					let newValue;
					if (indexMain === indexComparison) {
						newValue = 1;
					} else {
						newValue = getPairIntensity(
							criteriaMain,
							criteriaComparison,
							criteriaPairwiseImportanceObject
						);
					}
					pairsWiseMatrix[indexMain - 1][indexComparison - 1] = newValue;
				}
			});
		}
	});
	return pairsWiseMatrix;
};

/**
 * Returns a sum of a column.
 */
export const calculateMatrixColumnSum = (matrix, columnIndex) => {
	let sum = 0;
	matrix.forEach((row) => {
		sum += row[columnIndex];
	});
	return sum;
};
