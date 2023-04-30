export type TAppEnvironment = 'development' | 'staging' | 'production';

const environmentVars = {
  SKARTNER_SERVER: process.env.NEXT_PUBLIC_SKARTNER_SERVER,
  LOCAL_IP: process.env.NEXT_PUBLIC_LOCAL_IP,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as TAppEnvironment | undefined,
};

export default environmentVars;
