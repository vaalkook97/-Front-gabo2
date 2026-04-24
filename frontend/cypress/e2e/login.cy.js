describe('Login', () => {
  it('permite autenticarse y navegar a empleados', () => {
    cy.visit('/login');

    cy.contains('label', 'Usuario').find('input').clear().type('admin');
    cy.contains('label', 'Contraseña').find('input').clear().type('admin123');
    cy.contains('button', 'Entrar').click();

    cy.url().should('include', '/empleados');
    cy.contains('h1', 'Gestión de Empleados').should('be.visible');
  });
});
