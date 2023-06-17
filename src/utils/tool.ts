import { createHash } from 'crypto';
const JWT = require('jsonwebtoken');

const salt = 'cvnert'; // 拼接随机数防破解
/**
 * 密码加密
 * @param {*} pwd
 * @returns
 */
export function encodePwd(pwd) {
  return createHash('md5')
    .update(pwd + salt)
    .digest('hex');
}
/**
 * jwt
 */
export const sign = async (user) => {
  return new Promise((resolve, reject) => {
    JWT.sign(user, salt, (error, token) => {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
};
