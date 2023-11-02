import * as crypto from 'node:crypto';
import * as path from 'node:path';
import * as fs from 'fs';

function checkExistFolder(name: string) {
  const check_path = path.join(__dirname, `../../${name}`);
  !fs.existsSync(check_path) && fs.mkdir(check_path, (err) => err);
}
function getAccessTokenKeyPair() {
  checkExistFolder('secure');
  const accessTokenPrivateKeyPath = path.join(
    __dirname,
    '../../secure/access_token_private.key',
  );
  const accessTokenPublicKeyPath = path.join(
    __dirname,
    '../../secure/access_token_public.key',
  );

  const accessTokenPrivateKeyExists = fs.existsSync(accessTokenPrivateKeyPath);
  const accessTokenPublicKeyExists = fs.existsSync(accessTokenPublicKeyPath);
  if (!accessTokenPrivateKeyExists || !accessTokenPublicKeyExists) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    fs.writeFileSync(accessTokenPrivateKeyPath, privateKey);
    fs.writeFileSync(accessTokenPublicKeyPath, publicKey);
  }

  const accessTokenPrivateKey = fs.readFileSync(
    accessTokenPrivateKeyPath,
    'utf-8',
  );
  const accessTokenPublicKey = fs.readFileSync(
    accessTokenPublicKeyPath,
    'utf-8',
  );
  return {
    accessTokenPrivateKey,
    accessTokenPublicKey,
  };
}

function getRefreshTokenKeyPair() {
  checkExistFolder('secure');
  const refreshTokenPrivateKeyPath = path.join(
    __dirname,
    '../../secure/refresh_token_private.key',
  );
  const refreshTokenPublicKeyPath = path.join(
    __dirname,
    '../../secure/refresh_token_public.key',
  );

  const refreshTokenPrivateKeyExists = fs.existsSync(
    refreshTokenPrivateKeyPath,
  );
  const refreshTokenPublicKeyExists = fs.existsSync(refreshTokenPublicKeyPath);
  if (!refreshTokenPrivateKeyExists || !refreshTokenPublicKeyExists) {
    const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    });

    fs.writeFileSync(refreshTokenPrivateKeyPath, privateKey);
    fs.writeFileSync(refreshTokenPublicKeyPath, publicKey);
  }

  const refreshTokenPrivateKey = fs.readFileSync(
    refreshTokenPrivateKeyPath,
    'utf-8',
  );
  const refreshTokenPublicKey = fs.readFileSync(
    refreshTokenPublicKeyPath,
    'utf-8',
  );
  return {
    refreshTokenPrivateKey,
    refreshTokenPublicKey,
  };
}

export const { accessTokenPrivateKey, accessTokenPublicKey } =
  getAccessTokenKeyPair();

export const { refreshTokenPrivateKey, refreshTokenPublicKey } =
  getRefreshTokenKeyPair();
