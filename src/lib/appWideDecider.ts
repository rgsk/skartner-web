import customEnvironmentModifier from './customEnvironmentModifier';

const appWideDecider = {
  enableMixpanelLogs: customEnvironmentModifier.offInProduction.onInDevelopment,
};
export default appWideDecider;
