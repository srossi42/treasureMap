type FormatRegex = {
    [key: string]: RegExp;
};

function checkFormat(line: string) {
    const formatRegex: FormatRegex   = {
        '#': /^#.*$/,
        'C': /^C - \d+ - \d+$/,
        'M': /^M - \d+ - \d+$/,
        'T': /^T - \d+ - \d+ - \d+$/,
        'A': /^A - [A-Za-z]+ - \d+ - \d+ - [SNOE] - [ADG]+$/
    };

    for (const format in formatRegex) {
        if (formatRegex[format].test(line)) {
            return true;
        }
    }

    return false;
}

export {checkFormat};
