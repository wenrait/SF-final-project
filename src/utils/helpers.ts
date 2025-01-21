import { ISearchTonality } from '../redux/slices/searchSlice';

export const getTonality = (tonality: string) => {
  switch (tonality) {
    case 'Любая':
      return ISearchTonality.Any;
    case 'Позитивная':
      return ISearchTonality.Positive;
    case 'Нейтральная':
      return ISearchTonality.Neutral;
    case 'Негативная':
      return ISearchTonality.Negative;
    default:
      return ISearchTonality.Any;
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

  const result = Array.from(scandoc.getElementsByTagName('sentence'))
    .map(sentence => sentence.textContent)

  return result.join(' ') || '';
}