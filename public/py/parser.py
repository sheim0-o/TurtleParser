from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import json
import pandas as pd
import gzip
import os
from urllib.parse import urlparse, parse_qs, urlencode


app = Flask(__name__)
CORS(app)

@app.route('/api/py-parse', methods=['POST'])
def handle_request():
    data_string = request.json.get('json')
    data = json.loads(data_string)

    received_data_from_site = scrape_game_data(data.get("url"), data.get("pageParams"), data.get("elementsContainer"), data.get("searchedElement"))

    
    pdTable = pd.DataFrame(received_data_from_site)
    temp_csv_filename = "temp_csv_file.csv"
    pdTable.to_csv(temp_csv_filename, index=False)

    with open(temp_csv_filename, 'r', encoding='utf-8') as file:
        csv_content = file.read()

    os.remove(temp_csv_filename)

    compressed_csv_content = gzip.compress(csv_content.encode('utf-8'))
    
    response = Response(compressed_csv_content, mimetype='text/csv')
    response.headers["Content-Disposition"] = "attachment; filename=result.csv.gz"
    response.headers["Content-Encoding"] = "gzip"

    return response



# Словарь типов поиска
search_type_mapping = {
    "SearchByTag": lambda parent_element, name: parent_element.find(name),
    "SearchByTagAll": lambda parent_element, name: parent_element.find_all(name, recursive=False),
    "SearchById": lambda parent_element, name: parent_element.find(id=name),
    "SearchByIdAll": lambda parent_element, name: parent_element.find_all(id=name, recursive=False),
    "SearchByClass": lambda parent_element, name: parent_element.find(class_=name),
    "SearchByClassAll": lambda parent_element, name: parent_element.find_all(class_=name, recursive=False),
}

# Словарь типов информации
info_type_mapping = {
    "InnerText": lambda element, attr: element.get_text(strip=True),
    "FromAttribute": lambda element, attr: element.get(attr, ""),
}

def modify_url(original_url, parameter_name, parameter_new_value):
    parsed_url = urlparse(original_url)
    query_params = parse_qs(parsed_url.query)
    query_params[parameter_name] = [str(parameter_new_value)]
    updated_query = urlencode(query_params, doseq=True)
    updated_url = parsed_url._replace(query=updated_query).geturl()
    return updated_url

def scrape_game_data(url, page_params, elements_container, searched_element):
    columns = []
    get_elements_container = search_type_mapping.get(elements_container["typeOfSearchElement"])
    get_serched_element_in_container = search_type_mapping.get(searched_element["typeOfSearchElement"]+"All")

    if page_params.get("isMultiplePages"):
        name_of_page_param = page_params.get("nameOfPageParam")
        first_page = page_params.get("firstPage")
        step = page_params.get("step")
        last_page = page_params.get("lastPage")
        

        for page in range(first_page, last_page + 1, step):
            current_url = modify_url(url, name_of_page_param, page)
            response = requests.get(current_url)
            soup = BeautifulSoup(response.text, 'html.parser')

            soup_container = get_elements_container(soup, elements_container["nameOfType"])
            if soup_container is None:
                return []
            soup_searched_element = get_serched_element_in_container(soup_container, searched_element["nameOfType"])
            if soup_searched_element is None:
                return []

            for soup_element in soup_searched_element:
                result = process_element(soup_element, searched_element)
                columns.append(result)
    else:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')

        soup_container = get_elements_container(soup, elements_container["nameOfType"])
        if soup_container is None:
            return []
        soup_searched_element = get_serched_element_in_container(soup_container, searched_element["nameOfType"])
        if soup_searched_element is None:
            return []

        for soup_element in soup_searched_element:
            result = process_element(soup_element, searched_element)
            columns.append(result)

    return columns

def process_element(soup_searched_element, searched_element):
    result = {}

    for searched_info in searched_element["searchedInfo"]:
        result.update(save_info(soup_searched_element, searched_info))

    for el in searched_element["searchedElements"]:
        get_child_serched_element = search_type_mapping.get(el["typeOfSearchElement"])
        soup_el = get_child_serched_element(soup_searched_element, el["nameOfType"])
        if soup_el is None:
            continue
        received_data = process_element(soup_el, el)
        if(received_data != {}):
            result.update(received_data)

    return result


def save_info(soup_element, info):
    target_column = info.get("targetColumn")
    type_of_info = info.get("typeOfSearchedInfoPlace")
    attribute_name = info.get("attributeName")

    get_info_from_element = info_type_mapping.get(type_of_info)
    searched_info = get_info_from_element(soup_element, attribute_name)

    if isinstance(searched_info, list):
        searched_info = ', '.join(map(str, searched_info))

    if searched_info is None:
        return {target_column: ""}
    else:
        return {target_column: searched_info}
        


if __name__ == '__main__':
    app.run(debug=True)