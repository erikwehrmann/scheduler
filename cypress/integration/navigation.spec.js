describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });
  it("should navigate to Tuesday", () => {
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
  // Made these tests before I realized I was supposed to make them in the next task
  it("should book an interview", () => {
    cy.request("get", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
    cy.get("[data-testid=Add-Button]")
      .first()
      .click()
    cy.get("[data-testid=student-name-input]")
      .type("Erik Wehrmann")
    cy.get("[alt='Tori Malcolm']")
      .click()
    cy.contains("Save")
      .click()
    cy.contains(":nth-child(2) > .appointment__card", "SAVING")
    cy.contains(".appointment__card--show", "Erik Wehrmann");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should edit an interview", () => {
    cy.request("get", "/api/debug/reset")
    cy.visit("/")
    cy.get("[data-testid=Edit-Button")
      .invoke("show")
      .click()
    cy.get("[data-testid=student-name-input]")
      .click()
      .type('{selectall}{backspace}')
      .type("Erik Wehrmann")
    cy.get("[alt='Tori Malcolm']")
      .click()
    cy.contains("Save")
      .click()
    cy.get("[data-testid=Student]")
      .contains("Erik Wehrmann")
    cy.get("[data-testid=Interviewer]")
      .contains("Tori Malcolm")
  });
  it("should cancel an interview", () => {
    cy.request("get", "/api/debug/reset")
    cy.visit("/")
    cy.get("[data-testid=Delete-Button")
      .invoke("show")
      .click()
    cy.get(".appointment__actions > :nth-child(2)")
      .click()
    cy.get(':nth-child(1) > .appointment__add')
  });
});