export type TAppEnvironment = 'development' | 'staging' | 'production';

let environmentVars = {
  SKARTNER_SERVER: process.env.NEXT_PUBLIC_SKARTNER_SERVER,
  LOCAL_IP: process.env.NEXT_PUBLIC_LOCAL_IP,
  APP_ENV: process.env.NEXT_PUBLIC_APP_ENV as TAppEnvironment | undefined,
};

// if (
//   environmentVars.APP_ENV === 'development' &&
//   environmentVars.LOCAL_IP &&
//   environmentVars.SKARTNER_SERVER
// ) {
//   environmentVars = {
//     ...environmentVars,
//     SKARTNER_SERVER: environmentVars.SKARTNER_SERVER.replace(
//       'localhost',
//       environmentVars.LOCAL_IP
//     ),
//   };
// }

export default environmentVars;
