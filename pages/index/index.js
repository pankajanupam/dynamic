import fs from 'fs';
import path from 'path';
// import walk from 'walk';
var walk = require('walk').walk;

export default function (req, res) {

    const locals = {
        "pages": [{
            "pageName": "Components",
            "childPage": true,
            "page": []
        }]
    };

    walk(path.join(__dirname, '../../../components/')).on('file', function (root, stat, next) {
        ((filepath, done) => {
            if (/\.(html|hbs)$/.test(filepath)) {
                let fileName = path.basename(filepath).slice(0, -(path.extname(filepath).length));
                locals.pages[0].page.push({
                    "name": fileName.replace(/[-]/g, ' '),
                    "url": '/cp/' + fileName
                });
            }
            done('null');
        })(path.join(root, stat.name), next);

    }).on('end', function () {
        res.locals = locals;
        res.render('index');
    });
}