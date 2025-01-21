import { ISearchTonality } from "../redux/slices/searchSlice";

export const validateInn = (data: number) => {
  let result = false;
  let error = null;
  const inn = data.toString();
  if (![10].includes(inn.length)) {
    error = 'ИНН может состоять только из 10 цифр';
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
        const n10 = checkDigit(inn, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
        if (n10 === parseInt(inn[9])) {
          result = true;
        }
        break;
      }
    }
    if (!result) {
      error = 'Неправильный ИНН';
    }
  }
  return error;
};

export const validateTonality = (tonality: string) => {
  if (!Object.values(ISearchTonality).includes(tonality as ISearchTonality)) {
    return 'Некорректное значение';
  }
} 

export const validateLimit = (limit: string) => {
  if (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 1000) {
    return (`Некорректное значение`);
  }
}

export const validateDate = (start: string, end: string) => {
  let error = null;

  const startDate = new Date(start);
  const endDate = new Date(end);
  const currentDate = new Date(Date.now());

  if (startDate > endDate) {
    console.log('Дата начала превышает дату конца');
    error = 'Дата начала превышает дату конца';
  }

  if (endDate > currentDate) {
    console.log('Дата конца превышает текущую дату');
    error = 'Дата конца превышает текущую дату';
    if (startDate > endDate) {
      console.log('Дата начала превышает дату конца');
      error = 'Дата начала превышает дату конца';
    }
  }

  return error;
};
