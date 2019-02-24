import regexs from '../config/regex-pattern';
import getConfig from '../utils/parser/getConfig';
import getDataKeys from '../utils/parser/getDataKeys';

export default function (html) {
    let match, json = { config: {} };
    let regex = new RegExp(regexs.hbsParser, 'g');

    while ((match = regex.exec(html)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (match.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the `match`-variable.
        if (match !== null) {
            json.config = getConfig(match, json.config); // merge config
            json = getDataKeys(match, json); // merge json
        }
    }
    return json;
}