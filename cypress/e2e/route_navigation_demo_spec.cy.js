/// <reference types="cypress" />

describe("page routes loaded successfully", () => {
  before("before hook", () => {
    cy.visit("http://localhost:5173/");
  });

  it("shopping cart page loads from clicking cart icon", () => {
    cy.get("div[class='product-list-button']").click();
    cy.url().should("equal", "http://localhost:5173/cart");
    cy.get("button[class='product-list-button']").should("be.visible");
  });

  it("home page loads from clicking 'continue shopping' button", () => {
    cy.visit("http://localhost:5173/cart");
    cy.get("button.product-list-button").click();
    cy.url().should("equal", "http://localhost:5173/");
  });

  it("home page loads from clicking logo", () => {
    cy.visit("http://localhost:5173/cart");
    cy.get("h1.header_name").click();
    cy.url().should("equal", "http://localhost:5173/");
  });
});
