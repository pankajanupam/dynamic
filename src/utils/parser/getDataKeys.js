import fs from 'fs';
import path from 'path';
import parser from '../../utils/parser.js';

export default (match, json) => {

    let child = match[3];
    let childParam = match[6] || match[5];

    if (child && childParam) {
        childParam
            // .replace(/\'/g, '') // remove single quote
            .split(' ') // change keys to array
            .map(value => {
                let field = value.match(/([^\[\']+)(?:\[(.*?)\]){0,1}/);
                if (field[1] === 'cp-article-info') {
                    let filePath = path.join(__dirname, `../../../components/${field[1]}/${field[1]}.hbs`);

                    let fileData = fs.readFileSync(filePath, { encoding: 'utf-8' });

                    // fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
                        console.log(parser(fileData));
                    //     if (!err) {
                            json[field[1]] = parser(fileData);
                    //     } else {
                    //         console.log(err);
                    //     }
                    // });

                } else {
                    json[field[1]] = {
                        default: field[2]
                    };
                }
            });

        json.desc && (json.desc = { default: 'WYSIWYG' })
    }

    if (match[7]) {
        json[match[7]] = { default: undefined }
    }

    return json;
}