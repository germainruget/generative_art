export const randomGreyHex = () => {
    var v = ((Math.random() * 256) | 0).toString(16); //bitwise OR. Gives value in the range 0-255 which is then converted to base 16 (hex).
    return '#' + v + v + v;
};
