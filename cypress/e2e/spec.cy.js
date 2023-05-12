describe("Checking if localhost is running", () => {
  /*  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });*/

  it("finds the right header", () => {
    cy.get("h1").contains("My Todo list");
  });

  it("displays three todo items by default", () => {
    cy.get("tr").should("have.length", 3);
  });

  it("adds a new todo task and checks if they are on the list", () => {
    const newItem = "Buy salt";
    cy.get("input.form-control").type(`${newItem}`);
    cy.get('button[id="addBtn"]').click();

    cy.get("tr").should("have.length", 4).first().should("have.text", newItem);
  });

  it("checks the item as completed", () => {
    cy.contains("Fill Gas")
      .parent()
      .find('span[class="glyphicon glyphicon-ok icon"]')
      .click();

    cy.contains("Fill Gas").should("have.class", "done");
  });

  context("with checked task", () => {
    beforeEach(() => {
      cy.contains("Fill Gas")
        .parent()
        .find('span[class="glyphicon glyphicon-ok icon"]')
        .click();
    });

    it("deletes the item from the list", () => {
      cy.contains("Fill Gas").find('[data-cy="markAsDeleted"]').click();

      cy.get("tr").should("have.length", 2).should("not.have.text", "Fill Gas");

      cy.contains('[data-cy="markAsDeleted"]').should("not.exist");
    });
  });
});
