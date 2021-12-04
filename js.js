/// <reference types="jquery" />

const $valor = $('#valor')

function calcularyMostrarResultado(cantidad, moneda1, moneda2) {
    fetch(`https://v6.exchangerate-api.com/v6/f6c77984cd08b1e7d512dd13/latest/${moneda1}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            const conversion = respuestaJSON.conversion_rates;

            $('#mostrarValor').text(conversion[moneda2] * parseInt(cantidad));

        })

        .catch(error => console.error("Algo no salió como debía.", error));


    mostrarData(cantidad, moneda1, moneda2);

}

function mostrarData(cantidad, moneda1, moneda2) {
    $('#mostrar').removeClass('d-none');
    $('#mostrarCantidad').text(cantidad);
    $('#mostrarPrimerMoneda').text(moneda1);
    $('#mostrarSegundoMoneda').text(moneda2);
}

function cambiarValoresSeleccionados() {
    let moneda1 = document.querySelector('#selector-de-moneda1').value;
    let moneda2 = document.querySelector('#selector-de-moneda2').value;
    let auxiliar = moneda1;
    
    document.querySelector('#selector-de-moneda1').value = moneda2;
    document.querySelector('#selector-de-moneda2').value = auxiliar;
    
    const cantidad = $('#mostrarCantidad').text();
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
    
    cambiarValoresSeleccionados();

    e.preventDefault();
})
