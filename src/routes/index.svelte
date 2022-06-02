<script>
    let kriteriji = [];
    let abc = "";
</script>

<h1>Analitički hijerarhijski proces</h1>
<p>Ovaj projekt dostupan je na repozitoriju <a href="https://github.com/mislavmatijevic/HijerarhijskiProcesWebAplikacija">na GitHub-u</a>.</p>

<input id="txtKriterij" on:change={(e) => abc = e.target.value} />
<button on:click={() => kriteriji = [...kriteriji, document.querySelector("#txtKriterij").value]}>Dodaj kriterij</button>

<span>{abc}</span>

<table id="tablicaKriterija">
    <thead>
        <!-- {@html kriteriji.map(value => "<th>"+value+"</th>")} -->
        <th>Atribut</th>
        <th>Cijena</th>
        <th>Prostor</th>
        <th>Kamera</th>
        <th>Izgled</th>
    </thead>
    <tbody>
        <!-- {@html kriteriji.map(() => "<tr>Neka vrijednost</tr>")} -->
        <tr>
            <td>Mobile 1</td>
            <td>$250</td>
            <td>16 GB</td>
            <td>12 MP</td>
            <td>5</td>
        </tr>
        <tr>
            <td>Mobile 2</td>
            <td>$200</td>
            <td>16 GB</td>
            <td>8 MP</td>
            <td>3</td>
        </tr>
        <tr>
            <td>Mobile 3</td>
            <td>$300</td>
            <td>32 GB</td>
            <td>16 MP</td>
            <td>4</td>
        </tr>
        <tr>
            <td>Mobile 4</td>
            <td>$275</td>
            <td>32 GB</td>
            <td>8 MP</td>
            <td>4</td>
        </tr>
        <tr>
            <td>Mobile 5</td>
            <td>$225</td>
            <td>16 GB</td>
            <td>16 MP</td>
            <td>2</td>
        </tr>
    </tbody>
</table>