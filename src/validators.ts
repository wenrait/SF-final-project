export const validateInn = (data: number) => {
  let result = false;
  let error = null;
  const inn = data.toString();
  if (![10, 12].includes(inn.length)) {
    error = 'ИНН может состоять только из 10 или 12 цифр';
  } else {
    const checkDigit = (inn: string, coefficients: number[]) => {
      return (
        (coefficients.reduce(
          (acc, coefficient, index) => acc + coefficient * parseInt(inn[index]),
          0,
        ) %
          11) %
        10
      );
    };
    switch (inn.length) {
      case 10: {
        console.log('Длина ИНН 10');
        const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        console.log('n10', n10);
        if (n10 === parseInt(inn[9])) {
          result = true;
          console.log('result: ', result);
        }
        break;
      }
      case 12: {
        console.log('Длина ИНН 12');
        const n11 = checkDigit(inn, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        const n12 = checkDigit(inn, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
        console.log('n11', n11);
        console.log('n12', n12);
        if (n11 === parseInt(inn[10]) && n12 === parseInt(inn[11])) {
          result = true;
        }
        break;
      }
    }
    if (!result) {
      error = 'Неправильный ИНН';
    }
  }
  return { result, error };
};
