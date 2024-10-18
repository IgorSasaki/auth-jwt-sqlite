import crypto from 'crypto-js'

export const encryptPassword = (password: string) =>
  crypto.SHA256(password).toString(crypto.enc.Hex)
