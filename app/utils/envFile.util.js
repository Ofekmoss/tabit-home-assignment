import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
    console.log(result.error);
    process.exitCode = 1;
}
