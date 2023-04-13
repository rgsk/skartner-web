type TAppEnvironment = 'development' | 'staging' | 'production';

const environmentVars = {
  LOCAL_IP: process.env.NEXT_PUBLIC_LOCAL_IP,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as TAppEnvironment | undefined,
};

export default environmentVars;
