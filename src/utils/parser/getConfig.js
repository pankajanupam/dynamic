export default (match, config) => {

    let key = match[1];
    let value = match[2];

    if (config[key] && value) {

        if (config[key] instanceof Array) {
            config[key].indexOf(value) === -1 && config[key].push(value);
        } else {
            if (config[key] !== value) {
                config[key] = [config[key], value];
            }
        }
    } else {
        key && (config[key] = value);
    }

    return config;
}