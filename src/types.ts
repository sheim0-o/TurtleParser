export class ParserForm {
    constructor(
        public url: string = "",
        public pageParams: PageParams = new PageParams(),
        public elementsContainer: ElementsContainer = new ElementsContainer(),
        public searchedElement: SearchedElement = new SearchedElement()
    ) {}
}

export class PageParams {
    constructor(
        public isMultiplePages: boolean = false,
        public nameOfPageParam: string = '',
        public firstPage: number = 1,
        public step: number = 1,
        public lastPage: number = 1
    ) {}
}

export class ElementsContainer {
    constructor(
        public typeOfSearchElement: TypeOfSearchingElement = TypeOfSearchingElement.SearchByTag,
        public nameOfType: string = ""
    ) {}
}

export class SearchedElement {
    constructor(
        public typeOfSearchElement: TypeOfSearchingElement = TypeOfSearchingElement.SearchByTag,
        public nameOfType: string = "",
        public searchedInfo: SearchedInfo[] = [],
        public searchedElements: SearchedElement[] = []
    ) {}
}

export class SearchedInfo {
    constructor(
        public targetColumn: string = "",
        public typeOfSearchedInfoPlace: TypeOfSearchedInfoPlace = TypeOfSearchedInfoPlace.InnerText,
        public attributeName: string | null = null
    ) {}
}

export enum TypeOfSearchingElement {
    SearchByTag = 'SearchByTag',
    SearchById = 'SearchById',
    SearchByClass = 'SearchByClass',
}

export enum TypeOfSearchedInfoPlace {
    InnerText = 'InnerText',
    FromAttribute = 'FromAttribute'
}

export type SearchedElementAttribute = {
    typeOfSearchElement: TypeOfSearchingElement,
    nameOfType: string
}

export const getTypeOfSearchingElementByString = (typeOfSearchingElement: string): TypeOfSearchingElement =>
    TypeOfSearchingElement[typeOfSearchingElement as keyof typeof TypeOfSearchingElement];

export const getTypeOfSearchedInfoPlaceByString = (typeOfSearchedInfoPlace: string): TypeOfSearchedInfoPlace =>
    TypeOfSearchedInfoPlace[typeOfSearchedInfoPlace as keyof typeof TypeOfSearchedInfoPlace];
