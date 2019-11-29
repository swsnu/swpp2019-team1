''' Parse category and generate Javascript code '''

import re
import sys


def convert_dict(categories):
    ''' recursive convert function '''
    for idx, ctg in enumerate(categories):
        print('{')
        print('value: ' + str(idx) + ',')
        print('label: "' + ctg + '",')
        if categories[ctg] != {}:
            print('children: [')
            convert_dict(categories[ctg])
            print('],')
        print('},')


def convert(category_dict):
    ''' convert dict into Javascript code '''
    print('// eslint-disable-next-line import/prefer-default-export')
    print('export const categories = [')
    convert_dict(category_dict)
    print('];')


def category_export(filename):
    ''' main export function '''
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
            temp.update({entry[-1]: {}})

        output = open('categories.js', 'w')
        sys.stdout = output
        convert(result)


if __name__ == '__main__':
    category_export('raw.txt')
