export interface LoginReq {
  login: string;
  password: string;
}

export interface LoginRes {
  accessToken: string; // Токен авторизации.
  expire: Date; // Дата и время окончания действия токена.
}

export interface AccInfoResponse {
  eventFiltersInfo: EventFiltersInfo; // Информация о лимитах онлайн-мониторинга для аккаунта.
}

export interface SearchHistogramsReq {
  intervalType: 'day' | 'week' | 'month' | 'quarter' | 'year'; // Шаг статистики. Для проекта - month.
  histogramTypes: ('totalDocuments' | 'riskFactors')[]; // Типы статистики. Одно или несколько значений. Допустимые значения: totalDocuments — всего публикаций; riskFactors — публикаций, в которых целевые объекты являются участниками риск-факторов. Для целей данного проекта необходимо отправлять оба значен
  issueDateInterval: Search.DateInterval; // Период дат поиска.
  searchContext: Search.SearchContext; // Контекст поиска.
  limit: number; // Количество возвращаемых публикаций. Значение от 1 до 1000.
  sortType: 'issueDate' | 'sourceInfluence'; // Тип сортировки. issueDate — дата публикации; sourceInfluence — вес источника.
  sortDirectionType: 'desc' | 'asc'; // desc - по убыванию, asc - по возрастанию
  attributeFilters?: Filter.Attributes; // Фильтр по атрибутам публикаций.
  searchArea: unknown; // В рамках данного проекта не используется.
  similarMode: 'none' | 'duplicates'; // none — без фильтрации, в выдачу включаются все публикации; duplicates — фильтр по дубликатам, в выдачу включается по одной публикации из каждого кластера дублей.

}

export interface SearchHistogramsRes {
  data: Analytics.HistogramData[]; // Статистика публикаций по времени.
}

export interface SearchReq extends SearchHistogramsReq {}

export interface SearchRes {
  items: SearchResultItem[]; // Список найденных публикаций.
  mappings: unknown; // В рамках данного проекта не используется.
}

export interface DocumentsReq {
  ids: string[]; // Массив идентификаторов публикаций. Максимальное допустимое количество элементов в списке = 100.
}

export interface DocumentsRes {
  ok: ScanDoc; // Объект публикации. Возвращается в случае успешного получения публикации по ID.
  fail: { errorCode: number; errorMessage: string }; // Информация об ошибке. Возвращается, если по определённому ID не удалось получить публикацию.
}

export interface EventFiltersInfo {
  usedCompanyCount: number; // Количество компаний, по которым производится онлайн-мониторинг в данном аккаунте.
  companyLimit: number; // Максимальное количество компаний, которое доступно поставить на онлайн-мониторинг, согласно условиям тарифа для аккаунта.
}

export namespace Filter {
  // Фильтры по атрибутам документа/публикации.
  export interface Attributes {
    excludeTechNews: boolean; // Признак исключения публикаций с атрибутом {IsTechNews} из результатов.
    excludeAnnouncements: boolean; // Признак исключения публикаций с атрибутом {IsAnnouncement} из результатов.
    excludeDigests: boolean; // Признак исключения публикаций с атрибутом {IsDigest} из результатов.
  }
}

export namespace Search {
  // Период дат для поискового запроса:
  export interface DateInterval {
    startDate: string; // Дата начала периода запроса. Формат yyyy-mm-dd. Обязательное.
    endDate: string; // Дата окончания периода запроса. Формат yyyy-mm-dd. Обязательное.
  }

  // Логическое выражение запроса: список одного или нескольких целевых объектов поиска и опциональных уточняющих условий.
  // В рамках проекта объект поиска всегда будет только один.
  export interface SearchContext {
    targetSearchEntitiesContext: TargetSearchEntitiesContext; // Целевые компании/персоны поиска и их параметры.
    // searchEntitiesFilter?: Filter<Entities.SearchEntity>; // Уточняющий запрос по компаниям/персонам.
    // locationsFilter?: Search.Filter<Location>; //Уточняющий запрос по странам/регионам.
    // themesFilter?: Search.Filter<Theme>; // Уточняющий запрос по темам
  }

  // Целевые компании/персоны поиска и их параметры.
  export interface TargetSearchEntitiesContext {
    targetSearchEntities: Entities.TargetSearchEntity[]; // Целевые компании и/или персоны
    onlyMainRole: boolean; // Главная роль в отношении целевых объектов:t rue — выдаются только публикации, в которых целевой объект упоминается в главной роли; false — наличие или отсутствие главной роли не проверяется.
    onlyWithRiskFactors: boolean; // Наличие риск-факторов в отношении целевых объектов:	true — выдаются только публикации, в которых целевой объект упоминается в контексте какого-либо риск-фактора; false — наличие или отсутствие риск-факторов не проверяется.
    tonality: 'any' | 'negative' | 'positive'; // Тональность упоминаний в отношении целевых объектов. Any — не проверяется; negative — негативная;	positive — позитивная.
    riskFactors: unknown;
    themes: unknown;
  }

  export namespace Entities {
    // Целевой объект поиска — компания или персона.
    // При поиске компании допустимо задавать только одно из
    // перечисленных полей: sparkId (код СПАРК), inn (ИНН),
    // entityId (идентификатор компании по каталогу СКАН).
    // В рамках данного проекта будет использоваться только поиск
    // компании по ИНН, остальные поля должны иметь значение null.
    export interface TargetSearchEntity {
      type: 'company' | 'suggestedPersons'; // Company — компания; suggestedPersons — персона. В рамках данного проекта нужно использовать значение company.
      inBusinessNews: boolean; // Фильтр по наличию или отсутствию бизнес-контекста вокруг объекта: true — выдаются только новости, где объект упоминается в бизнес-контексте (деловые темы); false — выдаются только новости, где объект упоминается не в бизнес-контексте (например, новости культуры, спорта, упоминание банка для указания его реквизитов); null — фильтр не применяется.
      sparkId: number; // Код СПАРК юридического лица
      entityId: number; // Идентификатор по каталогу объектов СКАН
      inn: string; // ИНН юридического лица
      maxFullness: boolean; // Подход к поиску — признак максимальной полноты. Применяется только при поиске по sparkId или inn. Одно значение из списка: false — выдача только результатов с высокой точностью (поиск с учётом контекста); true — выдача результатов с высокой полнотой (объединяются результаты поиска с учётом контекста и поиска по похожим названиям).
    }

    export interface SearchEntity {

    }
  }
}

export namespace Analytics {
  // Сводная статистика по периодам времени:
  export interface HistogramData {
    data: IntervalPoint[]; // Значения статистики по периодам времени.
    histogramType: 'totalDocuments' | 'riskFactors'; // TotalDocuments -- всего публикаций, rickFactors -- публикации, в которых целевые объекты являются участниками риск-факторов
  }
  // Значения статистики по периодам времени:
  export interface IntervalPoint {
    date: string; // Дата и время начала периода.
    value: number; // Количество публикаций.
  }
}

// Элемент списка публикаций по результатам поиска:
export interface SearchResultItem {
  encodedId: string; // Идентификатор публикации.
  influence: number; // Вес источника публикации.
  similarCount: number; // Количество похожих публикаций. Актуально только при поиске с группировкой выдачи по кластерам дублей.
}

// Публикация в формате ScanDoc:
export interface ScanDoc {
  schemaVersion: string; // Версия формата публикации.
  id: string; // ID публикации.
  version: number; // Версия данных внутри документа.
  issueDate: Date; // Дата и время публикации.
  url: string; //Ссылка на страницу оригинала публикации.
  author: Document.Author; // Автор публикации.
  source: Document.Source; // Источник публикации.
  dedupClusterId: string; // ID кластера дубликатов.
  title: Document.Title; // Заголовок публикации.
  content: Document.Content; // Содержимое документа.
  entities: unknown; // В рамках данного проекта не используется.
  attributes: Document.Attributes; // Дополнительные атрибуты публикации.
  language: string; // Язык публикации. Возможные значения: Russian — русский; other — другие языки; unknown — язык не указан.
}

export namespace Document {
  // Автор публикации:
  export interface Author {
    name: string; // Имя автора.
  }
  // Дополнительные атрибуты источника публикации:
  export interface Source {
    id: number; // ID источника.
    name: string; // Наименование источника.
    categoryId: number; // ID категории источника.
    levelId: number; // ID уровня источника.
    groupId: number; // ID группы источника.
  }
  // Заголовок публикации
  export interface Title {
    text: string; // Текст заголовка без разметки.
    markup: string; // Текст заголовка с лингвистической XML-разметкой.
  }
  // Содержимое документа
  export interface Content {
    markup: string; // Текст публикации с лингвистической XML-разметкой.
  }
  // Дополнительные атрибуты публикации
  export interface Attributes {
    isTechNews: boolean; // Признак того, что публикация является технической новостью.
    isAnnouncement: boolean; // Признак того, что публикация является анонсом или календарём событий.
    isDigest: boolean; // Признак того, что публикация является дайджестом, то есть сводкой новостей.
    wordCount: number; // Количество слов текста публикации.
    influence: unknown; // В рамках данного проекта не используется.
    coverage: unknown; // В рамках данного проекта не используется.
  }
}
