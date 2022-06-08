import { writable } from 'svelte/store';

export const criteriaArray = writable(['Naziv']);
export const observedElements = writable([]);

export const criteriaPairwiseImportance = writable({});
export const matrix = writable([]);
export const normalizedMatrix = writable([]);
export const rowValuesSumColumn = writable([]);
export const weightedSumValues = writable([]);
