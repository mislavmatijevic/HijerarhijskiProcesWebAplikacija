/**
 * Turns name of a criteria from human-readable into HTML 'id' format for input fields.
 * e.g.: Camera (MP) -> input_camera_mp
 * @param criteriaName Normal name of what is to become 'id' attribute value.
 */
export const getHtmlTagName = (criteriaName) => {
	return (
		criteriaName
			.trim()
			.replace(/\s/gi, '_')
			.replace(/([^a-zA-Z0-9])/gi, '')
			.toLowerCase()
	);
};

/**
 * Provided "normal", human-readable criteria names (one pair of two criterias),
 * this function generates a HTML-like 'id' string for provided pair.
 * @param {string} criteriaMain
 * @param {string} criteriaComparison
 * @returns Unique name for current criteria pair.
 */
export const getCurrentComparisonName = (criteriaMain, criteriaComparison) =>
	getHtmlTagName(criteriaMain) + '_' + getHtmlTagName(criteriaComparison);
