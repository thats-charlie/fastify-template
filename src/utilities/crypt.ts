import crypto from 'crypto';

type pbkdf2_sha256 = {
    iterations : number;    
    salt       : string;
    hash?      : string;
};

const pbkdf2_sha256_encode = (plaintext : string, options : pbkdf2_sha256) : string => 
{
    const { salt, iterations } = options;
    const hash = crypto.pbkdf2Sync(plaintext, salt, iterations, 32, 'sha256');
    return `pbkdf2_sha256$${iterations}$${salt}$${hash.toString('base64')}`;
};

const pbkdf2_sha256_decode = (encoded : string) : pbkdf2_sha256 => 
{
    /* eslint-disable  @typescript-eslint/no-unused-vars */
    const [ _, iterations, salt, hash ] = encoded.split('$');
    return {
        iterations : parseInt(iterations, 10),
        hash,
        salt
    };
};

export const randomNbytes = (N : number) : string => crypto.randomBytes(N).toString('hex');

export const verifyPassword = (plaintext : string, encoded : string) : boolean => 
{
    const options = pbkdf2_sha256_decode(encoded);
    return encoded === pbkdf2_sha256_encode(plaintext, options);
};

export const hashPassword = (plaintext : string) : string => 
{
    const salt = crypto.randomBytes(16).toString('hex');
    const iterations = 150000;
    return pbkdf2_sha256_encode(plaintext, { iterations, salt });
};