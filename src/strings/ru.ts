
export const START_TEXT_TITLE = `Добро пожаловать на Turtle Parser`;
export const START_TEXT = `Turtle Parser - это простая в использовании утилита для парсинга необходимой вам информации с любого сайта.
В целях экономии ресурсов пользователям разрешается отправлять только 3 запроса в день на получение информации (включая неуспешные запросы).

Руководство по пользованию утилитой Turtle Parser

Как правильно пользоваться этой утилитой:
1. Введите полный url необходимой вам страницы любого сайта.
2. Заполнение формы Поиск по нескольким страницам:
Это необязательная форма. Если сайт имеет несколько страниц, выберете параметр "Is Multiple Pages", введите название параметра запроса для поиска определенной страницы по ее номеру и укажите начальную страницу, последнюю страницу и с каким шагом нужно по ним проходиться.
Номер Страницы: Это параметр из URL, указывающий на текущую страницу. Например, в URL https://www.kinopoisk.ru/lists/movies/top250/?page=2, "page" - это параметр номера страницы.
(Например: есть url https://www.kinopoisk.ru/lists/movies/top250/?page=2, для поиска на 1, 3 и 5 странице необходимо ввести в качестве названия параметра 'page', первая страница - 1, шаг - 2, конечная страница - 5)
3. Заполнение формы Поиск информации по элементам:
Это форма, в которой изначально есть два вложенных элемента, где один из них находится внутри другого. Первый - это контейнер, в котором находится список искомых элементов, а второй - один из этих искомых элементов.
К каждому искомому элементу можно добавить список вложенных элементов, для поиска информации во внутренних элементах и к каждому элементу можно добавить список искомой информации.
Пример:
Есть на странице такой блок - 
<ul id="list-of-films">
\t<li name="Один дома"></li>
\t<li name="Пианист"></li>
\t<li name="Титаник"></li>
</ul>

Для указания контейнера и искомых в нем элементов, вам в первом элементе нужно выбрать тип поиска по классу и указать "list-of-films", а во вложенном в нем элементе необходимо указать поиск по тэгу "li".
Для получения искомой вам информации, появляется соответствующая форма, где необходимо сначала указать название столбца в будущей таблице, где она впоследствии будет храниться, а далее тип поиска: 
InnerText (Получение всего текста из элемента и его вложенных элементов, пример: элемент - <div> Титаник <p> Год: 1997 </p> <p> Рейтинг: 8.5 </p></div>, получаемая информация при InnerText - "Титаник Год: 1997 Рейтинг: 8.5")
и FromAttribute (Получение информации из определенного атрибута, например: элемент - <p id="Титаник"></p>, если выбрать тип поиска по названию атрибута и указать его название "id", то соответственно получаемой информацией будет "Титаник")
4. Убедитесь, что все поля заполнены (поля подсвечиваются красным цветом, если они пустые) и выбрана хотя бы одна искомая информация.
После ввода все необходимой информации, нажмите на кнопку Отправить запрос и ждите загрузки файла с форматом .csv и соответствующего ответа от сайта.`;

// Parser page
const TITLE_FOR_INPUT_URL = `Введите url-адрес нужной вам страницы сайта`;
const BUTTON_SEND_REQUEST_TEXT = `Отправить запрос`;
const MAX_NUMBER_OF_REQUESTS_HAS_BEEN_EXCEEDED = `Превышено максимальное количество запросов за день (3)!`;

// sendRequestUtils.ts
const MSG_URL_IS_INCORRECT = `Ваш url-адрес введён неверно!`;
const MSG_QP_FOR_NUMBER_OF_PARAMETER_IS_NOT_SET = `Вы не задали имя параметра запроса для номера страницы!`;
const MSG_NOT_ALL_FIELDS_ARE_FILLED = `Некоторые обязательные поля не заполнены!`;
const MSG_NO_ONE_SEARCHED_INFO = `Необходима хотя бы одна информация для поиска!`;
const MSG_SUCCESSFUL_REQUEST_TO_PARSER_API = `Данные были успешно получены! Загрузка файла должна начаться через несколько секунд.`

// Параметры страницы
const PAGE_PARAMETERS_TITLE = `Параметры страницы`;
const PAGE_PARAMETERS_IS_MULTIPLE_PAGES = `Искать на несколько страницах?`;
const PAGE_PARAMETERS_SET_QP_FOR_NUMBER_OF_PAGE = `Установите название параметра для номера страницы`;
const PAGE_PARAMETERS_SET_START_PAGE = `Установите начальную страницу`;
const PAGE_PARAMETERS_SET_STEP = `Установите шаг`;
const PAGE_PARAMETERS_SET_LAST_PAGE = `Установите последнюю страницу`;

// ContainerWithElements
const CONTAINER_WITH_ELEMENTS_TITLE = `Форма для поиска информации`;

// SearchElementForm
const NO_SEARCHED_INFO = `Не выбрано ни одной информации для поиска `;

// SearchInfoInElemForm
const SEARCHED_INFO_ELEMENT = `Информация для поиска`;
const SEARCHED_INFO_TARGET_TABLE_FIELD = `Введите название поля таблицы`;
const SEARCHED_INFO_ATTRIBUTE_NAME = `Введите имя атрибута`;

const SEARCHED_INFO_BTN_ADD_SI = `Добавить инфо`;
const SEARCHED_INFO_BTN_ADD_SE = `Добавить элемент`;



export const strings = {
    START_TEXT: START_TEXT,
    START_TEXT_TITLE: START_TEXT_TITLE,

    TITLE_FOR_INPUT_URL: TITLE_FOR_INPUT_URL,
    BUTTON_SEND_REQUEST_TEXT:BUTTON_SEND_REQUEST_TEXT,
    MAX_NUMBER_OF_REQUESTS_HAS_BEEN_EXCEEDED:MAX_NUMBER_OF_REQUESTS_HAS_BEEN_EXCEEDED,
    
    MSG_URL_IS_INCORRECT: MSG_URL_IS_INCORRECT,
    MSG_QP_FOR_NUMBER_OF_PARAMETER_IS_NOT_SET:MSG_QP_FOR_NUMBER_OF_PARAMETER_IS_NOT_SET,
    MSG_NOT_ALL_FIELDS_ARE_FILLED: MSG_NOT_ALL_FIELDS_ARE_FILLED,
    MSG_NO_ONE_SEARCHED_INFO:MSG_NO_ONE_SEARCHED_INFO,
    MSG_SUCCESSFUL_REQUEST_TO_PARSER_API:MSG_SUCCESSFUL_REQUEST_TO_PARSER_API,

    PAGE_PARAMETERS_TITLE:PAGE_PARAMETERS_TITLE,
    PAGE_PARAMETERS_IS_MULTIPLE_PAGES:PAGE_PARAMETERS_IS_MULTIPLE_PAGES,
    PAGE_PARAMETERS_SET_QP_FOR_NUMBER_OF_PAGE:PAGE_PARAMETERS_SET_QP_FOR_NUMBER_OF_PAGE,
    PAGE_PARAMETERS_SET_START_PAGE:PAGE_PARAMETERS_SET_START_PAGE,
    PAGE_PARAMETERS_SET_STEP:PAGE_PARAMETERS_SET_STEP,
    PAGE_PARAMETERS_SET_LAST_PAGE:PAGE_PARAMETERS_SET_LAST_PAGE,

    CONTAINER_WITH_ELEMENTS_TITLE:CONTAINER_WITH_ELEMENTS_TITLE,
    NO_SEARCHED_INFO:NO_SEARCHED_INFO,
    SEARCHED_INFO_ELEMENT:SEARCHED_INFO_ELEMENT,

    SEARCHED_INFO_TARGET_TABLE_FIELD:SEARCHED_INFO_TARGET_TABLE_FIELD,
    SEARCHED_INFO_ATTRIBUTE_NAME:SEARCHED_INFO_ATTRIBUTE_NAME,
    
    SEARCHED_INFO_BTN_ADD_SI:SEARCHED_INFO_BTN_ADD_SI,
    SEARCHED_INFO_BTN_ADD_SE:SEARCHED_INFO_BTN_ADD_SE,
};