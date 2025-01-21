import { ISeachTonality } from '../redux/slices/searchSlice';

export const getTonality = (tonality: string) => {
  switch (tonality) {
    case 'Любая':
      return ISeachTonality.Any;
    case 'Позитивная':
      return ISeachTonality.Positive;
    case 'Нейтральная':
      return ISeachTonality.Neutral;
    case 'Негативная':
      return ISeachTonality.Negative;
    default:
      return ISeachTonality.Any;
  }
};

export const getDate = (dateString: string, full?: boolean,) => {
  const date = dateString.slice(0, 11);
  const month = date.slice(5, 7)
  const year = date.slice(0, 4)
  const day = date.slice(8, 10);

  if (!full) {
    return `${month}.${year}`;
  }
    return `${day}.${month}.${year}`;
}

export const parseXML = (xmlString: string) => {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');
  const scandoc = xml.getElementsByTagName('scandoc')[0];
  const images = scandoc.getElementsByTagName('img');

  if (!scandoc) {
    console.error('Тег <scandoc> не найден');
    return '';
  }

  if (images) {
    console.log(images)
  }

  // const sentences = Array.from(scandoc.getElementsByTagName('sentence'));
  // console.log(sentences);

  const result = Array.from(scandoc.getElementsByTagName('sentence'))
    .map(sentence => sentence.textContent)

  // console.log(result);

  // const sentences = scandoc.getElementsByTagName('sentence').innerHTML;

  // console.log('sentences', sentences);

  // const imagesArr = sentences.

  //const imagesArr = result.map((sentence) => sentence.ge)

  return result.join(' ') || '';
}