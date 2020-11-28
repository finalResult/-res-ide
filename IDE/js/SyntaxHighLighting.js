let SyntaxChars = " !%&*()-+={}[]:;<>?./\\";

function SyntaxHighLighting() {
    let hl = [{"s":"","c":""}];
    let i,
        inString = false,
        onAttr = false,
        onParaphrase = false;
    for (i = 0; i < Current.length; i++) {
        if (onParaphrase) {
            onParaphrase = false;
            hl[hl.length - 1]["s"] += Current[i];
        } else {
            if (inString) {
                if (Current[i] === "\\") onParaphrase = true;
                hl[hl.length - 1]["s"] += Current[i].toString();
            } else {
                if (SyntaxChars.indexOf( Current[i] ) !== -1) hl.push({"s":"","c":""});
                if ("\"'".indexOf( Current[i] ) === -1) hl[hl.length - 1]["s"] += Current[i].toString();
                if (SyntaxChars.indexOf( Current[i] ) !== -1) hl.push({"s":"","c":""});
            }
            if ("\"'".indexOf( Current[i] ) !== -1) {
                inString = !inString;
                hl.push({"s":"\"","c":""});
            }
        }
    }
    highLighting = hl;
}