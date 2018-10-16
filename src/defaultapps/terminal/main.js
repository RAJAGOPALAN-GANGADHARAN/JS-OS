function lexer(str)
{
    /*var lex=str.,tok='';
    for(let x=0;x<str.length;++x)
    {
        if(str[x]!=' ')
        {
            tok+=str[x];
        }
        else if(str[x]==' ')
        {
            if(tok!='')
            {
                lex.push(tok);
            }
            tok='';
        }
    }
    return lex;
    */
   let lex=str.split(' ');
   return lex;
}
export function commandLineProcessor(string)
{
    let lex=lexer(string);
    return lex;
}
