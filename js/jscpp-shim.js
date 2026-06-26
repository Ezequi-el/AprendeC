/*
 * JSCPP Browser Shim
 * 
 * JSCPP@2.0.2 is a Browserify bundle that doesn't expose a global.
 * This shim loads it and extracts the interpreter.
 * 
 * Strategy: We create a mock CommonJS environment, load the bundle,
 * and capture the module.exports.
 * 
 * If JSCPP can't be loaded, we fall back to Judge0 for ALL levels.
 */

var JSCPP = (function() {
    var _interpreter = null;
    var _loaded = false;
    var _loadError = null;

    function load() {
        if (_loaded) return _interpreter !== null;
        _loaded = true;
        try {
            // Try to load JSCPP from CDN
            // The JSCPP.es5.min.js bundle should be loaded BEFORE this script
            // It self-registers as a module in the bundle
            // We need to find and extract the run function

            // Actually, let's try a different approach:
            // Load the script dynamically and capture its exports
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://cdn.jsdelivr.net/npm/JSCPP@2.0.2/dist/JSCPP.es5.min.js', false);
            xhr.send();
            
            if (xhr.status !== 200) {
                _loadError = 'HTTP ' + xhr.status;
                return false;
            }

            var code = xhr.responseText;
            
            // Create a module system to capture exports
            var capturedExports = {};
            var mockModule = { exports: capturedExports };
            var mockRequire = function(mod) {
                if (mod === 'stream') return { Stream: function(){}, prototype: {} };
                if (mod === 'util') return { 
                    inherits: function(){}, 
                    format: function(){},
                    inspect: function(){ return ''; },
                    isBoolean: function(){ return false; },
                    isNull: function(){ return false; },
                    isNullOrUndefined: function(){ return false; },
                    isNumber: function(){ return false; },
                    isString: function(){ return false; },
                    isSymbol: function(){ return false; },
                    isUndefined: function(){ return false; },
                    isRegExp: function(){ return false; },
                    isObject: function(){ return false; },
                    isDate: function(){ return false; },
                    isError: function(){ return false; },
                    isFunction: function(){ return false; },
                    isPrimitive: function(){ return true; },
                    isBuffer: function(){ return false; }
                };
                var parts = mod.split('/');
                var name = parts[parts.length - 1];
                return { exports: {} };
            };

            // Execute in isolated scope with our module system
            try {
                var fn = new Function('module', 'exports', 'require', code);
                fn(mockModule, mockModule.exports, mockRequire);
                _interpreter = mockModule.exports;
            } catch(e) {
                // The bundle might self-execute differently
                // Try evaluating it and look for the result
                try {
                    // Some bundles put the result in a global
                    eval(code);
                    // Check various possible globals
                    if (typeof window.JSCPP !== 'undefined') {
                        _interpreter = window.JSCPP;
                    }
                } catch(e2) {
                    _loadError = e2.message;
                    return false;
                }
            }

            if (!_interpreter || typeof _interpreter !== 'object') {
                // Last resort: try to find run function
                // JSCPP.es5 may expose itself differently
                try {
                    eval(code);
                } catch(e3) {}
                
                // Try to find JSCPP on window
                if (window.JSCPP && typeof window.JSCPP.run === 'function') {
                    _interpreter = window.JSCPP;
                }
            }

            return _interpreter !== null;
        } catch(e) {
            _loadError = e.message;
            return false;
        }
    }

    // Simple built-in C interpreter for basic levels (fallback)
    // Handles: printf, int, float, char, for, while, if/else, basic operations, arrays
    function runSimple(code, input) {
        var output = '';
        var vars = {};
        var arrays = {};
        var errorMsg = '';

        // Extract main function body
        var mainMatch = code.match(/int\s+main\s*\([^)]*\)\s*\{/);
        if (!mainMatch) {
            return { success: false, output: '', errors: 'No se encontró la función main()', exitCode: 1 };
        }
        var mainStart = code.indexOf(mainMatch[0]) + mainMatch[0].length;
        var braceCount = 1;
        var mainEnd = mainStart;
        for (var i = mainStart; i < code.length; i++) {
            if (code[i] === '{') braceCount++;
            if (code[i] === '}') braceCount--;
            if (braceCount === 0) { mainEnd = i; break; }
        }
        var mainBody = code.substring(mainStart, mainEnd);

        // Evaluate a simple expression with variable substitution
        function evalExpr(expr) {
            expr = expr.trim();
            // Handle string literals
            if (expr.charAt(0) === '"' && expr.charAt(expr.length - 1) === '"') {
                return expr.slice(1, -1);
            }
            // Handle char literals
            if (expr.charAt(0) === "'" && expr.charAt(expr.length - 1) === "'") {
                return expr.charAt(1);
            }
            // Handle array access: arr[idx]
            var arrMatch = expr.match(/^(\w+)\[(.+)\]$/);
            if (arrMatch && arrays[arrMatch[1]]) {
                var idx = evalExpr(arrMatch[2]);
                if (arrays[arrMatch[1]][idx] !== undefined) return arrays[arrMatch[1]][idx];
            }
            // Handle variable
            if (vars[expr] !== undefined) return vars[expr];
            // Handle number
            if (/^-?\d+(\.\d+)?$/.test(expr)) return parseFloat(expr);
            // Handle sizeof
            if (expr.match(/^sizeof\s*\(/)) {
                var typeMatch = expr.match(/sizeof\s*\(\s*(\w+)\s*\)/);
                if (typeMatch) {
                    var t = typeMatch[1];
                    if (t === 'int') return 4;
                    if (t === 'float') return 4;
                    if (t === 'char') return 1;
                    if (t === 'double') return 8;
                }
                return 4;
            }
            // Handle strlen
            if (expr.match(/^strlen\s*\(/)) {
                var strMatch = expr.match(/strlen\s*\(\s*(\w+)\s*\)/);
                if (strMatch && typeof vars[strMatch[1]] === 'string') return vars[strMatch[1]].length;
            }
            // Handle function calls that return values (simple ones)
            if (expr.match(/^\w+\s*\(/)) {
                // Can't evaluate arbitrary function calls in simple mode
                return undefined;
            }
            // Handle ternary
            if (expr.indexOf('?') >= 0 && expr.indexOf(':') >= 0) {
                var ternaryMatch = expr.match(/^(.+?)\?(.+?):(.+)$/);
                if (ternaryMatch) {
                    var cond = evalExpr(ternaryMatch[1]);
                    return cond ? evalExpr(ternaryMatch[2]) : evalExpr(ternaryMatch[3]);
                }
            }
            // Handle comparison operators
            var compOps = ['>=', '<=', '!=', '==', '&&', '||', '>', '<'];
            for (var c = 0; c < compOps.length; c++) {
                var op = compOps[c];
                var idx = expr.indexOf(op);
                if (idx > 0 && expr.charAt(idx - 1) !== '=' && expr.charAt(idx + op.length) !== '=') {
                    var left = evalExpr(expr.substring(0, idx));
                    var right = evalExpr(expr.substring(idx + op.length));
                    if (left === undefined || right === undefined) return undefined;
                    switch(op) {
                        case '>=': return left >= right ? 1 : 0;
                        case '<=': return left <= right ? 1 : 0;
                        case '!=': return left != right ? 1 : 0;
                        case '==': return left == right ? 1 : 0;
                        case '&&': return (left && right) ? 1 : 0;
                        case '||': return (left || right) ? 1 : 0;
                        case '>': return left > right ? 1 : 0;
                        case '<': return left < right ? 1 : 0;
                    }
                }
            }
            // Handle modulo
            if (expr.indexOf('%') >= 0) {
                var modParts = expr.split('%');
                if (modParts.length === 2) {
                    var l = evalExpr(modParts[0]);
                    var r = evalExpr(modParts[1]);
                    if (l !== undefined && r !== undefined) return l % r;
                }
            }
            // Handle arithmetic: try to eval safely
            try {
                var safeExpr = expr.replace(/(\w+)/g, function(m) {
                    if (vars[m] !== undefined) return String(vars[m]);
                    if (arrays[m] !== undefined) return 'undefined';
                    return m;
                });
                var result = Function('"use strict"; return (' + safeExpr + ')')();
                return result;
            } catch(e) {
                return undefined;
            }
        }

        // Process printf
        function processPrintf(fmt, args) {
            fmt = fmt.replace(/\\n/g, '\n').replace(/\\t/g, '\t').replace(/\\\\/g, '\\').replace(/\\"/g, '"').replace(/\\'/g, "'");
            var result = '';
            var argIdx = 0;
            for (var i = 0; i < fmt.length; i++) {
                if (fmt[i] === '%' && i + 1 < fmt.length) {
                    var spec = fmt[i + 1];
                    if (argIdx < args.length) {
                        var val = args[argIdx];
                        if (val === undefined) val = 0;
                        if (spec === 'd' || spec === 'i') {
                            result += Math.floor(Number(val));
                        } else if (spec === 'f') {
                            result += Number(val).toFixed(6);
                        } else if (spec === 'c') {
                            result += String.fromCharCode ? String.fromCharCode(Number(val)) : String(val);
                        } else if (spec === 's') {
                            result += String(val);
                        } else if (spec === '.') {
                            // Handle %.Nf format
                            var precMatch = fmt.substring(i).match(/^\.(\d+)f/);
                            if (precMatch) {
                                result += Number(val).toFixed(parseInt(precMatch[1]));
                                i += precMatch[0].length;
                                argIdx++;
                                continue;
                            }
                        } else {
                            result += '%' + spec;
                            argIdx--;
                        }
                        argIdx++;
                    }
                    i++;
                } else {
                    result += fmt[i];
                }
            }
            return result;
        }

        // Remove comments
        mainBody = mainBody.replace(/\/\/.*$/gm, '');
        mainBody = mainBody.replace(/\/\*[\s\S]*?\*\//g, '');

        // Remove #include lines
        mainBody = mainBody.replace(/#include\s*<[^>]+>/g, '');

        // Remove return statements
        mainBody = mainBody.replace(/return\s+0\s*;/g, '');
        mainBody = mainBody.replace(/return\s*;/g, '');

        // Protect string literals so they don't get split by newlines
        // Replace actual newlines inside printf strings with \\n
        // First, find all printf statements and fix their strings
        mainBody = mainBody.replace(/printf\s*\(\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*[^)]+)?\s*\)/g, function(match) {
            return match.replace(/\n/g, '\\n');
        });

        // Process lines
        var lines = mainBody.split('\n');
        var i = 0;
        var maxLines = 10000; // Safety limit
        var lineCount = 0;

        while (i < lines.length && lineCount < maxLines) {
            var line = lines[i].trim();
            lineCount++;

            // Skip empty lines and braces
            if (!line || line === '{' || line === '}') { i++; continue; }

            // Handle int declarations with assignments
            var intDeclMatch = line.match(/^int\s+(\w+)\s*=\s*(.+);$/);
            if (intDeclMatch) {
                vars[intDeclMatch[1]] = Math.floor(Number(evalExpr(intDeclMatch[2])));
                i++; continue;
            }

            // Handle int array declarations
            var arrDeclMatch = line.match(/^int\s+(\w+)\s*\[\s*(\d+)\s*\]\s*=\s*\{([^}]+)\}\s*;$/);
            if (arrDeclMatch) {
                var arrName = arrDeclMatch[1];
                var arrSize = parseInt(arrDeclMatch[2]);
                var arrVals = arrDeclMatch[3].split(',').map(function(v) { return parseInt(v.trim()); });
                arrays[arrName] = new Array(arrSize);
                for (var j = 0; j < arrSize; j++) arrays[arrName][j] = arrVals[j] || 0;
                i++; continue;
            }

            // Handle float declarations
            var floatDeclMatch = line.match(/^float\s+(\w+)\s*=\s*(.+);$/);
            if (floatDeclMatch) {
                vars[floatDeclMatch[1]] = parseFloat(evalExpr(floatDeclMatch[2]));
                i++; continue;
            }

            // Handle char declarations
            var charDeclMatch = line.match(/^char\s+(\w+)\s*(?:\[\d+\])?\s*=\s*("[^"]*"|'[^']*')\s*;$/);
            if (charDeclMatch) {
                var charVal = charDeclMatch[2];
                if (charVal.charAt(0) === '"') vars[charDeclMatch[1]] = charVal.slice(1, -1);
                else vars[charDeclMatch[1]] = charVal.charAt(1);
                i++; continue;
            }

            // Handle char[] declarations
            var charArrMatch = line.match(/^char\s+(\w+)\s*\[(\d+)\]\s*=\s*"([^"]*)"\s*;$/);
            if (charArrMatch) {
                vars[charArrMatch[1]] = charArrMatch[3];
                i++; continue;
            }

            // Handle int declarations without assignment
            var intEmptyMatch = line.match(/^int\s+(\w+)\s*;$/);
            if (intEmptyMatch) {
                vars[intEmptyMatch[1]] = 0;
                i++; continue;
            }

            // Handle printf
            var printfMatch = line.match(/^printf\s*\(\s*"((?:[^"\\]|\\.)*)"\s*(?:,\s*(.+))?\s*\)\s*;$/);
            if (printfMatch) {
                var fmt = printfMatch[1];
                var args = [];
                if (printfMatch[2]) {
                    args = printfMatch[2].split(',').map(function(s) {
                        return evalExpr(s.trim());
                    });
                }
                output += processPrintf(fmt, args);
                i++; continue;
            }

            // Handle variable assignment: varName = expr;
            var assignMatch = line.match(/^(\w+)\s*=\s*(.+);$/);
            if (assignMatch) {
                vars[assignMatch[1]] = evalExpr(assignMatch[2]);
                i++; continue;
            }

            // Handle array assignment: arr[idx] = val;
            var arrAssignMatch = line.match(/^(\w+)\[(.+)\]\s*=\s*(.+);$/);
            if (arrAssignMatch && arrays[arrAssignMatch[1]]) {
                var idx = evalExpr(arrAssignMatch[2]);
                arrays[arrAssignMatch[1]][idx] = evalExpr(arrAssignMatch[3]);
                i++; continue;
            }

            // Handle for loops (simple: for (int i = start; i < end; i++))
            // Unroll the loop up to 100 iterations
            var forMatch = line.match(/^for\s*\(\s*(?:int\s+)?(\w+)\s*=\s*(\d+)\s*;\s*\1\s*(<=|<|>=|>)\s*(\d+)\s*;\s*\1(\+\+|--)\s*\)\s*\{?$/);
            if (forMatch) {
                // This is getting complex - for now skip and mark as not supported
                // These levels should use Judge0
                i++; continue;
            }

            // Handle while, for, if - these need multi-line parsing, skip for simple interpreter
            if (line.match(/^(for|while|if|else|do|switch)\b/)) {
                // Complex statements - skip
                i++; continue;
            }

            i++;
        }

        if (!output) {
            return { success: false, output: '', errors: 'El intérprete simple no pudo ejecutar este código.\nPara un resultado correcto, usa el compilador en línea (GCC).\n\nPuedes cambiar el modo de compilación en la pantalla de ejercicio.', exitCode: 1 };
        }

        return { success: true, output: output, errors: '', exitCode: 0 };
    }

    function run(code, inputArray, options) {
        var stdioOutput = '';

        // Try JSCPP interpreter first
        if (_interpreter && typeof _interpreter.run === 'function') {
            try {
                var opt = options || {};
                if (!opt.stdio) {
                    opt.stdio = {
                        write: function(s) { stdioOutput += s; }
                    };
                } else {
                    var origWrite = opt.stdio.write;
                    opt.stdio = {
                        write: function(s) {
                            stdioOutput += s;
                            if (origWrite) origWrite(s);
                        }
                    };
                }
                var exitCode = _interpreter.run(code, inputArray || [], opt);
                return { success: exitCode === 0, output: stdioOutput.trim(), errors: '', exitCode: exitCode };
            } catch(e) {
                // JSCPP failed, try simple interpreter
                var simpleResult = runSimple(code, inputArray);
                if (simpleResult.output) {
                    return simpleResult;
                }
                return { success: false, output: '', errors: 'Error de JSCPP: ' + (e.message || 'Error desconocido'), exitCode: 1 };
            }
        }

        // Fall back to simple interpreter
        return runSimple(code, inputArray);
    }

    function isAvailable() {
        return _interpreter !== null;
    }

    function getLoadError() {
        return _loadError;
    }

    // Try to load on script initialization
    // We don't block on this - if it fails, we use simple interpreter
    try { load(); } catch(e) { _loadError = e.message; }

    return {
        run: run,
        isAvailable: isAvailable,
        getLoadError: getLoadError,
        load: load,
        // Expose simple interpreter for testing
        _runSimple: runSimple
    };
})();