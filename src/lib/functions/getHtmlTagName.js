/**
 * Turns name of a criteria from human-readable into HTML 'id' format for input fields.
 * e.g.: Camera (MP) -> input_camera_mp
 * @param criteriaName Normal name of what is to become 'id' attribute value.
 */
export const getHtmlTagName = (criteriaName) => {
	return (
		'input_' +
		criteriaName
			.trim()
			.replace(/\s/gi, '_')
			.replace(/([^a-zA-Z0-9])/gi, '')
			.toLowerCase()
	);
};
