import fs from 'fs';
import path from 'path';
import parser from '../utils/parser.js';
import getFormJson from '../utils/parser/getFormJson';
import service from '../service';

export default function (req, res) {
    let filePath = `${service.themepath}/${req.params.cpid}/${req.params.cpid}.hbs`;
    
    fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
        if (!err) {
            let json = parser(data);
            res.locals.form = getFormJson(json);
            res.render('form');
        } else {
            console.log(err);
        }
    });
}