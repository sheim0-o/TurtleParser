// Start info modal
const START_TEXT_TITLE = `Welcome to the Turtle Parser`;
const START_TEXT = `Turtle Parser is an easy-to-use utility for parsing the information you need from any website.
In order to conserve resources, users are only allowed to submit 3 requests per day for information (including unsuccessful requests).

Turtle Parser Utility User Manual

How to use this utility correctly:
1. Enter the full url of the page of any website you need.
2. Fill out the Multiple Page Search form:
This is an optional form. If the site has multiple pages, select the "Is Multiple Pages" option, enter the name of the query parameter to search for a specific page by page number and specify the start page, last page and in what increments to go through them.
Page Number: This is a parameter from the URL that points to the current page. For example, in the URL https://www.kinopoisk.ru/lists/movies/top250/?page=2, "page" is the page number parameter.
(For example: there is a url https://www.kinopoisk.ru/lists/movies/top250/?page=2, to search on page 1, 3 and 5 you need to enter 'page' as the parameter name, first page is 1, step is 2, final page is 5)
3. Filling out the Search Information by Item form:
This is a form that initially has two nested elements where one is inside the other. The first one is a container that contains a list of items to be searched and the second one is one of those searched items.
A list of nested elements can be added to each element searched for, to search for information in internal elements and a list of the information searched for can be added to each element.
Example:
There is such a block on the page - 
<ul id="list-of-films">
\t<li name="Home Alone"></li>
\t<li name="The Pianist"></li>
\t<li name="Titanic"></li>
</ul>

To specify the container and the items to be searched in it, in the first element you need to select the class search type and specify "list-of-films", and in the element nested in it you need to specify the search by tag "li".
To get the information you are looking for, the corresponding form appears, where you should first specify the name of the column in the future table, where it will be stored, and then the search type:
InnerText (Getting all the text from the element and its nested elements, example: element - <div> Titanic <p>Year: 1997 </p> <p>Rating: 8.5 </p></div>, the information obtained with InnerText is "Titanic Year: 1997 Rating: 8.5")
and FromAttribute (Getting information from a certain attribute, for example: element - <p id="Titanic"></p>, if you choose the search type by attribute name and specify its name "id", then accordingly the information received will be "Titanic").
4. Make sure that all fields are filled in (fields are highlighted in red if they are empty) and at least one information you are looking for is selected.
After entering all the necessary information, click on the Send Request button and wait for the .csv file to be downloaded and the corresponding response from the site.`;

// ParserPage
const TITLE_FOR_INPUT_URL = `Enter the url of the site page you need`;
const BUTTON_SEND_REQUEST_TEXT = `Send request`;
const MAX_NUMBER_OF_REQUESTS_HAS_BEEN_EXCEEDED = `The maximum number of requests per day (3) has been exceeded!`;


// sendRequestUtils.ts
const MSG_URL_IS_INCORRECT = `The URL is incorrect!`;
const MSG_QP_FOR_NUMBER_OF_PARAMETER_IS_NOT_SET = `The name for query parameter for number of page is not set!`;
const MSG_NOT_ALL_FIELDS_ARE_FILLED = `Not all required fields are filled in!`;
const MSG_NO_ONE_SEARCHED_INFO = `At least one seeking info is needed!`;
const MSG_SUCCESSFUL_REQUEST_TO_PARSER_API = `The data has been successfully received! The file download is about to start.`

// PageParameters
const PAGE_PARAMETERS_TITLE = `Parameters of page`;
const PAGE_PARAMETERS_IS_MULTIPLE_PAGES = `Search on multiple pages?`;
const PAGE_PARAMETERS_SET_QP_FOR_NUMBER_OF_PAGE = `Set name for query parameter for number of page`;
const PAGE_PARAMETERS_SET_START_PAGE = `Set start page`;
const PAGE_PARAMETERS_SET_STEP = `Set step`;
const PAGE_PARAMETERS_SET_LAST_PAGE = `Set last page`;

// ContainerWithElements
const CONTAINER_WITH_ELEMENTS_TITLE = `Form for seeking info in elements`;

// SearchElementForm
const NO_SEARCHED_INFO = `There is no seeking info`;

// SearchInfoInElemForm
const SEARCHED_INFO_ELEMENT = `seeking info`;
const SEARCHED_INFO_TARGET_TABLE_FIELD = `Enter target table field`;
const SEARCHED_INFO_ATTRIBUTE_NAME = `Enter attribute name`;

const SEARCHED_INFO_BTN_ADD_SI = `Add info`;
const SEARCHED_INFO_BTN_ADD_SE = `Add element`;


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