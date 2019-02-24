export default {
    hbsParser : /(?<=(?:#if|else ifequal|else if|unless)(?:[^{}]*?) )(?:config\.){0,1}([^ ][\w\.\-]+)(?:(?:\s)([\w\-\']+)){0,1}|(cp-data-tags)(?:(?:\s\()(\w*).+?(.*?)(?:\s*)\)){0,1}(?:.*?((?<={{!-- describe\s).*?(?=\s*--}}))){0,1}|(?:{{([^\#\>\/]+)}})/
}
 // /(?<=(?:#if|else ifequal|else if|unless)(?:[^{}]*?) )(?:config\.){0,1}([^ ][\w\.\-]+)(?:(?:\s)([\w\-\']+)){0,1}|(cp-data-tags)(?:(?:\s\()(\w*).+?(.*?)(?:\s*)\)){0,1}/
/**
 * TODO: use group naming
 * (?<key>[^ ][\w\.\-]+[^ ])(?: *)
 */