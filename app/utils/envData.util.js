import { environments } from '../constants/general.strings.js';

const tabitEnv = process.env.TABIT_ENV && process.env.TABIT_ENV.trim();

if (!tabitEnv) {
    console.error(new Error('Missing or invalid tabit env'));
    process.exitCode = 1;
}
console.log('Tabit env is: ' + tabitEnv);

export const isProdEnv = tabitEnv === environments.PROD;
export const isDevEnv = tabitEnv === environments.DEV;
export const isLocalEnv = tabitEnv === environments.LOCAL;
