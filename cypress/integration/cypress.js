/// <reference types="Cypress" />

// const cypress = require("cypress");
// const { get, inRange } = require("lodash");

const URL = 'http://127.0.0.1:8080'

describe('My first test', () => {

    it('Visits the Kitchen Sink', () => {
        cy.visit(URL);
    })
})

describe('Asegurando que todos los elementos estén en pantalla', () => {
    it('Se asegura que los elementos ocultos estén ocultos y que haya dos selectores', () => {
        cy.get('#mostrar').should('not.be.visible');
        cy.get('#selector-de-moneda2').should('exist')
    })
})

describe('seleccionando dos monedas', () => {
    it('Selecciona las monedas, pone el precio, y se asegura que el mensaje se muestre', () => {
        cy.get('#selector-de-moneda1').select('Pesito');
        cy.get('#selector-de-moneda2').select('Dólar yanki');
        cy.get('#fecha').type('2021-01-01');
        cy.get('#cantidad').type('4');
        cy.get('#convertirValores').click();
    })
})

describe('Está el resultado', () => {
    it('Se asegura que se muestre el resultado', () => {
        cy.get('#mostrar').should('be.visible');
    })
})

describe('Cambio de valores', () => {
    it('Cambia los valores', () => {
        cy.get('#arrow').click();
    })
})