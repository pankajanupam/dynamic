const checkbox = (label) => ({
    type: "checkbox",
    label: label,
    isRequired: false
});

const selectbox = (label, values) => ({
    type: "select",
    label: label,
    values: values,
    isRequired: false
});

export default (json) => {
    let formJson = {};

    formJson.config = Object.keys(json.config)
        .reduce((config, key) => {
            if (json.config[key] === undefined) {
                config[key] = checkbox(key);
            } else if (json.config[key] instanceof Array) {
                config[key] = selectbox(key, json.config[key]);
            }
            return config;
        }, {})

    formJson = Object.keys(json).reduce((formJson, key) => {
        if(key === 'config'){
            return formJson;
        }
        formJson[key] = json[key];

        return formJson;
    }, formJson)

    return formJson;
}