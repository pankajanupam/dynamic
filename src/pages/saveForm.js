import fs from 'fs';
import path from 'path';
import parser from '../utils/parser.js';
import getFormJson from '../utils/parser/getFormJson';
import service from '../service';

export default function (req, res) {

    let dir = './data';

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    let dataJson = Object.keys(req.body).reduce((data, key) => {
        const subKey = Object.keys(req.body[key]);
        data[`${key}[${subKey[0] || ''}]`] = subKey[0] && req.body[key][subKey[0]] || req.body[key];
        return data;
    }, {});


    fs.writeFile(`./data/${req.params.cpid}.json`, JSON.stringify(dataJson), function (err) {
        if (err) throw err;
        res.locals.form = Object.keys(req.body).reduce((data, key) => {
            const subKey = Object.keys(req.body[key]);
            data[key] = { default: subKey[0], value : req.body[key][subKey[0]]};
            return data;
        }, {});
        console.log('File is created successfully.',res.locals.form);

        res.render('form');
      });

    // let filePath = `${service.themepath}/${req.params.cpid}/${req.params.cpid}.hbs`;

    // fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    //     if (!err) {
    //         let json = parser(data);
    //         console.log(json);
    //         // res.send(inputs);
    //         res.locals.componentName = req.params.cpid;
    //         res.locals.form = getFormJson(json);

    //         res.render('form');
    //     } else {
    //         console.log(err);
    //     }
    // });

    // res.send('hi');
}