/// <reference types="jquery" />

function calcularyMostrarResultado(cantidad, moneda1, moneda2) {
    fetch(`https://v6.exchangerate-api.com/v6/f6c77984cd08b1e7d512dd13/latest/${moneda1}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            const conversion = respuestaJSON.conversion_rates;

            $('#mostrarValor').text(conversion[moneda2] * parseInt(cantidad));

        })

        .catch(error => console.error("Algo no salió como debía.", error));


    mostrarLosValores(cantidad, moneda1, moneda2);

}

function mostrarLosValores(cantidad, moneda1, moneda2) {
    const $mostrar = $('#mostrar')
    $mostrar.removeClass('d-none');
    $('#mostrarCantidad').text(cantidad);
    $('#mostrarPrimeraMoneda').text(moneda1);
    $('#mostrarSegundoMoneda').text(moneda2);

    if(moneda1 === 'ARS'){
        $mostrar.addClass('border-danger')
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


    const cantidad = $('#convertir > input').val()
    calcularyMostrarResultado(cantidad, moneda1, moneda2);
}



$('#convertir > button').click((e) => {
    const moneda1 = $('#selector-de-moneda1').val()
    const moneda2 = $('#selector-de-moneda2').val()

    const cantidad = $('#convertir > input').val()

    if (moneda1 === 'Elegí la moneda' || moneda2 === 'Elegí la moneda' || moneda1 === moneda2) {

    } else {
        calcularyMostrarResultado(cantidad, moneda1, moneda2);
    };


    e.preventDefault();
})

$('#change').click(e => {
    $('#mostrar').addClass('d-none');

    invertirValoresSeleccionados();

    e.preventDefault();
})


function agregarSelectorDos(){
    const selector1 = document.querySelector('#selector-de-moneda1');
    const selector2 = selector1.cloneNode(true);
    const posicion = document.querySelector('#monedas2');

    selector2.id='selector-de-moneda2';

    posicion.after(selector2);
}

agregarSelectorDos();
