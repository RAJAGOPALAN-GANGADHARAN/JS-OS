
import parser from 'yargs-parser'
export function processArg(string,folderPath)
{
    let arg = parser(string);
    let marg = arg['_'];
    if (length(marg) == 0)
    {
        return [[`Command ${string} is invalid`, 'red']];
    }

}
