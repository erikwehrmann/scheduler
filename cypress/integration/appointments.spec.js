describe("should book an interview", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
   });
  it("should book an interview", () => {
    cy.get("[alt=Add]")
      .first()
      .click();
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']")
      .click();
    cy.contains("Save")
      .click();
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .invoke("show")
      .click();
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type('Erik Wehrmann');
    cy.get("[alt='Tori Malcolm']")
      .click();
    cy.contains("Save")
      .click();
      cy.contains(".appointment__card--show", "Erik Wehrmann");
      cy.contains(".appointment__card--show", "Tori Malcolm");
  })
  it("should delete an interview", () => {
    cy.get("[alt=Delete]")
      .first()
      .invoke("show")
      .click();
    cy.contains("Confirm")
      .click();
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
});