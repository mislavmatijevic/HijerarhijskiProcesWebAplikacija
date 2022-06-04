<script>
	let kriteriji = ['Naziv'];
	let vrijednosti = [];

	const dajHtmlNaziv = (znakovniNiz) => {
		return 'input_' + znakovniNiz.trim().replace(' ', '_').toLowerCase();
	};

	const pohraniNovuVrijednost = (event) => {
		event.preventDefault();
		const novaVrijednost = {};
		kriteriji.forEach((kriterij) => {
			novaVrijednost[kriterij] = document.querySelector(`#${dajHtmlNaziv(kriterij)}`).value;
		});
		console.log(novaVrijednost);
		vrijednosti = [...vrijednosti, novaVrijednost];
	};
</script>

<h1>Analitički hijerarhijski proces</h1>
<p>
	Ovaj projekt dostupan je na repozitoriju <a
		href="https://github.com/mislavmatijevic/HijerarhijskiProcesWebAplikacija">na GitHub-u</a
	>.
</p>

<input id="txtKriterij" />
<button on:click={() => (kriteriji = [...kriteriji, document.querySelector('#txtKriterij').value])}>
	Dodaj kriterij
</button>

<form>
	<h2>Nova vrijednost</h2>
	{#each kriteriji as kriterij}
		<label for={dajHtmlNaziv(kriterij)}>{kriterij}: </label>
		<input id={dajHtmlNaziv(kriterij)} />
		<br />
	{/each}
	{#if kriteriji.length > 0}
		<button on:click={pohraniNovuVrijednost}>Dodaj novi element u tablicu</button>
	{/if}
</form>

<h2>Tablica</h2>

<table id="tablicaKriterija">
	<thead>
		{#each kriteriji as kriterij}
			<th>{kriterij}</th>
		{/each}
	</thead>
	<tbody>
		{#each vrijednosti as vrijednost}
			<tr>
				{#each kriteriji as kriterij}
					<td>{vrijednost[kriterij]}</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
