''' Parse category and generate Javascript code & SQL script '''

import re
import sys


def convert_dict(categories):
    ''' recursive function for generate Javascript code '''
    for idx, ctg in enumerate(categories):
        print('{')
        print('value: ' + str(idx) + ',')
        print('label: "' + ctg + '",')
        if categories[ctg] != {}:
            print('children: [')
            convert_dict(categories[ctg])
            print('],')
        print('},')


def convert_js(category_dict):
    ''' convert dict into Javascript code '''
    print('// eslint-disable-next-line import/prefer-default-export')
    print('export const categories = [')
    convert_dict(category_dict)
    print('];')


def generate_js_category(result_dict):
    ''' generate js category '''
    with open('categories.js', 'w') as output:
        sys.stdout = output
        convert_js(result_dict)


def sql_rec(categories, prev):
    ''' recursive function for generating sql script '''
    for idx, ctg in enumerate(categories):
        indexes = str(idx) if prev == '' else (prev + ',' + str(idx))
        if categories[ctg] == {}:
            print('INSERT INTO matchmaker_category(name, indexes) VALUES ("' +
                  ctg + '", "' + indexes + '");')
        else:
            sql_rec(categories[ctg], indexes)


def sql_script(category_dict):
    ''' generate SQL script '''
    print('USE swpp_db;')
    sql_rec(category_dict, '')


def generate_sql_script(result_dict):
    ''' generate sql script '''
    with open('category_script.mysql', 'w') as output:
        sys.stdout = output
        sql_script(result_dict)


def parse(filename):
    ''' parse raw file '''
    with open(filename, 'r') as raw:
        raw_data = raw.read()
        split_data = list(filter(lambda x: x is not '',
                                 re.split('[\t\n]', raw_data)))
        split_data.sort()
        parsed = list(map((lambda string: string[1:].split('/')), split_data))
        result = {}

        for entry in parsed:
            temp = result
            for ctg in entry[:-1]:
                if ctg not in temp:
                    temp[ctg] = {}
                temp = temp[ctg]
            if temp != result and temp == {}:
                temp.update({'other*': {}})
            temp.update({entry[-1]: {}})

        return result


if __name__ == '__main__':
    RESULT_DICT = parse('raw.txt')
    generate_js_category(RESULT_DICT)
    generate_sql_script(RESULT_DICT)
