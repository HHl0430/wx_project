function isTrueValidateCodeBy18IdCard(idCard) {
  var a_idCard = idCard.split("")
  var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
  var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
  var sum = 0; // 声明加权求和变量
  if (a_idCard[17]) {
    if (a_idCard[17].toLowerCase() == "x") {
      a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
    }
    for (var i = 0; i < 17; i++) {
      sum += Wi[i] * a_idCard[i]; // 加权求和
    }
    let valCodePosition = sum % 11; // 得到验证码所位置
    if (a_idCard[17] == ValideCode[valCodePosition]) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

}

module.exports.isTrueValidateCodeBy18IdCard = isTrueValidateCodeBy18IdCard;