export const validateInn = (innNumber: number) => {
  let result = false;

  // Преобразуем значение в строку
  const inn = String(innNumber);

  if (inn.length !== 10) {
    console.error('ИНН может состоять только из 10 цифр');
  } else {
    const checkDigit = (inn: string, coefficients: number[]) => {
      let n = 0;
      for (let i = 0; i < coefficients.length; i++) {
        n += coefficients[i] * Number(inn[i]);
      }
      return (n % 11) % 10;
    };

    const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
    if (n10 === Number(inn[9])) {
      result = true;
    } else {
      console.error('Неправильное контрольное число');
    }
  }

  return result;
};
