let presupuesto = document.getElementById('presupuesto');
let valorPresupuesto = document.getElementById('columna_presupuesto');
let nombreGasto = document.getElementById('nombre_gasto');
let gasto = document.getElementById('gasto');
let valorGasto = document.getElementById('columna_gasto');
let valorSaldo = document.getElementById('columna_saldo');
let formulario = document.getElementById('form_1');
let formulario2 = document.getElementById('form_2');
let tablaGastos = document.getElementById('tabla_gastos');
let arrayGastos = [];

// constructor para los gastos
function Gasto(name, valor) {
    this.name = name;
    this.value = valor;
}

const agregarGasto = () => {
    if (nombreGasto.value == '' || gasto.value == '') {
        alert('Porfavor llene las 2 casillas de gastos antes de continuar');
        return;  
    }
    if (gasto.value <= 0) {
        alert('Porfavor ingrese un gasto positivo');
        return;
    }
    let solicitud = new Gasto(nombreGasto.value, gasto.value)
    arrayGastos.push(solicitud);
    show();
    clearForm();
}

const sumatoriaGasto = () => {
    let sumaGastos = 0;
    for (let numero of arrayGastos) {
        sumaGastos += parseInt(numero.value);
    }
    valorGasto.innerHTML = `
        <td>$ ${sumaGastos}</td>
    `
    valorGasto.classList.add('balance');
}

const show = () => {
    tablaGastos.innerHTML = `
        <tr>
            <th>GASTO</th>
            <th>VALOR</th>
            <th class="eliminar_columna"></th>
        </tr>`;
    for (let costo of arrayGastos) {
        let row = tablaGastos.insertRow(-1)
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        cell1.innerHTML = `${costo.name}`;
        cell1.classList.add('td') 
        cell2.innerHTML = `$ ${costo.value}`;
        cell2.classList.add('td');
        cell3.innerHTML = `<button onclick="deleteCost(this);" id="${costo.name}"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash eliminar"   width="36" height="36" viewBox="0 0 24 24" stroke-width="1.5" stroke="#137dfb" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M4 7l16 0" />
        <path d="M10 11l0 6" />
        <path d="M14 11l0 6" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
        </svg></button>`; 
        cell3.classList.add('td');
    }
    sumatoriaGasto();
    saldo();
}

const deleteCost = (id) => {
    let row = id.parentNode.parentNode;
    let index = row.rowIndex;
    tablaGastos.deleteRow(row.rowIndex);
    arrayGastos.splice(index-1,1);
    sumatoriaGasto();
    saldo();
}
const agregarPresupuesto = () => {
    if (presupuesto.value == '') {
        alert('Porfavor ingrese un presupuesto');
        return;
    }
    valorPresupuesto.innerHTML = `
        <td>$ ${presupuesto.value}</td>
    `;
    valorPresupuesto.classList.add('balance');
    show();
    clearForm();
    activarBoton();

}

const activarBoton = () => {
    let boton = document.getElementById('boton_gastos');
    boton.outerHTML = `<button type="button" class="btn btn-outline-danger" onclick="agregarGasto();" id="boton_gastos">Añadir Gasto</button>`
}

const clearForm = () => {
    formulario.reset();
    formulario2.reset();
}

const saldo = () => {
    let income = document.getElementById('columna_presupuesto').innerHTML.trim();
    let outcome = document.getElementById('columna_gasto').innerHTML.trim();
    let incomeNumbers = income.replace(/\D+/g, "");
    let outcomeNumbers = outcome.replace(/\D+/g, "");
    let saldo = parseInt(incomeNumbers) - parseInt(outcomeNumbers);
    valorSaldo.innerHTML = `$ ${saldo}`;
    valorSaldo.classList.add('balance');
}
