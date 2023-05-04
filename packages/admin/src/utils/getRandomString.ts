function getRandomString(length: number) {
  const characters =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let couponCode = '';
  for (let i = 0; i < length; i++) {
    couponCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return couponCode.toUpperCase();
}

export default getRandomString;
