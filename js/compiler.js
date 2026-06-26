var Compiler = (function () {

  var JUDGE0_API_URL = "https://judge0-ce.p.rapidapi.com/submissions";
  var JUDGE0_HOST = "judge0-ce.p.rapidapi.com";
  var C_LANGUAGE_ID = 50;

  var ERROR_TRANSLATIONS = [
    { pattern: /segmentation fault|segfault/i, translation: "Error de segmentación: tu programa intentó acceder a memoria que no le pertenece" },
    { pattern: /undeclared/i, translation: "Variable no declarada" },
    { pattern: /expected\s/i, translation: "Se esperaba un símbolo diferente" },
    { pattern: /implicit declaration/i, translation: "Declaración implícita: falta incluir la biblioteca o declarar la función" },
    { pattern: /incompatible types/i, translation: "Tipos incompatibles" },
    { pattern: /conflicting types/i, translation: "Tipos en conflicto" },
    { pattern: /redefinition/i, translation: "Redefinición: ya existe algo con ese nombre" },
    { pattern: /null pointer/i, translation: "Puntero nulo: intentaste usar un puntero que vale NULL" },
    { pattern: /syntax error/i, translation: "Error de sintaxis: revisa que los signos de puntuación y estructura del código sean correctos" },
    { pattern: /no such file or directory/i, translation: "Archivo no encontrado: revisa que el nombre del archivo incluido sea correcto" },
    { pattern: /undefined reference/i, translation: "Referencia no definida: falta la implementación de una función o variable" },
    { pattern: /multiple definition/i, translation: "Definición múltiple: algo está definido más de una vez" },
    { pattern: /unused variable/i, translation: "Variable sin usar: declaraste una variable que no se utiliza" },
    { pattern: /unused parameter/i, translation: "Parámetro sin usar: un parámetro de función no se utiliza" },
    { pattern: /warning.*implicit/i, translation: "Advertencia: declaración implícita de función, falta incluir la biblioteca correspondiente" },
    { pattern: /cannot find symbol/i, translation: "No se encuentra el símbolo: revisa que el nombre esté bien escrito y declarado" },
    { pattern: /pointer type/i, translation: "Error con puntero: revisa que estés usando correctamente el tipo de puntero" },
    { pattern: /dereferencing/i, translation: "Error al desreferenciar: intentaste acceder al valor de un puntero de forma incorrecta" },
    { pattern: /return type/i, translation: "Error en el tipo de retorno: la función no devuelve el tipo esperado" },
    { pattern: /argument/i, translation: "Error en los argumentos: revisa la cantidad y tipo de parámetros pasados a la función" },
    { pattern: /overflow/i, translation: "Desbordamiento: el valor supera el límite del tipo de dato" },
    { pattern: /stack overflow/i, translation: "Desbordamiento de pila: posible recursión infinita o demasiadas llamadas anidadas" },
    { pattern: /timeout|time limit/i, translation: "Tiempo límite excedido: tu programa tardó demasiado, posible bucle infinito" },
    { pattern: /memory/i, translation: "Error de memoria: tu programa usó demasiada memoria o accedió a memoria inválida" },
    { pattern: /division by zero/i, translation: "División por cero: no se puede dividir entre cero" },
    { pattern: /subscript/i, translation: "Error de subíndice: revisa que el índice del arreglo esté dentro del rango permitido" },
    { pattern: /incomplete type/i, translation: "Tipo incompleto: falta definir completamente el tipo de dato" },
    { pattern: /initializer/i, translation: "Error en el inicializador: revisa cómo estás inicializando la variable" },
    { pattern: /format/i, translation: "Error de formato: revisa la cadena de formato en printf/scanf" }
  ];

  function getApiKey() {
    return localStorage.getItem("juego-c-judge0key") || "";
  }

  function translateError(errorMsg) {
    if (!errorMsg) return "";
    for (var i = 0; i < ERROR_TRANSLATIONS.length; i++) {
      if (ERROR_TRANSLATIONS[i].pattern.test(errorMsg)) {
        return ERROR_TRANSLATIONS[i].translation + "\n\n(Detalle original: " + errorMsg + ")";
      }
    }
    return errorMsg;
  }

  function compileJSCPP(code) {
    var output = "";
    var exitCode = 1;
    var errors = "";

    try {
      if (typeof JSCPP === "undefined" || typeof JSCPP.run !== "function") {
        return {
          success: false,
          output: "",
          errors: "El intérprete C local no está disponible. Usa Judge0 (en línea) para compilar, o intenta recargar la página.",
          exitCode: 1
        };
      }

      var stdioOption = {
        write: function (s) {
          output += s;
        }
      };

      var jscppResult = JSCPP.run(code, [], { stdio: stdioOption });

      // JSCPP.run may return a number (exit code) or an object
      if (typeof jscppResult === "object" && jscppResult !== null) {
        // JSCPP shim returned a result object
        if (jscppResult.success) {
          return jscppResult;
        } else {
          // JSCPP failed but simple interpreter may have succeeded
          // The result already has output if any
          return jscppResult;
        }
      }

      // Real JSCPP returned a number (exit code)
      exitCode = jscppResult;

      if (exitCode === 0 && output.trim() === "") {
        // Try the simple interpreter as fallback
        var simpleResult = JSCPP._runSimple(code, []);
        if (simpleResult.output) {
          return simpleResult;
        }
      }

      return {
        success: exitCode === 0,
        output: output.trim(),
        errors: exitCode !== 0 ? translateError("El programa terminó con código " + exitCode) : "",
        exitCode: exitCode
      };
    } catch (e) {
      // JSCPP threw an error - try simple interpreter
      var simpleResult = null;
      if (typeof JSCPP !== "undefined" && typeof JSCPP._runSimple === "function") {
        simpleResult = JSCPP._runSimple(code, []);
      }
      
      if (simpleResult && simpleResult.output) {
        return simpleResult;
      }

      var errMsg = (e && e.message) ? e.message : "Error desconocido al ejecutar con JSCPP";
      
      // Check for common JSCPP errors that mean "not supported"
      if (errMsg.indexOf("not implemented") >= 0 || errMsg.indexOf("Unsupported") >= 0) {
        return {
          success: false,
          output: "",
          errors: "Esta característica de C no es soportada por el intérprete local.\nUsa el compilador en línea (GCC) para este ejercicio.\n\nPuedes cambiar el modo de compilación en la pantalla de ejercicio o práctica libre.\n\n(Detalle: " + errMsg + ")",
          exitCode: 1
        };
      }

      return {
        success: false,
        output: simpleResult ? simpleResult.output : "",
        errors: translateError(errMsg),
        exitCode: 1
      };
    }
  }

  function compileWASM(code) {
    var output = "";
    var errors = "";
    var exitCode = 1;

    try {
      if (!window.__wasm || typeof window.__wasm.compile !== 'function') {
        return Promise.resolve({
          success: false,
          output: "",
          errors: "Compilador WASM no disponible. Se descargará automáticamente al compilar el primer nivel avanzado.",
          exitCode: 1
        });
      }

      return window.__wasm.compile({
        source: code,
        fileName: 'program.c',
        flags: ['-std=c99', '-O0', '-Wno-unused-variable', '-Wno-return-type']
      }).then(function (compilationResult) {
        var module = compilationResult.module;
        var compileOutput = compilationResult.compileOutput;

        if (!module) {
          var errMsg = compileOutput || "Error de compilación desconocido";
          return {
            success: false,
            output: "",
            errors: translateError(errMsg),
            exitCode: 1
          };
        }

        var WASI = window.__wasm.WASI;
        var File = window.__wasm.File;
        var OpenFile = window.__wasm.OpenFile;
        var ConsoleStdout = window.__wasm.ConsoleStdout;

        var stdout = '';
        var stderr = '';
        var fds = [
          new OpenFile(new File(new Uint8Array(0))),
          new ConsoleStdout(function (data) {
            stdout += new TextDecoder().decode(data);
          }),
          new ConsoleStdout(function (data) {
            stderr += new TextDecoder().decode(data);
          }),
        ];

        var wasi = new WASI([], [], fds);
        return WebAssembly.instantiate(module, {
          wasi_snapshot_preview1: wasi.wasiImport,
        }).then(function (instance) {
          try {
            wasi.start(instance);
          } catch (e) {
            // Exit is expected
          }

          var exitCode = 0;
          return {
            success: true,
            output: stdout.trim(),
            errors: stderr.trim() || (compileOutput ? 'Advertencias:\n' + compileOutput : ''),
            exitCode: exitCode
          };
        });
      }).catch(function (err) {
        return {
          success: false,
          output: "",
          errors: "Error en el compilador WASM: " + (err.message || "Error desconocido"),
          exitCode: 1
        };
      });
    } catch (e) {
      return Promise.resolve({
        success: false,
        output: "",
        errors: "Error al iniciar compilador WASM: " + (e.message || "Error desconocido"),
        exitCode: 1
      });
    }
  }

  function compileJudge0(code) {
    var apiKey = getApiKey();

    if (!apiKey) {
      return Promise.resolve({
        success: false,
        output: "",
        errors: "No se ha configurado la clave de API de Judge0. Ve a Configuración e ingresa tu clave de RapidAPI.",
        exitCode: 1
      });
    }

    var requestBody = JSON.stringify({
      language_id: C_LANGUAGE_ID,
      source_code: code,
      stdin: ""
    });

    return fetch(JUDGE0_API_URL + "?base64_encoded=false&wait=true", {
      method: "POST",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": JUDGE0_HOST,
        "Content-Type": "application/json"
      },
      body: requestBody
    })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Error HTTP " + response.status + ": " + response.statusText);
      }
      return response.json();
    })
    .then(function (data) {
      var stderr = data.stderr || data.compile_output || "";
      var stdout = data.stdout || "";

      if (data.status && data.status.id > 3) {
        var errorMessage = stderr;
        if (data.status.id === 6) {
          errorMessage = "Error de compilación:\n" + stderr;
        }
        return {
          success: false,
          output: stdout.trim(),
          errors: translateError(errorMessage),
          exitCode: data.status.id === 6 ? 1 : (data.exit_code || 1)
        };
      }

      if (stderr.trim()) {
        return {
          success: true,
          output: stdout.trim(),
          errors: translateError(stderr.trim()),
          exitCode: 0
        };
      }

      return {
        success: true,
        output: stdout.trim(),
        errors: "",
        exitCode: 0
      };
    })
    .catch(function (err) {
      return {
        success: false,
        output: "",
        errors: "No se pudo conectar con Judge0. Verifica tu conexión a internet y tu clave de API.\n\n(Detalle: " + (err.message || "Error desconocido") + ")",
        exitCode: 1
      };
    });
  }

  function compile(code, levelId) {
    var level = null;

    if (typeof Levels !== "undefined" && Levels.getLevel) {
      level = Levels.getLevel(levelId);
    } else if (typeof LEVELS !== "undefined" && Array.isArray(LEVELS)) {
      for (var i = 0; i < LEVELS.length; i++) {
        if (LEVELS[i].id === levelId) {
          level = LEVELS[i];
          break;
        }
      }
    }

    var useJSCPP = true;
    if (level && level.usesJSCPP === false) {
      useJSCPP = false;
    } else if (level && level.usesJSCPP === true) {
      useJSCPP = true;
    } else if (levelId >= 13) {
      useJSCPP = false;
    }

    if (useJSCPP) {
      return Promise.resolve(compileJSCPP(code));
    } else {
      return compileWASM(code);
    }
  }

  function compileFree(code, useJSCPP) {
    if (useJSCPP) {
      return Promise.resolve(compileJSCPP(code));
    } else {
      return compileWASM(code);
    }
  }

  function setJudge0ApiKey(key) {
    localStorage.setItem("juego-c-judge0key", key);
  }

  function checkJudge0Available() {
    var apiKey = getApiKey();

    if (!apiKey) {
      return Promise.resolve({
        available: false,
        remaining: "Sin clave de API configurada"
      });
    }

    return fetch(JUDGE0_API_URL + "?base64_encoded=false&wait=false", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": apiKey,
        "X-RapidAPI-Host": JUDGE0_HOST
      }
    })
    .then(function (response) {
      if (response.ok) {
        var remaining = response.headers.get("x-ratelimit-remaining");
        return {
          available: true,
          remaining: remaining ? remaining + " peticiones restantes" : "Disponible"
        };
      } else {
        return {
          available: false,
          remaining: "Clave inválida o expirada (HTTP " + response.status + ")"
        };
      }
    })
    .catch(function () {
      return {
        available: false,
        remaining: "Sin conexión a Judge0"
      };
    });
  }

  return {
    compile: compile,
    compileJSCPP: compileJSCPP,
    compileJudge0: compileJudge0,
    compileFree: compileFree,
    setJudge0ApiKey: setJudge0ApiKey,
    checkJudge0Available: checkJudge0Available,
    translateError: translateError
  };
})();

window.Compiler = Compiler;