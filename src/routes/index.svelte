<script>
	let kriteriji = ['Naziv'];
	let vrijednosti = [];
	let trenutnaVrijednost = 0;

	const dajHtmlNaziv = (znakovniNiz) => {
		return 'input_' + znakovniNiz.trim().replace(' ', '_').toLowerCase();
	};

	const pohraniVrijednost = (event) => {
		event.preventDefault();
		const novaVrijednost = {};
		kriteriji.forEach((kriterij) => {
			novaVrijednost[kriterij] = document.querySelector(`#${dajHtmlNaziv(kriterij)}`).value;
		});

		if (trenutnaVrijednost < 0) {
			trenutnaVrijednost = 0;
		}

		if (trenutnaVrijednost == vrijednosti.length) {
			vrijednosti = [...vrijednosti, novaVrijednost];
			trenutnaVrijednost = vrijednosti.length;
		} else if (trenutnaVrijednost < vrijednosti.length) {
			vrijednosti[trenutnaVrijednost] = novaVrijednost;
		}
	};

	const uskladiInputeZaTrenutniElement = () => {
		kriteriji.forEach((kriterij) => {
			document.querySelector(`#${dajHtmlNaziv(kriterij)}`).value =
				vrijednosti[trenutnaVrijednost][kriterij];
		});
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
	<h2>
		{#if trenutnaVrijednost == vrijednosti.length}
			Nova
		{:else}
			{trenutnaVrijednost + 1}
		{/if} vrijednost
	</h2>
	<button
		on:click={(e) => {
			e.preventDefault();
			trenutnaVrijednost > 0 && trenutnaVrijednost--;
			uskladiInputeZaTrenutniElement();
		}}>&lt;-</button
	>
	<button
		on:click={(e) => {
			e.preventDefault();
			trenutnaVrijednost < vrijednosti.length && trenutnaVrijednost++;
			uskladiInputeZaTrenutniElement();
		}}>-&gt;</button
	>
	<br />
	{#each kriteriji as kriterij}
		<label for={dajHtmlNaziv(kriterij)}>{kriterij}: </label>
		<input id={dajHtmlNaziv(kriterij)} />
		<br />
	{/each}
	{#if kriteriji.length > 0}
		<button on:click={pohraniVrijednost}>
			{#if trenutnaVrijednost == vrijednosti.length}
				Dodaj novi element u tablicu
			{:else}
				Pohrani {trenutnaVrijednost + 1} element.
			{/if} vrijednost
		</button>
	{/if}
</form>

{#if vrijednosti.length > 0}
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

	<form>
		<input id="input_brisanje" />
		<button
			on:click={(e) => {
				e.preventDefault();
				const indeksBrisanje = document.querySelector('#input_brisanje').value;
				if (indeksBrisanje !== undefined && indeksBrisanje >= 0) {
					vrijednosti.splice(indeksBrisanje, 1);
					vrijednosti = [...vrijednosti];
				}
			}}>Izbriši element (0-{vrijednosti.length - 1})</button
		>
	</form>
{/if}
