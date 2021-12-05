/// <reference types="jquery" />

const apiurl = 'https://api.exchangerate.host/'

function conectarCalcularyMostrarResultado(cantidad, moneda1, moneda2, fecha) {

    fetch(`${apiurl}${fecha}?base=${moneda1}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            const conversion = respuestaJSON.rates;

            $('#mostrarValor').text(conversion[moneda2] * parseInt(cantidad));

            console.log(respuestaJSON)
        })

        .catch(() => alert('Hubo un error, intente nuevamente o más tarde.'));


    mostrarLosValores(cantidad, moneda1, moneda2);
}

function mostrarLosValores(cantidad, moneda1, moneda2) {
    const $mostrar = $('#mostrar')
    $mostrar.removeClass('d-none');
    $('#mostrarCantidad').text(cantidad);
    $('#mostrarPrimeraMoneda').text(moneda1);
    $('#mostrarSegundoMoneda').text(moneda2);

    if (moneda1 === 'ARS' || moneda2 === 'ARS') {
        $mostrar.addClass('border-danger');
    }
    else {
        if ($mostrar.hasClass('border-danger')) {
            $mostrar.removeClass('border-danger').addClass('border-primary');
        }
    }
}

function invertirValoresSeleccionados() {
    let moneda1 = document.querySelector('#selector-de-moneda1').value;
    let moneda2 = document.querySelector('#selector-de-moneda2').value;
    let auxiliar = moneda1;

    document.querySelector('#selector-de-moneda1').value = moneda2;
    document.querySelector('#selector-de-moneda2').value = auxiliar;

    moneda1 = document.querySelector('#selector-de-moneda1').value;
    moneda2 = document.querySelector('#selector-de-moneda2').value;


    const cantidad = $('#cantidad').val();
    const fecha = $('#fecha').val();

    conectarCalcularyMostrarResultado(cantidad, moneda1, moneda2, fecha);
}

function sePuedeCalcular(cantidad, moneda1, moneda2, fecha) {
    return (moneda1 === 'Elegí la moneda' || moneda2 === 'Elegí la moneda' ||
        moneda1 === moneda2 || !fecha || cantidad === '0' || !/^[0-9]+$/.test(cantidad) || cantidad.length > 30 || cantidad.length < 1)
}


$('#convertirValores').click((e) => {
    const moneda1 = $('#selector-de-moneda1').val();
    const moneda2 = $('#selector-de-moneda2').val();
    const fecha = $('#fecha').val();
    const cantidad = $('#cantidad').val();

    if (!sePuedeCalcular(cantidad, moneda1, moneda2, fecha)) {
        conectarCalcularyMostrarResultado(cantidad, moneda1, moneda2, fecha);

    }

    e.preventDefault();
})

$('#change').click(e => {
    $('#mostrar').addClass('d-none');

    invertirValoresSeleccionados();

    e.preventDefault();
})


function agregarSelectorDos() {
    const selector1 = document.querySelector('#selector-de-moneda1');
    const selector2 = selector1.cloneNode(true);
    const posicion = document.querySelector('#monedas2');

    selector2.id = 'selector-de-moneda2';

    posicion.after(selector2);
}

agregarSelectorDos();
