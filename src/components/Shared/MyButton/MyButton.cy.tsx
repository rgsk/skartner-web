import MyButton from './MyButton';

describe('<MyButton />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MyButton>hii</MyButton>);
  });
});
