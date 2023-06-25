import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';
import * as jwt from 'jsonwebtoken';
const prisma = new PrismaClient();
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
    jwt.sign(user, salt, (error, token) => {
      if (error) {
        return reject(error);
      }
      resolve(token);
    });
  });
};
/**
 * 解密token返回用户信息
 */

export const getUserInfo = async (token) => {
  const decoded = jwt.verify(token, 'cvnert') as any;
  const user = await prisma.user.findUnique({
    where: {
      uid: decoded,
    },
  });

  return new Promise((resolve, reject) => {
    if (user) {
      resolve(user);
    } else {
      reject('用户不存在');
    }
  });
};
