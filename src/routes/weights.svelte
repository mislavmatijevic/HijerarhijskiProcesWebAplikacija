<script>
	let criteriaArray;
	try {
		criteriaArray = JSON.parse(localStorage.getItem('criteriaArray'));
	} catch {}
</script>

<h1>Određivanje prioriteta kriterija</h1>

{#if criteriaArray === undefined}
	<span>Pričekajte...</span>
{:else}
	<span>{criteriaArray[0]}</span>
{/if}
