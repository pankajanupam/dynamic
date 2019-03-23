// builtin
import path from 'path';
// 3rd party
import express from 'express';
import hbs from 'hbs';
import bodyParser from "body-parser";
//custom
import router from './router.config';
import service from './service'; // TODO: find more clean way

// initialize our express app
const app = express();

app.use(express.static(path.join(__dirname, '../dist/assets/')));

hbs.registerHelper('json', function (options) {
    return JSON.stringify(options);
});

hbs.registerHelper('child', key => key);

hbs.registerHelper('like', function (value, regexStr) {
    return (new RegExp(regexStr)).test(value);
});

hbs.registerHelper('ifequal', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this)
    } else {
        return opts.inverse(this)
    }
});

// hbs.registerPartial('layout', fs.readFileSync(path.join(__dirname, '../layouts/default.html'), 'utf8'));
hbs.registerPartials(path.join(__dirname, '../components/'), function (err) { console.log(err) });
hbs.registerPartials(path.join(__dirname, './pages/form/partials/'), function (err) { console.log(err) });

// set the view engine to use handlebars
app.set('view engine', 'hbs');

// app.set('view options', { layout: '../../layouts/default.html' });
app.set('view options', { layout: 'layout' });
// app.set('views', path.join(__dirname, '../components/cp-index/'));

app.set('views', __dirname + '/pages/');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/', router);
/**
 * init funtion
 * @param {*} settings host = '127.0.0.1', port = 3000, cb = () => { }
 */
export default function server(host = '127.0.0.1', port = 3000, themepath = '', cb = () => { }) {
    service.themepath = themepath;
    console.log(themepath);
    app.listen(port, host, () => {
        console.log(`Server running at http://${host}:${port}/`);
    });
};