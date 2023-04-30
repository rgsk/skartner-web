import { evaluateCustomEnvironmentModifier } from './customEnvironmentModifier';

const productionOrDisableModifierBehaviour = (
  customEnvironmentModifier: ReturnType<
    typeof evaluateCustomEnvironmentModifier
  >
) => {
  expect(customEnvironmentModifier.offInProduction.offInDevelopment).to.equal(
    false
  );
  expect(customEnvironmentModifier.offInProduction.onInDevelopment).to.equal(
    false
  );
  expect(customEnvironmentModifier.onInProduction.offInDevelopment).to.equal(
    true
  );
  expect(customEnvironmentModifier.onInProduction.onInDevelopment).to.equal(
    true
  );
};
it('customEnvironmentModifier works correctly if NODE_ENV and envNameForCustomBehaviour are different', () => {
  let customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'production',
    disableModifier: false,
    envNameForCustomBehaviour: 'development',
  });
  productionOrDisableModifierBehaviour(customEnvironmentModifier);
  customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'production',
    disableModifier: true,
    envNameForCustomBehaviour: 'development',
  });
  productionOrDisableModifierBehaviour(customEnvironmentModifier);
});

it('customEnvironmentModifier works correctly if NODE_ENV and envNameForCustomBehaviour are same', () => {
  const customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'development',
    disableModifier: false,
    envNameForCustomBehaviour: 'development',
  });
  expect(customEnvironmentModifier.offInProduction.offInDevelopment).to.equal(
    false
  );
  expect(customEnvironmentModifier.offInProduction.onInDevelopment).to.equal(
    true
  );
  expect(customEnvironmentModifier.onInProduction.offInDevelopment).to.equal(
    false
  );
  expect(customEnvironmentModifier.onInProduction.onInDevelopment).to.equal(
    true
  );
});

it('customEnvironmentModifier works correctly if NODE_ENV and envNameForCustomBehaviour are same but we have disabled modifier', () => {
  const customEnvironmentModifier = evaluateCustomEnvironmentModifier({
    NODE_ENV: 'development',
    disableModifier: true,
    envNameForCustomBehaviour: 'development',
  });
  productionOrDisableModifierBehaviour(customEnvironmentModifier);
});
