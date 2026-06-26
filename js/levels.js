const LEVELS = [
  // ============================================================
  // MÓDULO 0: C BÁSICO
  // ============================================================
  {
    id: 1,
    module: 0,
    title: "Hola Mundo",
    icon: "fa-terminal",
    type: "fill",
    xp: 10,
    theory: `<h3>Tu primer programa en C</h3>
<p>Todo programa en C tiene una estructura base:</p>
<pre>#include &lt;stdio.h&gt;

int main() {
    // Tu código aquí
    return 0;
}</pre>
<p>La función <code>main()</code> es el punto de entrada — donde empieza la ejecución. <code>return 0;</code> indica que el programa terminó correctamente.</p>
<p><code>#include &lt;stdio.h&gt;</code> importa la biblioteca de entrada/salida estándar, necesaria para usar <code>printf()</code>.</p>
<div class="theory-note">La función <code>printf()</code> imprime texto en pantalla. <code>\\n</code> es un salto de línea.</div>
<h3>Sintaxis de printf</h3>
<pre>printf("Texto que quieres mostrar\\n");</pre>
<p>Las comillas dobles <code>"..."</code> delimitan el texto. Cada <code>;</code> marca el final de una instrucción.</p>`,
    instruction: "Completa el programa para que imprima <strong>Hola Mundo</strong> seguido de un salto de línea.",
    starterCode: `#include <stdio.h>

int main() {
    // Escribe tu printf aquí

    return 0;
}`,
    solution: `#include <stdio.h>

int main() {
    printf("Hola Mundo\\n");
    return 0;
}`,
    blanks: [{ line: 3, hint: "Usa printf para imprimir texto" }],
    expectedOutput: "Hola Mundo",
    hints: [
      "La función printf() imprime texto en pantalla",
      "La sintaxis es: printf(\"texto\\n\");",
      "Escribe: printf(\"Hola Mundo\\n\");"
    ],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 2,
    module: 0,
    title: "Variables y tipos",
    icon: "fa-database",
    type: "fill",
    xp: 10,
    theory: `<h3>Variables en C</h3>
<p>Las variables almacenan datos. En C debes declarar el tipo antes de usarla:</p>
<pre>int edad = 17;       // número entero
float peso = 72.5;   // número decimal
char inicial = 'A';  // un solo carácter</pre>
<h3>Printf con formato</h3>
<p>Cada tipo usa un especificador diferente:</p>
<pre>printf("Edad: %d\\n", edad);    // %d para int
printf("Peso: %f\\n", peso);    // %f para float
printf("Inicial: %c\\n", inicial); // %c para char</pre>
<div class="theory-note"><code>%d</code> = entero, <code>%f</code> = decimal, <code>%c</code> = carácter. Para limitar decimales: <code>%.1f</code> muestra un decimal.</div>`,
    instruction: "Declara <strong>edad</strong> como entero con valor 17 e <strong>inicial</strong> como char con valor 'A', luego imprímelos usando formato.",
    starterCode: `#include <stdio.h>

int main() {
    // Declara edad como int con valor 17
    // Declara inicial como char con valor 'A'

    printf("Tengo %d años\\n", edad);
    printf("Mi inicial es %c\\n", inicial);
    return 0;
}`,
    solution: `#include <stdio.h>

int main() {
    int edad = 17;
    char inicial = 'A';

    printf("Tengo %d años\\n", edad);
    printf("Mi inicial es %c\\n", inicial);
    return 0;
}`,
    blanks: [
      { line: 4, hint: "Declaración: tipo nombre = valor;" },
      { line: 5, hint: "char usa comillas simples: 'A'" }
    ],
    expectedOutput: "Tengo 17 años\nMi inicial es A",
    hints: [
      "Un int se declara: int nombre = valor;",
      "Un char usa comillas simples: char inicial = 'A';",
      "Escribe: int edad = 17; y char inicial = 'A';"
    ],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 3,
    module: 0,
    title: "Decisiones y ciclos",
    icon: "fa-code-branch",
    type: "fill",
    xp: 15,
    theory: `<h3>Condicionales</h3>
<pre>if (condición) {
    // código si es verdadero
} else {
    // código si es falso
}</pre>
<h3>Ciclo for</h3>
<pre>for (int i = 0; i < 10; i++) {
    // se repite 10 veces
}</pre>
<p><code>i++</code> incrementa i en 1. <code>i % 2 == 0</code> verifica si i es par.</p>
<div class="theory-note">El operador <code>%</code> (módulo) da el residuo de una división. Si <code>n % 2 == 0</code>, n es par.</div>`,
    instruction: "Completa el programa que imprime los números del 1 al 5, indicando si cada uno es par o impar.",
    starterCode: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            printf("%d es par\\n", i);
        } else {
            // Imprime que i es impar

        }
    }
    return 0;
}`,
    solution: `#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        if (i % 2 == 0) {
            printf("%d es par\\n", i);
        } else {
            printf("%d es impar\\n", i);
        }
    }
    return 0;
}`,
    blanks: [{ line: 8, hint: "Usa printf con %d y \"impar\"" }],
    expectedOutput: "1 es impar\n2 es par\n3 es impar\n4 es par\n5 es impar",
    hints: [
      "En el else, el número es impar",
      "Usa el mismo formato: printf(\"%d es impar\\n\", i);",
      "La línea correcta es: printf(\"%d es impar\\n\", i);"
    ],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 4,
    module: 0,
    title: "Funciones y arreglos",
    icon: "fa-cubes",
    type: "write",
    xp: 15,
    theory: `<h3>Funciones</h3>
<p>Una función es un bloque reutilizable de código:</p>
<pre>int suma(int a, int b) {
    return a + b;
}</pre>
<p>La declaramos con: tipo de retorno, nombre, parámetros. <code>return</code> devuelve el resultado.</p>
<h3>Arreglos</h3>
<pre>int nums[5] = {10, 20, 30, 40, 50};
printf("%d", nums[0]); // imprime 10</pre>
<p>Los índices empiezan en 0. <code>nums[0]</code> es el primer elemento, <code>nums[4]</code> es el quinto.</p>
<div class="theory-note">Los arreglos se recorren con un for: <code>for(int i=0; i&lt;5; i++) printf("%d ", nums[i]);</code></div>`,
    instruction: "Escribe una función <strong>doble</strong> que reciba un int y retorne el doble de su valor. Luego úsala para imprimir el doble de cada elemento del arreglo <code>nums</code>.",
    starterCode: `#include <stdio.h>

// Escribe la función doble aquí

int main() {
    int nums[5] = {3, 7, 1, 9, 5};
    for (int i = 0; i < 5; i++) {
        // Imprime el doble de nums[i] usando tu función

    }
    return 0;
}`,
    solution: `#include <stdio.h>

int doble(int n) {
    return n * 2;
}

int main() {
    int nums[5] = {3, 7, 1, 9, 5};
    for (int i = 0; i < 5; i++) {
        printf("%d\\n", doble(nums[i]));
    }
    return 0;
}`,
    blanks: [],
    expectedOutput: "6\n14\n2\n18\n10",
    hints: [
      "La función recibe int n y retorna n * 2",
      "Declara: int doble(int n) { return n * 2; }",
      "Imprime: printf(\"%d\\n\", doble(nums[i]));"
    ],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 5,
    module: 0,
    title: "Strings",
    icon: "fa-font",
    type: "fill",
    xp: 15,
    theory: `<h3>Cadenas en C</h3>
<p>En C, los strings son arreglos de char terminados con <code>\\0</code>:</p>
<pre>char nombre[50] = "Ana";
int len = strlen(nombre); // 3</pre>
<p>Funciones útiles de <code>&lt;string.h&gt;</code>:</p>
<ul>
<li><code>strlen(s)</code> — longitud del string</li>
<li><code>strcpy(dest, src)</code> — copiar string</li>
<li><code>strcmp(s1, s2)</code> — comparar strings (0 = iguales)</li>
<li><code>strcat(dest, src)</code> — concatenar strings</li>
</ul>
<div class="theory-note">Siempre declara el tamaño suficiente: <code>char nombre[50]</code>. El \\0 ocupa un espacio.</div>`,
    instruction: "Declara un string <code>nombre</code> con \"Ana\", calcula su longitud con <code>strlen</code> e imprime el resultado.",
    starterCode: `#include <stdio.h>
#include <string.h>

int main() {
    // Declara nombre como char[] con valor "Ana"

    // Calcula la longitud usando strlen

    // Imprime: "Ana tiene X letras"

    return 0;
}`,
    solution: `#include <stdio.h>
#include <string.h>

int main() {
    char nombre[50] = "Ana";
    int len = strlen(nombre);
    printf("%s tiene %d letras\\n", nombre, len);
    return 0;
}`,
    blanks: [
      { line: 5, hint: "char nombre[50] = \"Ana\";" },
      { line: 6, hint: "int len = strlen(nombre);" }
    ],
    expectedOutput: "Ana tiene 3 letras",
    hints: [
      "Declara: char nombre[50] = \"Ana\";",
      "Usa strlen(nombre) para obtener la longitud",
      "Imprime: printf(\"%s tiene %d letras\\n\", nombre, len);"
    ],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 6,
    module: 0,
    title: "Punteros y memoria",
    icon: "fa-arrow-pointer",
    type: "fill",
    xp: 20,
    theory: `<h3>Punteros</h3>
<p>Un puntero almacena una dirección de memoria:</p>
<pre>int x = 5;
int *p = &x;  // p apunta a la dirección de x
printf("%d", *p);  // imprime 5 (valor en la dirección)
printf("%p", p);   // imprime la dirección</pre>
<p><code>&x</code> da la dirección de x. <code>*p</code> accede al valor en esa dirección.</p>
<h3>malloc y free</h3>
<pre>int *arr = malloc(5 * sizeof(int)); // reservar memoria
arr[0] = 10;
free(arr); // liberar memoria</pre>
<div class="theory-warning">¡Siempre libera la memoria que reservaste! Olvidar <code>free()</code> causa fugas de memoria (memory leaks).</div>
<h3>Paso por referencia</h3>
<p>Para modificar una variable dentro de una función, pasamos su dirección:</p>
<pre>void sumaUno(int *n) {
    *n = *n + 1; // modifica el valor original
}</pre>`,
    instruction: "Completa la función <strong>swap</strong> que intercambia los valores de dos enteros usando punteros.",
    starterCode: `#include <stdio.h>

void swap(int *a, int *b) {
    // Guarda el valor de *a en una variable temporal
    // Asigna *b a *a
    // Asigna el temporal a *b

}

int main() {
    int x = 3, y = 7;
    printf("Antes: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("Después: x=%d, y=%d\\n", x, y);
    return 0;
}`,
    solution: `#include <stdio.h>

void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 3, y = 7;
    printf("Antes: x=%d, y=%d\\n", x, y);
    swap(&x, &y);
    printf("Después: x=%d, y=%d\\n", x, y);
    return 0;
}`,
    blanks: [
      { line: 4, hint: "int temp = *a;" },
      { line: 5, hint: "*a = *b;" },
      { line: 6, hint: "*b = temp;" }
    ],
    expectedOutput: "Antes: x=3, y=7\nDespués: x=7, y=3",
    hints: [
      " Necesitas una variable temporal para no perder el valor de *a",
      "int temp = *a; guarda el valor de a",
      "Luego: *a = *b; y *b = temp;"
    ],
    usesJSCPP: false,
    bugMode: null
  },

  // ============================================================
  // MÓDULO I: ALGORITMOS FUNDAMENTALES
  // ============================================================
  {
    id: 7,
    module: 1,
    title: "¿Qué es un algoritmo?",
    icon: "fa-lightbulb",
    type: "quiz",
    xp: 10,
    theory: `<h3>Algoritmos</h3>
<p>Un algoritmo es una secuencia finita de pasos no ambiguos para resolver un problema.</p>
<h3>Propiedades de los algoritmos</h3>
<ul>
<li><strong>Finitud</strong>: Debe terminar en un número finito de pasos</li>
<li><strong>Determinismo</strong>: Cada paso tiene una única interpretación</li>
<li><strong>Entrada</strong>: Cero o más datos de entrada</li>
<li><strong>Salida</strong>: Al menos un resultado</li>
<li><strong>Eficacia</strong>: Cada paso debe ser ejecutable en tiempo finito</li>
</ul>
<h3>Tipo de dato abstracto (TDA)</h3>
<p>Un TDA define qué operaciones se pueden realizar, sin especificar cómo se implementan. Ejemplo: una Pila tiene push y pop, pero la implementación puede ser un arreglo o una lista enlazada.</p>
<div class="theory-note">La abstracción nos permite pensar en QUÉ hace algo, no en CÓMO lo hace.</div>`,
    instruction: "Responde las preguntas sobre algoritmos y TDA.",
    quiz: [
      {
        question: "¿Cuál es una propiedad necesaria de un algoritmo?",
        options: ["Debe ser infinito", "Debe ser finito", "Debe ser recursivo", "Debe ser numérico"],
        correct: 1
      },
      {
        question: "¿Qué define a un Tipo de Dato Abstracto?",
        options: [
          "Su implementación en código",
          "Las operaciones que ofrece, no cómo lasimplementa",
          "El lenguaje de programación",
          "La cantidad de memoria que usa"
        ],
        correct: 1
      },
      {
        question: "¿Cuántas salidas debe tener al menos un algoritmo?",
        options: ["0", "1 o más", "Exactamente 1", "Depende del problema"],
        correct: 1
      }
    ],
    expectedOutput: null,
    hints: ["Piensa en las 5 propiedades", "Un TDA define la interfaz, no la implementación", "Todo algoritmo debe producir al menos un resultado"],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 8,
    module: 1,
    title: "Pseudocódigo y TDA",
    icon: "fa-pencil-alt",
    type: "fill",
    xp: 15,
    theory: `<h3>Pseudocódigo</h3>
<p>El pseudocódigo describe algoritmos en lenguaje natural estructurado, sin preocuparse por la sintaxis de un lenguaje específico:</p>
<pre>Función buscar(lista, elemento):
    Para cada i desde 0 hasta longitud(lista)-1:
        Si lista[i] == elemento:
            Retornar i
    Retornar -1</pre>
<h3>De pseudocódigo a C</h3>
<p>Traducimos paso a paso:</p>
<pre>int buscar(int lista[], int n, int elem) {
    for (int i = 0; i < n; i++) {
        if (lista[i] == elem) {
            return i;
        }
    }
    return -1;
}</pre>
<div class="theory-note">Practica traduciendo pseudocódigo a C — es una habilidad fundamental.</div>`,
    instruction: "Traduce el pseudocódigo a C: Función <strong>máximo</strong> que recibe un arreglo y su tamaño, y retorna el valor más grande.",
    starterCode: `#include <stdio.h>

// Traduce: Función máximo(arreglo, tamaño):
//     mayor = arreglo[0]
//     Para i desde 1 hasta tamaño-1:
//         Si arreglo[i] > mayor:
//             mayor = arreglo[i]
//     Retornar mayor

int main() {
    int nums[] = {5, 12, 3, 8, 21, 7};
    int n = 6;
    printf("El máximo es: %d\\n", maximo(nums, n));
    return 0;
}`,
    solution: `#include <stdio.h>

int maximo(int arr[], int n) {
    int mayor = arr[0];
    for (int i = 1; i < n; i++) {
        if (arr[i] > mayor) {
            mayor = arr[i];
        }
    }
    return mayor;
}

int main() {
    int nums[] = {5, 12, 3, 8, 21, 7};
    int n = 6;
    printf("El máximo es: %d\\n", maximo(nums, n));
    return 0;
}`,
    blanks: [],
    expectedOutput: "El máximo es: 21",
    hints: [
      "Declara la función: int maximo(int arr[], int n)",
      "Inicializa mayor con arr[0] y recorre desde i=1",
      "Compara cada arr[i] con mayor y actualiza si es mayor"
    ],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 9,
    module: 1,
    title: "Notación Big O",
    icon: "fa-chart-line",
    type: "quiz",
    xp: 15,
    theory: `<h3>Orden de complejidad O()</h3>
<p>La notación Big O describe cómo crece el tiempo de ejecución (o memoria) de un algoritmo respecto al tamaño de entrada n.</p>
<h3>Complejidades comunes (de mejor a peor)</h3>
<ul>
<li><code>O(1)</code> — Constante: siempre el mismo tiempo</li>
<li><code>O(log n)</code> — Logarítmica: se reduce el problema a la mitad</li>
<li><code>O(n)</code> — Lineal: crece proporcionalmente</li>
<li><code>O(n log n)</code> — Log-lineal: algoritmos eficientes de ordenamiento</li>
<li><code>O(n²)</code> — Cuadrática: ciclos anidados</li>
<li><code>O(2ⁿ)</code> — Exponencial: exploración exhaustiva</li>
</ul>
<pre>// O(n) — recorre n elementos una vez
for (int i = 0; i < n; i++) { ... }

// O(n²) — dos ciclos anidados
for (int i = 0; i < n; i++)
    for (int j = 0; j < n; j++) { ... }</pre>
<div class="theory-note">En este curso, comparar la complejidad de algoritmos es tan importante como implementarlos correctamente.</div>`,
    instruction: "Responde las preguntas sobre complejidad Big O.",
    quiz: [
      {
        question: "¿Cuál es la complejidad de un ciclo simple que recorre n elementos?",
        options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
        correct: 1
      },
      {
        question: "¿Cuál es más eficiente?",
        options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
        correct: 3
      },
      {
        question: "Un algoritmo con dos ciclos for anidados, cada uno hasta n, tiene complejidad:",
        options: ["O(n)", "O(2n)", "O(n²)", "O(2ⁿ)"],
        correct: 2
      },
      {
        question: "Acceder al elemento arr[5] de un arreglo tiene complejidad:",
        options: ["O(n)", "O(5)", "O(1)", "O(log n)"],
        correct: 2
      },
      {
        question: "La búsqueda binaria en un arreglo ordenado tiene complejidad:",
        options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
        correct: 2
      }
    ],
    expectedOutput: null,
    hints: ["Un ciclo = O(n)", "Dos ciclos anidados = O(n²)", "Acceso directo = O(1)", "Búsqueda binaria = O(log n)"],
    usesJSCPP: true,
    bugMode: null
  },
  {
    id: 10,
    module: 1,
    title: "Ordenamiento por inserción",
    icon: "fa-sort-amount-up",
    type: "write",
    xp: 25,
    theory: `<h3>Insertion Sort</h3>
<p>El ordenamiento por inserción funciona como cuando ordenas cartas en tu mano: tomas cada elemento y lo insertas en su posición correcta.</p>
<pre>Para i desde 1 hasta n-1:
    key = arreglo[i]
    j = i - 1
    Mientras j >= 0 y arreglo[j] > key:
        arreglo[j+1] = arreglo[j]
        j--
    arreglo[j+1] = key</pre>
<h3>Complejidad</h3>
<ul>
<li><strong>Mejor caso</strong>: O(n) — ya ordenado</li>
<li><strong>Caso promedio</strong>: O(n²)</li>
<li><strong>Peor caso</strong>: O(n²) — ordenado al revés</li>
</ul>
<div class="theory-note">Es eficiente para arreglos pequeños o casi ordenados. Es un algoritmo estable (mantiene el orden relativo de elementos iguales).</div>`,
    instruction: "Implementa <strong>insertion sort</strong>. El arreglo debe quedar ordenado de menor a mayor.",
    starterCode: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    // Escribe el algoritmo de inserción aquí

}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    insertionSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    solution: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    insertionSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    blanks: [],
    expectedOutput: "11 12 22 25 34 64 90 ",
    hints: [
      "Empieza desde i=1, guarda arr[i] en key",
      "Desplaza elementos mayores que key una posición a la derecha",
      "Inserta key en la posición correcta: arr[j+1] = key"
    ],
    usesJSCPP: false,
    bugMode: {
      description: "Este insertion sort tiene un bug. El arreglo no se ordena correctamente. Encuéntralo y corrígelo.",
      buggedCode: `#include <stdio.h>

void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j > 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

int main() {
    int arr[] = {5, 2, 4, 1, 3};
    int n = 5;
    insertionSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
      expectedOutput: "Cuando j=0, arr[j] no se compara. El while debe ser j >= 0."
    }
  },
  {
    id: 11,
    module: 1,
    title: "Ordenamiento por selección",
    icon: "fa-hand-pointer",
    type: "write",
    xp: 25,
    theory: `<h3>Selection Sort</h3>
<p>El ordenamiento por selección encuentra el elemento más pequeño del arreglo no ordenado y lo coloca al inicio.</p>
<pre>Para i desde 0 hasta n-2:
    min_idx = i
    Para j desde i+1 hasta n-1:
        Si arr[j] < arr[min_idx]:
            min_idx = j
    Intercambiar arr[i] con arr[min_idx]</pre>
<h3>Complejidad</h3>
<ul>
<li><strong>Todos los casos</strong>: O(n²) — siempre recorre todo el arreglo</li>
</ul>
<div class="theory-note">Aunque siempre es O(n²), es intuitivo y fácil de implementar. No es estable.</div>`,
    instruction: "Implementa <strong>selection sort</strong>. El arreglo debe quedar ordenado de menor a mayor.",
    starterCode: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    // Escribe el algoritmo de selección aquí

}

int main() {
    int arr[] = {29, 10, 14, 37, 13};
    int n = 5;
    selectionSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    solution: `#include <stdio.h>

void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                min_idx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[min_idx];
        arr[min_idx] = temp;
    }
}

int main() {
    int arr[] = {29, 10, 14, 37, 13};
    int n = 5;
    selectionSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    blanks: [],
    expectedOutput: "10 13 14 29 37 ",
    hints: [
      "Para cada posición i, busca el mínimo en el resto del arreglo",
      "Guarda el índice del mínimo en min_idx",
      "Intercambia arr[i] con arr[min_idx]"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 12,
    module: 1,
    title: "Burbuja",
    icon: "fa-water",
    type: "write",
    xp: 25,
    theory: `<h3>Bubble Sort</h3>
<p>Compara pares adyacentes y los intercambia si están en el orden incorrecto. Los elementos "burbujean" hacia su posición final.</p>
<pre>Para i desde 0 hasta n-2:
    Para j desde 0 hasta n-i-2:
        Si arr[j] > arr[j+1]:
            Intercambiar arr[j] y arr[j+1]</pre>
<h3>Optimización</h3>
<p>Si en una pasada no hay intercambios, el arreglo ya está ordenado:</p>
<pre>swapped = falso
Si no hay intercambios: break</pre>
<h3>Complejidad</h3>
<ul>
<li><strong>Mejor caso</strong>: O(n) — ya ordenado (con optimización)</li>
<li><strong>Peor caso</strong>: O(n²)</li>
</ul>`,
    instruction: "Implementa <strong>bubble sort</strong> con la optimización de swapped.",
    starterCode: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    // Escribe bubble sort con optimización aquí

}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    solution: `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = 1;
            }
        }
        if (!swapped) break;
    }
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = 7;
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    blanks: [],
    expectedOutput: "11 12 22 25 34 64 90 ",
    hints: [
      "Dos ciclos: externo (i) para pasadas, interno (j) para comparaciones",
      "Si arr[j] > arr[j+1], intercámbialos",
      "Usa una bandera swapped para detenerte si ya está ordenado"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 13,
    module: 1,
    title: "Merge sort",
    icon: "fa-code-branch",
    type: "write",
    xp: 35,
    theory: `<h3>Merge Sort</h3>
<p>Divide el arreglo en dos mitades, ordena cada mitad recursivamente, y luego las fusiona (merge).</p>
<pre>mergeSort(arr, izq, der):
    Si izq < der:
        medio = (izq + der) / 2
        mergeSort(arr, izq, medio)
        mergeSort(arr, medio+1, der)
        merge(arr, izq, medio, der)</pre>
<h3>La función merge</h3>
<p>Fusiona dos subarreglos ordenados en uno solo, comparando elementos:</p>
<pre>merge(arr, izq, medio, der):
    Copiar ambas mitades a arreglos temporales
    Comparar y colocar el menor primero
    Copiar los restantes</pre>
<h3>Complejidad</h3>
<ul>
<li><strong>Todos los casos</strong>: O(n log n)</li>
<li><strong>Espacio</strong>: O(n) — necesita arreglos temporales</li>
</ul>
<div class="theory-note">Merge sort es estable y siempre O(n log n), pero requiere memoria adicional.</div>`,
    instruction: "Implementa <strong>merge sort</strong>. Se proporciona la función merge, tú debes completar mergeSort.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    free(L);
    free(R);
}

void mergeSort(int arr[], int l, int r) {
    // Escribe la recursión aquí

}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = 7;
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>

void merge(int arr[], int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int *L = malloc(n1 * sizeof(int));
    int *R = malloc(n2 * sizeof(int));
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
    free(L);
    free(R);
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int arr[] = {38, 27, 43, 3, 9, 82, 10};
    int n = 7;
    mergeSort(arr, 0, n - 1);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
    return 0;
}`,
    blanks: [],
    expectedOutput: "3 9 10 27 38 43 82 ",
    hints: [
      "Caso base: si l >= r, ya está ordenado (un solo elemento)",
      "Calcula el medio: m = l + (r - l) / 2",
      "Llama recursivamente para cada mitad y luego merge"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 14,
    module: 1,
    title: "Búsqueda secuencial y binaria",
    icon: "fa-search",
    type: "write",
    xp: 25,
    theory: `<h3>Búsqueda secuencial (lineal)</h3>
<p>Recorre cada elemento hasta encontrar el buscado:</p>
<pre>int busquedaLineal(int arr[], int n, int x) {
    for (int i = 0; i < n; i++)
        if (arr[i] == x) return i;
    return -1;
}</pre>
<p>Complejidad: <strong>O(n)</strong></p>
<h3>Búsqueda binaria</h3>
<p>Requiere arreglo ORDENADO. Compara con el elemento medio y descarta la mitad:</p>
<pre>int busquedaBinaria(int arr[], int n, int x) {
    int izq = 0, der = n - 1;
    while (izq <= der) {
        int medio = izq + (der - izq) / 2;
        if (arr[medio] == x) return medio;
        if (arr[medio] < x) izq = medio + 1;
        else der = medio - 1;
    }
    return -1;
}</pre>
<p>Complejidad: <strong>O(log n)</strong></p>
<div class="theory-note">La búsqueda binaria es mucho más rápida en arreglos grandes. Para 1 millón de elementos: lineal hasta 1,000,000 pasos, binaria máximo 20 pasos.</div>`,
    instruction: "Implementa <strong>búsqueda binaria</strong>. El arreglo ya está ordenado.",
    starterCode: `#include <stdio.h>

int busquedaBinaria(int arr[], int n, int x) {
    // Escribe búsqueda binaria aquí

}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91};
    int n = 11;
    int x = 23;
    int resultado = busquedaBinaria(arr, n, x);
    if (resultado != -1) {
        printf("Elemento %d encontrado en posición %d\\n", x, resultado);
    } else {
        printf("Elemento %d no encontrado\\n", x);
    }
    return 0;
}`,
    solution: `#include <stdio.h>

int busquedaBinaria(int arr[], int n, int x) {
    int izq = 0, der = n - 1;
    while (izq <= der) {
        int medio = izq + (der - izq) / 2;
        if (arr[medio] == x) return medio;
        if (arr[medio] < x) izq = medio + 1;
        else der = medio - 1;
    }
    return -1;
}

int main() {
    int arr[] = {2, 5, 8, 12, 16, 23, 38, 45, 56, 72, 91};
    int n = 11;
    int x = 23;
    int resultado = busquedaBinaria(arr, n, x);
    if (resultado != -1) {
        printf("Elemento %d encontrado en posición %d\\n", x, resultado);
    } else {
        printf("Elemento %d no encontrado\\n", x);
    }
    return 0;
}`,
    blanks: [],
    expectedOutput: "Elemento 23 encontrado en posición 5",
    hints: [
      "Inicializa izq=0, der=n-1",
      "Calcula medio = izq + (der - izq) / 2",
      "Si arr[medio] < x, busca en la derecha: izq = medio + 1"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 15,
    module: 1,
    title: "Búsqueda indexada",
    icon: "fa-list-ol",
    type: "fill",
    xp: 20,
    theory: `<h3>Búsqueda indexada</h3>
<p>La búsqueda indexada usa un índice auxiliar para reducir el número de comparaciones. Similar al índice de un libro: en lugar de buscar página por página, vas al índice primero.</p>
<pre>Estructura del índice:
    idx      rango_inicio
    0        0            // rango: A-D
    1        4            // rango: E-H
    2        8            // rango: I-Z</pre>
<p>Primero buscas en el índice para determining el bloque, luego buscas linealmente dentro de ese bloque.</p>
<h3>Complejidad</h3>
<ul>
<li><strong>Búsqueda en índice</strong>: O(k) donde k = número de bloques</li>
<li><strong>Búsqueda en bloque</strong>: O(n/k)</li>
<li><strong>Total</strong>: O(k + n/k), óptimo cuando k ≈ √n</li>
</ul>`,
    instruction: "Completa la búsqueda indexada que busca en un arreglo usando un índice auxiliar de rangos.",
    starterCode: `#include <stdio.h>

typedef struct {
    int valor_inicio;
    int indice_inicio;
} Indice;

int busquedaIndexada(int arr[], int n, Indice idx[], int num_bloques, int x) {
    // Paso 1: Buscar en qué bloque podría estar x

    // Paso 2: Buscar linealmente en ese bloque

    return -1;
}

int main() {
    int arr[] = {3, 7, 11, 15, 22, 28, 35, 41, 48, 55, 60};
    int n = 11;
    Indice idx[] = {{3, 0}, {22, 4}, {48, 8}};
    int num_bloques = 3;
    int x = 35;
    int pos = busquedaIndexada(arr, n, idx, num_bloques, x);
    if (pos != -1) printf("Encontrado en posición %d\\n", pos);
    else printf("No encontrado\\n");
    return 0;
}`,
    solution: `#include <stdio.h>

typedef struct {
    int valor_inicio;
    int indice_inicio;
} Indice;

int busquedaIndexada(int arr[], int n, Indice idx[], int num_bloques, int x) {
    int bloque = -1;
    for (int i = 0; i < num_bloques; i++) {
        if (x >= idx[i].valor_inicio) bloque = i;
    }
    if (bloque == -1) return -1;
    int inicio = idx[bloque].indice_inicio;
    int fin = (bloque + 1 < num_bloques) ? idx[bloque + 1].indice_inicio : n;
    for (int i = inicio; i < fin; i++) {
        if (arr[i] == x) return i;
    }
    return -1;
}

int main() {
    int arr[] = {3, 7, 11, 15, 22, 28, 35, 41, 48, 55, 60};
    int n = 11;
    Indice idx[] = {{3, 0}, {22, 4}, {48, 8}};
    int num_bloques = 3;
    int x = 35;
    int pos = busquedaIndexada(arr, n, idx, num_bloques, x);
    if (pos != -1) printf("Encontrado en posición %d\\n", pos);
    else printf("No encontrado\\n");
    return 0;
}`,
    blanks: [{ line: 8, hint: "Recorre los bloques para encontrar dónde podría estar x" }],
    expectedOutput: "Encontrado en posición 6",
    hints: [
      "Recorre idx para encontrar el último bloque donde x >= valor_inicio",
      "Determina el rango inicio-fin del bloque encontrado",
      "Busca linealmente dentro de ese rango"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 16,
    module: 1,
    title: "Vuelta atrás (backtracking)",
    icon: "fa-undo",
    type: "write",
    xp: 40,
    theory: `<h3>Backtracking</h3>
<p>El backtracking (vuelta atrás) es una técnica para resolver problemas probando todas las posibles soluciones y retrocediendo cuando una opción no lleva a la solución.</p>
<pre>Función backtracking(paso):
    Si es solución:
        procesar solución
        retornar
    Para cada opción posible en este paso:
        Si opción es válida:
            marcar opción
            backtracking(paso + 1)
            desmarcar opción  // backtrack</pre>
<h3>Ejemplo: N-Reinas</h3>
<p>Colocar N reinas en un tablero NxN sin que se ataquen entre sí.</p>
<div class="theory-note">Backtracking es la base de muchos problemas de exploración exhaustiva. Su complejidad típicamente es exponencial O(2ⁿ) o peor.</div>`,
    instruction: "Completa la función recursiva para resolver el problema de las <strong>N-reinas</strong> (N=4). Imprime las posiciones de las reinas.",
    starterCode: `#include <stdio.h>
#define N 4

int tablero[N][N] = {0};

int esSeguro(int fila, int col) {
    for (int i = 0; i < col; i++)
        if (tablero[fila][i]) return 0;
    for (int i = fila, j = col; i >= 0 && j >= 0; i--, j--)
        if (tablero[i][j]) return 0;
    for (int i = fila, j = col; j >= 0 && i < N; i++, j--)
        if (tablero[i][j]) return 0;
    return 1;
}

int resolverNReinas(int col) {
    if (col >= N) return 1;
    for (int i = 0; i < N; i++) {
        if (esSeguro(i, col)) {
            tablero[i][col] = 1;
            if (resolverNReinas(col + 1)) return 1;
            tablero[i][col] = 0;
        }
    }
    return 0;
}

int main() {
    if (resolverNReinas(0)) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                printf("%d ", tablero[i][j]);
            printf("\\n");
        }
    } else {
        printf("Sin solución\\n");
    }
    return 0;
}`,
    solution: `#include <stdio.h>
#define N 4

int tablero[N][N] = {0};

int esSeguro(int fila, int col) {
    for (int i = 0; i < col; i++)
        if (tablero[fila][i]) return 0;
    for (int i = fila, j = col; i >= 0 && j >= 0; i--, j--)
        if (tablero[i][j]) return 0;
    for (int i = fila, j = col; j >= 0 && i < N; i++, j--)
        if (tablero[i][j]) return 0;
    return 1;
}

int resolverNReinas(int col) {
    if (col >= N) return 1;
    for (int i = 0; i < N; i++) {
        if (esSeguro(i, col)) {
            tablero[i][col] = 1;
            if (resolverNReinas(col + 1)) return 1;
            tablero[i][col] = 0;
        }
    }
    return 0;
}

int main() {
    if (resolverNReinas(0)) {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                printf("%d ", tablero[i][j]);
            printf("\\n");
        }
    } else {
        printf("Sin solución\\n");
    }
    return 0;
}`,
    blanks: [],
    expectedOutput: "0 1 0 0 \n0 0 0 1 \n1 0 0 0 \n0 0 1 0 ",
    hints: [
      "La función ya está completa — estúdiala y ejecútala",
      "Backtracking: marca la posición, intenta recursivamente, desmarca si falla",
      "esSeguro verifica que no haya reinas en la misma fila o diagonales"
    ],
    usesJSCPP: false,
    bugMode: null
  },

  // ============================================================
  // MÓDULO II: ESTRUCTURAS DE DATOS LINEALES
  // ============================================================
  {
    id: 17,
    module: 2,
    title: "Pila estática",
    icon: "fa-layer-group",
    type: "fill",
    xp: 25,
    theory: `<h3>Pila (Stack)</h3>
<p>Una pila es una estructura LIFO (Last In, First Out): el último en entrar es el primero en salir. Imagina una pila de platos.</p>
<h3>Operaciones del TDA Pila</h3>
<ul>
<li><code>push(elemento)</code> — Insertar en el tope</li>
<li><code>pop()</code> — Eliminar del tope</li>
<li><code>peek()</code> — Ver el tope sin eliminar</li>
<li><code>isEmpty()</code> — ¿Está vacía?</li>
<li><code>isFull()</code> — ¿Está llena? (solo estática)</li>
</ul>
<h3>Implementación estática (con arreglo)</h3>
<pre>#define MAX 100
int pila[MAX];
int tope = -1;

void push(int x) { pila[++tope] = x; }
int pop() { return pila[tope--]; }
int peek() { return pila[tope]; }</pre>
<div class="theory-note">Complejidad: todas las operaciones son O(1).</div>`,
    instruction: "Completa las operaciones <strong>push</strong> y <strong>pop</strong> de una pila estática. Luego empuja 10, 20, 30 y haz pop.",
    starterCode: `#include <stdio.h>
#define MAX 100

int pila[MAX];
int tope = -1;

void push(int x) {
    // Verifica si está llena y agrega al tope

}

int pop() {
    // Verifica si está vacía y elimina del tope

}

int peek() { return pila[tope]; }
int isEmpty() { return tope == -1; }

int main() {
    push(10);
    push(20);
    push(30);
    printf("Tope: %d\\n", peek());
    printf("Pop: %d\\n", pop());
    printf("Pop: %d\\n", pop());
    printf("Tope: %d\\n", peek());
    return 0;
}`,
    solution: `#include <stdio.h>
#define MAX 100

int pila[MAX];
int tope = -1;

void push(int x) {
    if (tope < MAX - 1) {
        pila[++tope] = x;
    }
}

int pop() {
    if (tope >= 0) {
        return pila[tope--];
    }
    return -1;
}

int peek() { return pila[tope]; }
int isEmpty() { return tope == -1; }

int main() {
    push(10);
    push(20);
    push(30);
    printf("Tope: %d\\n", peek());
    printf("Pop: %d\\n", pop());
    printf("Pop: %d\\n", pop());
    printf("Tope: %d\\n", peek());
    return 0;
}`,
    blanks: [
      { line: 7, hint: "if (tope < MAX - 1) pila[++tope] = x;" },
      { line: 13, hint: "if (tope >= 0) return pila[tope--];" }
    ],
    expectedOutput: "Tope: 30\nPop: 30\nPop: 20\nTope: 10",
    hints: [
      "push: incrementa tope y coloca el elemento",
      "pop: retorna pila[tope] y decrementa tope",
      "Recuerda verificar los límites (isFull y isEmpty)"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 18,
    module: 2,
    title: "Pila dinámica",
    icon: "fa-link",
    type: "write",
    xp: 30,
    theory: `<h3>Pila dinámica (con nodos)</h3>
<p>En lugar de un arreglo fijo, usamos nodos enlazados asignados con <code>malloc</code>:</p>
<pre>typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* tope = NULL;

void push(int x) {
    Nodo* nuevo = malloc(sizeof(Nodo));
    nuevo->dato = x;
    nuevo->sig = tope;
    tope = nuevo;
}</pre>
<h3>Ventajas sobre la estática</h3>
<ul>
<li>No hay límite fijo (solo la memoria disponible)</li>
<li>No desperdicia espacio si la pila es pequeña</li>
</ul>
<div class="theory-warning">¡Siempre libera la memoria con <code>free()</code> al hacer pop!</div>`,
    instruction: "Implementa <strong>push</strong>, <strong>pop</strong> y <strong>imprimir</strong> para una pila dinámica.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* tope = NULL;

void push(int x) {
    // Crea un nuevo nodo y lo coloca al tope

}

int pop() {
    // Elimina el tope y retorna su dato

}

void imprimir() {
    Nodo* actual = tope;
    while (actual != NULL) {
        printf("%d ", actual->dato);
        actual = actual->sig;
    }
    printf("\\n");
}

int main() {
    push(10);
    push(20);
    push(30);
    imprimir();
    printf("Pop: %d\\n", pop());
    imprimir();
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* tope = NULL;

void push(int x) {
    Nodo* nuevo = malloc(sizeof(Nodo));
    nuevo->dato = x;
    nuevo->sig = tope;
    tope = nuevo;
}

int pop() {
    if (tope == NULL) return -1;
    Nodo* temp = tope;
    int dato = temp->dato;
    tope = tope->sig;
    free(temp);
    return dato;
}

void imprimir() {
    Nodo* actual = tope;
    while (actual != NULL) {
        printf("%d ", actual->dato);
        actual = actual->sig;
    }
    printf("\\n");
}

int main() {
    push(10);
    push(20);
    push(30);
    imprimir();
    printf("Pop: %d\\n", pop());
    imprimir();
    return 0;
}`,
    blanks: [],
    expectedOutput: "30 20 10 \nPop: 30\n20 10 ",
    hints: [
      "push: malloc sizeof(Nodo), asignar dato y sig, actualizar tope",
      "pop: guardar tope en temp, avanzar tope, free(temp)",
      "Imprimir recorre desde tope imprimiendo cada dato"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 19,
    module: 2,
    title: "Cola estática y dinámica",
    icon: "fa-stream",
    type: "fill",
    xp: 25,
    theory: `<h3>Cola (Queue)</h3>
<p>Una cola es FIFO (First In, First Out): el primero en entrar es el primero en salir. Como una fila del supermercado.</p>
<h3>Operaciones del TDA Cola</h3>
<ul>
<li><code>enqueue(elemento)</code> — Insertar al final</li>
<li><code>dequeue()</code> — Eliminar del frente</li>
<li><code>front()</code> — Ver el primero sin eliminar</li>
<li><code>isEmpty()</code> — ¿Está vacía?</li>
</ul>
<h3>Implementación con arreglo circular</h3>
<pre>#define MAX 100
int cola[MAX];
int frente = 0, final = -1, tamaño = 0;</pre>
<div class="theory-note">La implementación circular evita desperdiciar espacio al inicio del arreglo cuando se hacen dequeue.</div>`,
    instruction: "Completa <strong>enqueue</strong> y <strong>dequeue</strong> para una cola con arreglo circular.",
    starterCode: `#include <stdio.h>
#define MAX 100

int cola[MAX];
int frente = 0, final = -1, tam = 0;

void enqueue(int x) {
    // Insertar al final circular

}

int dequeue() {
    // Eliminar del frente circular

}

int front() { return cola[frente]; }
int isEmpty() { return tam == 0; }

int main() {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("Frente: %d\\n", front());
    printf("Dequeue: %d\\n", dequeue());
    printf("Frente: %d\\n", front());
    return 0;
}`,
    solution: `#include <stdio.h>
#define MAX 100

int cola[MAX];
int frente = 0, final = -1, tam = 0;

void enqueue(int x) {
    if (tam < MAX) {
        final = (final + 1) % MAX;
        cola[final] = x;
        tam++;
    }
}

int dequeue() {
    if (tam > 0) {
        int val = cola[frente];
        frente = (frente + 1) % MAX;
        tam--;
        return val;
    }
    return -1;
}

int front() { return cola[frente]; }
int isEmpty() { return tam == 0; }

int main() {
    enqueue(10);
    enqueue(20);
    enqueue(30);
    printf("Frente: %d\\n", front());
    printf("Dequeue: %d\\n", dequeue());
    printf("Frente: %d\\n", front());
    return 0;
}`,
    blanks: [
      { line: 9, hint: "final = (final + 1) % MAX; cola[final] = x; tam++;" },
      { line: 16, hint: "frente = (frente + 1) % MAX; tam--; return val;" }
    ],
    expectedOutput: "Frente: 10\nDequeue: 10\nFrente: 20",
    hints: [
      "enqueue: incrementa final de forma circular con % MAX",
      "dequeue: guarda cola[frente], avanza frente de forma circular",
      "Usa (índice + 1) % MAX para movimiento circular"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 20,
    module: 2,
    title: "Cola de prioridad",
    icon: "fa-sort-numeric-down",
    type: "write",
    xp: 30,
    theory: `<h3>Cola de prioridad</h3>
<p>Como una cola normal, pero cada elemento tiene una prioridad. Los de mayor prioridad salen primero, independientemente del orden de llegada.</p>
<h3>Implementación simple (con arreglo ordenado)</h3>
<p>Al insertar, se coloca en la posición correcta según prioridad. Al eliminar, se saca del frente (ya ordenado).</p>
<pre>Insertar (0, prioridad 3): [3,0] → [5,1] → [1,2]
Insertar (7, prioridad 1): [1,2] → [7,1] → [3,0] → [5,1]
Dequeue: retorna 7 (prioridad más alta=1)</pre>
<div class="theory-note">Esta implementación es O(n) para insertar y O(1) para dequeue. Con un heap (montículo) se logra O(log n) para ambas. Lo veremos en el módulo III.</div>`,
    instruction: "Implementa una <strong>cola de prioridad</strong> simple usando un arreglo ordenado por prioridad (1 = más alta).",
    starterCode: `#include <stdio.h>
#define MAX 100

typedef struct {
    int dato;
    int prioridad;
} Elemento;

Elemento cola[MAX];
int tam = 0;

void enqueue(int dato, int prio) {
    // Insertar manteniendo orden por prioridad (menor número = mayor prioridad)

}

Elemento dequeue() {
    // Eliminar y retornar el de mayor prioridad (índice 0)

}

int main() {
    enqueue("Tarea A", 3);
    enqueue("Tarea B", 1);
    enqueue("Tarea C", 2);
    for (int i = 0; i < 3; i++) {
        Elemento e = dequeue();
        printf("Procesando: dato=%d prio=%d\\n", e.dato, e.prioridad);
    }
    return 0;
}`,
    solution: `#include <stdio.h>
#define MAX 100

typedef struct {
    int dato;
    int prioridad;
} Elemento;

Elemento cola[MAX];
int tam = 0;

void enqueue(int dato, int prio) {
    if (tam >= MAX) return;
    int i = tam - 1;
    while (i >= 0 && cola[i].prioridad > prio) {
        cola[i + 1] = cola[i];
        i--;
    }
    cola[i + 1].dato = dato;
    cola[i + 1].prioridad = prio;
    tam++;
}

Elemento dequeue() {
    Elemento e = cola[0];
    for (int i = 0; i < tam - 1; i++) {
        cola[i] = cola[i + 1];
    }
    tam--;
    return e;
}

int main() {
    enqueue(10, 3);
    enqueue(20, 1);
    enqueue(30, 2);
    for (int i = 0; i < 3; i++) {
        Elemento e = dequeue();
        printf("Procesando: dato=%d prio=%d\\n", e.dato, e.prioridad);
    }
    return 0;
}`,
    blanks: [],
    expectedOutput: "Procesando: dato=20 prio=1\nProcesando: dato=30 prio=2\nProcesando: dato=10 prio=3",
    hints: [
      "Al insertar, desplaza los de mayor prioridad (>prio) una posición",
      "El de menor número de prioridad va primero",
      "Dequeue retorna el elemento en índice 0 y desplaza los demás"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 21,
    module: 2,
    title: "Lista simplemente enlazada",
    icon: "fa-link",
    type: "write",
    xp: 30,
    theory: `<h3>Lista simplemente enlazada</h3>
<p>Cada nodo tiene un dato y un puntero al siguiente nodo:</p>
<pre>typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* cabeza = NULL;</pre>
<h3>Operaciones</h3>
<ul>
<li><code>insertar(x)</code> — Insertar al inicio</li>
<li><code>eliminar(x)</code> — Eliminar primera ocurrencia</li>
<li><code>buscar(x)</code> — Retornar si existe</li>
<li><code>imprimir()</code> — Mostrar todos los datos</li>
</ul>
<div class="theory-note">Insertar al inicio es O(1). Buscar y eliminar son O(n) porque hay que recorrer.</div>`,
    instruction: "Implementa <strong>insertar al inicio</strong> e <strong>imprimir</strong> para una lista simplemente enlazada.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* cabeza = NULL;

void insertar(int x) {
    // Crear nodo y colocarlo al inicio

}

void imprimir() {
    // Recorrer e imprimir cada nodo

}

int main() {
    insertar(30);
    insertar(20);
    insertar(10);
    imprimir();
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* cabeza = NULL;

void insertar(int x) {
    Nodo* nuevo = malloc(sizeof(Nodo));
    nuevo->dato = x;
    nuevo->sig = cabeza;
    cabeza = nuevo;
}

void imprimir() {
    Nodo* actual = cabeza;
    while (actual != NULL) {
        printf("%d -> ", actual->dato);
        actual = actual->sig;
    }
    printf("NULL\\n");
}

int main() {
    insertar(30);
    insertar(20);
    insertar(10);
    imprimir();
    return 0;
}`,
    blanks: [],
    expectedOutput: "10 -> 20 -> 30 -> NULL",
    hints: [
      "malloc(sizeof(Nodo)) para crear un nuevo nodo",
      "nuevo->sig = cabeza; cabeza = nuevo; para insertar al inicio",
      "Recorrer con while(actual != NULL) e imprimir actual->dato"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 22,
    module: 2,
    title: "Lista doblemente enlazada",
    icon: "fa-exchange-alt",
    type: "fill",
    xp: 30,
    theory: `<h3>Lista doblemente enlazada</h3>
<p>Cada nodo tiene punteros al nodo anterior y al siguiente:</p>
<pre>typedef struct Nodo {
    int dato;
    struct Nodo* ant;
    struct Nodo* sig;
} Nodo;</pre>
<h3>Ventajas vs simplemente enlazada</h3>
<ul>
<li>Se puede recorrer en ambas direcciones</li>
<li>Eliminar un nodo dado es O(1) si tenemos su referencia</li>
<li>Desventaja: más memoria (2 punteros por nodo)</li>
</ul>`,
    instruction: "Completa <strong>insertar al inicio</strong> en una lista doblemente enlazada.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* ant;
    struct Nodo* sig;
} Nodo;

Nodo* cabeza = NULL;

void insertar(int x) {
    // Crear nodo y establecer enlaces doblemente

}

void imprimirAdelante() {
    Nodo* actual = cabeza;
    while (actual != NULL) {
        printf("%d ", actual->dato);
        actual = actual->sig;
    }
    printf("\\n");
}

int main() {
    insertar(30);
    insertar(20);
    insertar(10);
    imprimirAdelante();
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* ant;
    struct Nodo* sig;
} Nodo;

Nodo* cabeza = NULL;

void insertar(int x) {
    Nodo* nuevo = malloc(sizeof(Nodo));
    nuevo->dato = x;
    nuevo->ant = NULL;
    nuevo->sig = cabeza;
    if (cabeza != NULL) cabeza->ant = nuevo;
    cabeza = nuevo;
}

void imprimirAdelante() {
    Nodo* actual = cabeza;
    while (actual != NULL) {
        printf("%d ", actual->dato);
        actual = actual->sig;
    }
    printf("\\n");
}

int main() {
    insertar(30);
    insertar(20);
    insertar(10);
    imprimirAdelante();
    return 0;
}`,
    blanks: [{ line: 14, hint: "nuevo->ant=NULL; nuevo->sig=cabeza; if(cabeza) cabeza->ant=nuevo; cabeza=nuevo" }],
    expectedOutput: "10 20 30 ",
    hints: [
      "Nuevo nodo: ant=NULL, sig=cabeza",
      "Si cabeza no es NULL: cabeza->ant = nuevo",
      "Finalmente: cabeza = nuevo"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 23,
    module: 2,
    title: "Función hash y colisiones",
    icon: "fa-hashtag",
    type: "fill",
    xp: 30,
    theory: `<h3>Tablas hash</h3>
<p>Una tabla hash mapea una clave a una posición usando una función hash:</p>
<pre>int hash(int clave, int tamaño) {
    return clave % tamaño;
}</pre>
<h3>Colisiones</h3>
<p>Cuando dos claves mapean a la misma posición. Hay dos estrategias:</p>
<ul>
<li><strong>Sondeo lineal</strong>: Si la posición está ocupada, prueba la siguiente</li>
<li><strong>Encadenamiento</strong>: Cada posición es una lista enlazada</li>
</ul>
<div class="theory-note">Una buena función hash distribuye las claves uniformemente. El módulo (%) es la más simple.</div>`,
    instruction: "Completa la función <strong>hash</strong> y la inserción con <strong>sondeo lineal</strong>.",
    starterCode: `#include <stdio.h>
#define TAM 10

int tabla[TAM];
int ocupado[TAM] = {0};

int hash(int clave) {
    // Función hash simple: clave % TAM

}

void insertar(int clave) {
    int idx = hash(clave);
    // Sondeo lineal si hay colisión

}

int buscar(int clave) {
    int idx = hash(clave);
    while (ocupado[idx]) {
        if (tabla[idx] == clave) return idx;
        idx = (idx + 1) % TAM;
    }
    return -1;
}

int main() {
    insertar(15);
    insertar(25);
    insertar(35);
    insertar(5);
    for (int i = 0; i < TAM; i++) {
        if (ocupado[i]) printf("[%d]: %d\\n", i, tabla[i]);
    }
    return 0;
}`,
    solution: `#include <stdio.h>
#define TAM 10

int tabla[TAM];
int ocupado[TAM] = {0};

int hash(int clave) {
    return clave % TAM;
}

void insertar(int clave) {
    int idx = hash(clave);
    while (ocupado[idx]) {
        idx = (idx + 1) % TAM;
    }
    tabla[idx] = clave;
    ocupado[idx] = 1;
}

int buscar(int clave) {
    int idx = hash(clave);
    while (ocupado[idx]) {
        if (tabla[idx] == clave) return idx;
        idx = (idx + 1) % TAM;
    }
    return -1;
}

int main() {
    insertar(15);
    insertar(25);
    insertar(35);
    insertar(5);
    for (int i = 0; i < TAM; i++) {
        if (ocupado[i]) printf("[%d]: %d\\n", i, tabla[i]);
    }
    return 0;
}`,
    blanks: [
      { line: 8, hint: "return clave % TAM;" },
      { line: 12, hint: "while (ocupado[idx]) idx = (idx + 1) % TAM;" }
    ],
    expectedOutput: "[5]: 15\n[6]: 25\n[7]: 35\n[8]: 5",
    hints: [
      "hash: retorna clave % TAM",
      "Si ocupado[idx], avanza: idx = (idx + 1) % TAM",
      "Cuando encuentres posición libre, coloca el valor y marca ocupado"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 24,
    module: 2,
    title: "Tablas hash completas",
    icon: "fa-table",
    type: "write",
    xp: 35,
    theory: `<h3>Tabla hash con encadenamiento</h3>
<p>Cada posición del arreglo es una lista enlazada que almacena todas las claves que colisionan en ese índice.</p>
<pre>typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* tabla[TAM]; // arreglo de listas</pre>
<h3>Operaciones</h3>
<ul>
<li><code>insertar(clave)</code>: calcular hash, agregar al inicio de la lista en esa posición</li>
<li><code>buscar(clave)</code>: calcular hash, buscar en la lista</li>
<li><code>eliminar(clave)</code>: calcular hash, eliminar de la lista</li>
</ul>
<div class="theory-note">Complejidad promedio: O(1) para todas las operaciones. Peor caso: O(n) si todas colisionan.</div>`,
    instruction: "Implementa <strong>insertar</strong> e <strong>imprimir</strong> para una tabla hash con encadenamiento.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#define TAM 7

typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* tabla[TAM];

int hash(int clave) { return clave % TAM; }

void insertar(int clave) {
    // Calcular hash y agregar nodo al inicio de la lista

}

void imprimir() {
    // Imprimir cada posición y su lista

}

int main() {
    for (int i = 0; i < TAM; i++) tabla[i] = NULL;
    insertar(10);
    insertar(17);
    insertar(24);
    insertar(3);
    insertar(31);
    imprimir();
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>
#define TAM 7

typedef struct Nodo {
    int dato;
    struct Nodo* sig;
} Nodo;

Nodo* tabla[TAM];

int hash(int clave) { return clave % TAM; }

void insertar(int clave) {
    int idx = hash(clave);
    Nodo* nuevo = malloc(sizeof(Nodo));
    nuevo->dato = clave;
    nuevo->sig = tabla[idx];
    tabla[idx] = nuevo;
}

void imprimir() {
    for (int i = 0; i < TAM; i++) {
        printf("[%d]: ", i);
        Nodo* actual = tabla[i];
        while (actual != NULL) {
            printf("%d -> ", actual->dato);
            actual = actual->sig;
        }
        printf("NULL\\n");
    }
}

int main() {
    for (int i = 0; i < TAM; i++) tabla[i] = NULL;
    insertar(10);
    insertar(17);
    insertar(24);
    insertar(3);
    insertar(31);
    imprimir();
    return 0;
}`,
    blanks: [],
    expectedOutput: "[0]: 24 -> 17 -> 10 -> NULL\n[1]: NULL\n[2]: NULL\n[3]: 31 -> 3 -> NULL\n[4]: NULL\n[5]: NULL\n[6]: NULL",
    hints: [
      "insertar: idx = hash(clave), crear nodo, nuevo->sig = tabla[idx], tabla[idx] = nuevo",
      "imprimir: recorrer cada posición y su lista enlazada",
      "Recuerda inicializar tabla[i] = NULL para todas las posiciones"
    ],
    usesJSCPP: false,
    bugMode: null
  },

  // ============================================================
  // MÓDULO III: ESTRUCTURAS NO LINEALES
  // ============================================================
  {
    id: 25,
    module: 3,
    title: "Árboles binarios y recorridos",
    icon: "fa-sitemap",
    type: "write",
    xp: 35,
    theory: `<h3>Árbol binario</h3>
<p>Un nodo tiene hasta dos hijos: izquierdo y derecho.</p>
<pre>typedef struct Nodo {
    int dato;
    struct Nodo* izq;
    struct Nodo* der;
} Nodo;</pre>
<h3>Recorridos</h3>
<ul>
<li><strong>Inorden</strong> (izq, raíz, der): produce orden ascendente en BST</li>
<li><strong>Preorden</strong> (raíz, izq, der): útil para copiar el árbol</li>
<li><strong>Postorden</strong> (izq, der, raíz): útil para eliminar</li>
</ul>
<pre>inorden(nodo):
    si nodo != NULL:
        inorden(nodo->izq)
        visitar(nodo->dato)
        inorden(nodo->der)</pre>
<div class="theory-note">Inorden en un BST siempre da los elementos ordenados de menor a mayor.</div>`,
    instruction: "Implementa los tres recorridos (<strong>inorden, preorden, postorden</strong>) para un árbol binario.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* izq;
    struct Nodo* der;
} Nodo;

Nodo* crearNodo(int dato) {
    Nodo* n = malloc(sizeof(Nodo));
    n->dato = dato;
    n->izq = n->der = NULL;
    return n;
}

void inorden(Nodo* raiz) {
    // Izq - Raíz - Der

}

void preorden(Nodo* raiz) {
    // Raíz - Izq - Der

}

void postorden(Nodo* raiz) {
    // Izq - Der - Raíz

}

int main() {
    Nodo* raiz = crearNodo(4);
    raiz->izq = crearNodo(2);
    raiz->der = crearNodo(6);
    raiz->izq->izq = crearNodo(1);
    raiz->izq->der = crearNodo(3);

    printf("Inorden: ");
    inorden(raiz);
    printf("\\nPreorden: ");
    preorden(raiz);
    printf("\\nPostorden: ");
    postorden(raiz);
    printf("\\n");
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* izq;
    struct Nodo* der;
} Nodo;

Nodo* crearNodo(int dato) {
    Nodo* n = malloc(sizeof(Nodo));
    n->dato = dato;
    n->izq = n->der = NULL;
    return n;
}

void inorden(Nodo* raiz) {
    if (raiz != NULL) {
        inorden(raiz->izq);
        printf("%d ", raiz->dato);
        inorden(raiz->der);
    }
}

void preorden(Nodo* raiz) {
    if (raiz != NULL) {
        printf("%d ", raiz->dato);
        preorden(raiz->izq);
        preorden(raiz->der);
    }
}

void postorden(Nodo* raiz) {
    if (raiz != NULL) {
        postorden(raiz->izq);
        postorden(raiz->der);
        printf("%d ", raiz->dato);
    }
}

int main() {
    Nodo* raiz = crearNodo(4);
    raiz->izq = crearNodo(2);
    raiz->der = crearNodo(6);
    raiz->izq->izq = crearNodo(1);
    raiz->izq->der = crearNodo(3);

    printf("Inorden: ");
    inorden(raiz);
    printf("\\nPreorden: ");
    preorden(raiz);
    printf("\\nPostorden: ");
    postorden(raiz);
    printf("\\n");
    return 0;
}`,
    blanks: [],
    expectedOutput: "Inorden: 1 2 3 4 6 \nPreorden: 4 2 1 3 6 \nPostorden: 1 3 2 6 4 ",
    hints: [
      "Inorden: recursión izq, imprimir dato, recursión der",
      "Preorden: imprimir dato, recursión izq, recursión der",
      "Postorden: recursión izq, recursión der, imprimir dato"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 26,
    module: 3,
    title: "Árbol binario de búsqueda",
    icon: "fa-search-plus",
    type: "write",
    xp: 35,
    theory: `<h3>Árbol Binario de Búsqueda (BST)</h3>
<p>Un BST es un árbol binario donde:</p>
<ul>
<li>Todos los nodos a la <strong>izquierda</strong> son menores que la raíz</li>
<li>Todos los nodos a la <strong>derecha</strong> son mayores que la raíz</li>
<li>Cada subárbol también es un BST</li>
</ul>
<h3>Inserción</h3>
<pre>insertar(raiz, dato):
    si raiz es NULL: crear nodo
    si dato < raiz->dato: insertar en izquierda
    si dato > raiz->dato: insertar en derecha</pre>
<h3>Búsqueda</h3>
<pre>buscar(raiz, dato):
    si raiz es NULL o raiz->dato == dato: retornar
    si dato < raiz->dato: buscar en izquierda
    sino: buscar en derecha</pre>
<div class="theory-note">Complejidad promedio: O(log n). Peor caso (árbol degenerado): O(n).</div>`,
    instruction: "Implementa <strong>insertar</strong> y <strong>buscar</strong> en un BST.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* izq;
    struct Nodo* der;
} Nodo;

Nodo* crearNodo(int dato) {
    Nodo* n = malloc(sizeof(Nodo));
    n->dato = dato;
    n->izq = n->der = NULL;
    return n;
}

Nodo* insertar(Nodo* raiz, int dato) {
    // Insertar en BST

}

int buscar(Nodo* raiz, int dato) {
    // Buscar en BST, retornar 1 si existe, 0 si no

}

void inorden(Nodo* raiz) {
    if (raiz != NULL) {
        inorden(raiz->izq);
        printf("%d ", raiz->dato);
        inorden(raiz->der);
    }
}

int main() {
    Nodo* raiz = NULL;
    raiz = insertar(raiz, 50);
    insertar(raiz, 30);
    insertar(raiz, 70);
    insertar(raiz, 20);
    insertar(raiz, 40);
    printf("Inorden: ");
    inorden(raiz);
    printf("\\nBuscar 30: %d\\n", buscar(raiz, 30));
    printf("Buscar 60: %d\\n", buscar(raiz, 60));
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* izq;
    struct Nodo* der;
} Nodo;

Nodo* crearNodo(int dato) {
    Nodo* n = malloc(sizeof(Nodo));
    n->dato = dato;
    n->izq = n->der = NULL;
    return n;
}

Nodo* insertar(Nodo* raiz, int dato) {
    if (raiz == NULL) return crearNodo(dato);
    if (dato < raiz->dato)
        raiz->izq = insertar(raiz->izq, dato);
    else if (dato > raiz->dato)
        raiz->der = insertar(raiz->der, dato);
    return raiz;
}

int buscar(Nodo* raiz, int dato) {
    if (raiz == NULL) return 0;
    if (dato == raiz->dato) return 1;
    if (dato < raiz->dato) return buscar(raiz->izq, dato);
    return buscar(raiz->der, dato);
}

void inorden(Nodo* raiz) {
    if (raiz != NULL) {
        inorden(raiz->izq);
        printf("%d ", raiz->dato);
        inorden(raiz->der);
    }
}

int main() {
    Nodo* raiz = NULL;
    raiz = insertar(raiz, 50);
    raiz = insertar(raiz, 30);
    raiz = insertar(raiz, 70);
    raiz = insertar(raiz, 20);
    raiz = insertar(raiz, 40);
    printf("Inorden: ");
    inorden(raiz);
    printf("\\nBuscar 30: %d\\n", buscar(raiz, 30));
    printf("Buscar 60: %d\\n", buscar(raiz, 60));
    return 0;
}`,
    blanks: [],
    expectedOutput: "Inorden: 20 30 40 50 70 \nBuscar 30: 1\nBuscar 60: 0",
    hints: [
      "insertar: si raiz==NULL crear nodo; si menor ir izq; si mayor ir der",
      "insertar retorna la raíz del subárbol modificado",
      "buscar: si NULL retorna 0; si dato==raiz->dato retorna 1"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 27,
    module: 3,
    title: "Montículo (Heap)",
    icon: "fa-mountain",
    type: "fill",
    xp: 40,
    theory: `<h3>Montículo (Heap)</h3>
<p>Un min-heap es un árbol binario completo donde cada padre es menor o igual que sus hijos.</p>
<h3>Representación con arreglo</h3>
<pre>Padre de i:        (i - 1) / 2
Hijo izquierdo:     2*i + 1
Hijo derecho:       2*i + 2</pre>
<h3>Inserción</h3>
<p>1. Agregar al final del arreglo</p>
<p>2. "Subir" (heapify-up) intercambiando con el padre mientras sea menor</p>
<h3>Extracción del mínimo</h3>
<p>1. Guardar raíz (mínimo)</p>
<p>2. Mover último elemento a la raíz</p>
<p>3. "Bajar" (heapify-down) intercambiando con el hijo menor</p>
<div class="theory-note">Todas las operaciones son O(log n). El heap es la base de la cola de prioridad eficiente.</div>`,
    instruction: "Completa <strong>insertar</strong> (heapify-up) y <strong>extraerMin</strong> (heapify-down) en un min-heap.",
    starterCode: `#include <stdio.h>
#define MAX 100

int heap[MAX];
int tam = 0;

void intercambiar(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void insertar(int val) {
    heap[tam] = val;
    int i = tam;
    tam++;
    // Heapify-up: intercambiar con padre mientras heap[i] < heap[padre]

}

int extraerMin() {
    if (tam <= 0) return -1;
    int min = heap[0];
    heap[0] = heap[tam - 1];
    tam--;
    // Heapify-down: intercambiar con hijo menor mientras sea necesario

    return min;
}

int main() {
    insertar(10);
    insertar(5);
    insertar(20);
    insertar(3);
    printf("Mínimo: %d\\n", extraerMin());
    printf("Mínimo: %d\\n", extraerMin());
    return 0;
}`,
    solution: `#include <stdio.h>
#define MAX 100

int heap[MAX];
int tam = 0;

void intercambiar(int *a, int *b) { int t = *a; *a = *b; *b = t; }

void insertar(int val) {
    heap[tam] = val;
    int i = tam;
    tam++;
    while (i > 0 && heap[i] < heap[(i - 1) / 2]) {
        intercambiar(&heap[i], &heap[(i - 1) / 2]);
        i = (i - 1) / 2;
    }
}

int extraerMin() {
    if (tam <= 0) return -1;
    int min = heap[0];
    heap[0] = heap[tam - 1];
    tam--;
    int i = 0;
    while (1) {
        int menor = i;
        int izq = 2 * i + 1;
        int der = 2 * i + 2;
        if (izq < tam && heap[izq] < heap[menor]) menor = izq;
        if (der < tam && heap[der] < heap[menor]) menor = der;
        if (menor != i) {
            intercambiar(&heap[i], &heap[menor]);
            i = menor;
        } else break;
    }
    return min;
}

int main() {
    insertar(10);
    insertar(5);
    insertar(20);
    insertar(3);
    printf("Mínimo: %d\\n", extraerMin());
    printf("Mínimo: %d\\n", extraerMin());
    return 0;
}`,
    blanks: [
      { line: 13, hint: "while (i > 0 && heap[i] < heap[(i-1)/2]) { intercambiar; i = (i-1)/2; }" },
      { line: 24, hint: "Encontrar hijo menor y intercambiar, avanzar i" }
    ],
    expectedOutput: "Mínimo: 3\nMínimo: 5",
    hints: [
      "Heapify-up: mientras heap[i] < heap[padre], intercambiar y subir",
      "Padre = (i-1)/2",
      "Heapify-down: encontrar el menor de los dos hijos y bajar"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 28,
    module: 3,
    title: "Más árboles y complejidad",
    icon: "fa-balance-scale",
    type: "quiz",
    xp: 25,
    theory: `<h3>Árboles rojo-negro</h3>
<p>Un árbol rojo-negro es un BST auto-balanceado que garantiza O(log n) para todas las operaciones.</p>
<h3>Propiedades</h3>
<ul>
<li>Cada nodo es rojo o negro</li>
<li>La raíz es negra</li>
<li>Las hojas (NULL) son negras</li>
<li>Un nodo rojo no puede tener hijos rojos</li>
<li>Todo camino de raíz a hojas pasa por el mismo número de nodos negros</li>
</ul>
<h3>Comparación de complejidades</h3>
<table style="width:100%;border-collapse:collapse">
<tr style="border-bottom:1px solid var(--border)">
<th style="text-align:left;padding:8px">Estructura</th>
<th style="padding:8px">Búsqueda</th>
<th style="padding:8px">Inserción</th>
<th style="padding:8px">Eliminación</th>
</tr>
<tr style="border-bottom:1px solid var(--border)">
<td style="padding:8px">Lista</td><td style="padding:8px;text-align:center">O(n)</td><td style="padding:8px;text-align:center">O(1)</td><td style="padding:8px;text-align:center">O(n)</td>
</tr>
<tr style="border-bottom:1px solid var(--border)">
<td style="padding:8px">BST (balanceado)</td><td style="padding:8px;text-align:center">O(log n)</td><td style="padding:8px;text-align:center">O(log n)</td><td style="padding:8px;text-align:center">O(log n)</td>
</tr>
<tr style="border-bottom:1px solid var(--border)">
<td style="padding:8px">BST (degenerado)</td><td style="padding:8px;text-align:center">O(n)</td><td style="padding:8px;text-align:center">O(n)</td><td style="padding:8px;text-align:center">O(n)</td>
</tr>
<tr style="border-bottom:1px solid var(--border)">
<td style="padding:8px">Hash table</td><td style="padding:8px;text-align:center">O(1)*</td><td style="padding:8px;text-align:center">O(1)*</td><td style="padding:8px;text-align:center">O(1)*</td>
</tr>
<tr>
<td style="padding:8px">Heap</td><td style="padding:8px;text-align:center">O(n)</td><td style="padding:8px;text-align:center">O(log n)</td><td style="padding:8px;text-align:center">O(log n)</td>
</tr>
</table>
<p style="font-size:0.85rem;color:var(--text-muted)">*Promedio. Peor caso O(n).</p>`,
    instruction: "Responde las preguntas sobre árboles y complejidad.",
    quiz: [
      {
        question: "¿Cuál es la complejidad de buscar en un BST balanceado?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1
      },
      {
        question: "¿Qué propiedad garantiza un árbol rojo-negro?",
        options: ["Nunca tiene nodos rojos", "Todo camino tiene igual número de nodos negros", "Todos los nodos son negros", "La raíz es roja"],
        correct: 1
      },
      {
        question: "¿Cuándo un BST degenera a O(n)?",
        options: ["Cuando tiene muchos nodos", "Cuando está balanceado", "Cuando los datos se insertan ordenados", "Nunca"],
        correct: 2
      },
      {
        question: "¿Para qué sirve un heap?",
        options: ["Búsqueda eficiente", "Cola de prioridad eficiente", "Almacenamiento secuencial", "Recorrido inorden"],
        correct: 1
      }
    ],
    expectedOutput: null,
    hints: [
      "BST balanceado = O(log n)",
      "Rojo-negro: caminos negros equilibrados",
      "BST degenera cuando se insertan datos ordenados"
    ],
    usesJSCPP: false,
    bugMode: {
      description: "Este código de BST tiene un bug en la función de eliminar. Encuéntralo y corrígelo.",
      buggedCode: `#include <stdio.h>
#include <stdlib.h>

typedef struct Nodo {
    int dato;
    struct Nodo* izq;
    struct Nodo* der;
} Nodo;

Nodo* crearNodo(int dato) {
    Nodo* n = malloc(sizeof(Nodo));
    n->dato = dato;
    n->izq = n->der = NULL;
    return n;
}

Nodo* minimo(Nodo* raiz) {
    while (raiz && raiz->izq != NULL)
        raiz = raiz->izq;
    return raiz;
}

Nodo* eliminar(Nodo* raiz, int dato) {
    if (raiz == NULL) return NULL;
    if (dato < raiz->dato) raiz->izq = eliminar(raiz->izq, dato);
    else if (dato > raiz->dato) raiz->der = eliminar(raiz->der, dato);
    else {
        if (raiz->izq == NULL) {
            Nodo* temp = raiz->der;
            free(raiz);
            return temp;
        }
        if (raiz->der == NULL) {
            Nodo* temp = raiz->izq;
            free(raiz);
            return temp;
        }
        Nodo* temp = minimo(raiz->der);
        raiz->dato = temp->dato;
        raiz->der = eliminar(raiz->der, temp->dato);
    }
    return raiz;
}

void inorden(Nodo* raiz) {
    if (raiz != NULL) {
        inorden(raiz->izq);
        printf("%d ", raiz->dato);
        inorden(raiz->der);
    }
}

int main() {
    Nodo* raiz = crearNodo(50);
    raiz->izq = crearNodo(30);
    raiz->der = crearNodo(70);
    raiz->izq->izq = crearNodo(20);
    raiz->izq->der = crearNodo(40);
    raiz->der->izq = crearNodo(60);
    raiz->der->der = crearNodo(80);
    raiz = eliminar(raiz, 20);
    inorden(raiz);
    return 0;
}`,
      expectedOutput: "Este código funciona bien — es una trampa para enseñar que no todos los códigos tienen bugs obvios"
    }
  },
  {
    id: 29,
    module: 3,
    title: "Representaciones de grafos",
    icon: "fa-project-diagram",
    type: "fill",
    xp: 30,
    theory: `<h3>Grafo</h3>
<p>Un grafo es un conjunto de vértices (nodos) y aristas (conexiones entre nodos).</p>
<h3>Matriz de adyacencia</h3>
<pre>int grafo[V][V] = {0};
grafo[0][1] = 1; // arista de 0 a 1</pre>
<p>Ventaja: verificar si existe arista en O(1). Desventaja: usa O(V²) memoria.</p>
<h3>Lista de adyacencia</h3>
<pre>typedef struct Nodo {
    int vertice;
    struct Nodo* sig;
} Nodo;
Nodo* lista[V];</pre>
<p>Ventaja: usa O(V+E) memoria. Desventaja: verificar arista es O(grado).</p>
<div class="theory-note">Para grafos dispersos (pocas aristas), la lista de adyacencia es más eficiente. Para grafos densos, la matriz.</div>`,
    instruction: "Completa la <strong>impresión de la matriz de adyacencia</strong> y la <strong>creación de aristas</strong>.",
    starterCode: `#include <stdio.h>
#define V 5

int grafo[V][V] = {0};

void agregarArista(int orig, int dest) {
    // Agregar arista bidireccional en la matriz

}

void imprimirMatriz() {
    printf("  ");
    for (int i = 0; i < V; i++) printf("%d ", i);
    printf("\\n");
    for (int i = 0; i < V; i++) {
        printf("%d ", i);
        // Imprimir fila i de la matriz

    }
}

int main() {
    agregarArista(0, 1);
    agregarArista(0, 4);
    agregarArista(1, 2);
    agregarArista(1, 3);
    agregarArista(1, 4);
    agregarArista(2, 3);
    agregarArista(3, 4);
    imprimirMatriz();
    return 0;
}`,
    solution: `#include <stdio.h>
#define V 5

int grafo[V][V] = {0};

void agregarArista(int orig, int dest) {
    grafo[orig][dest] = 1;
    grafo[dest][orig] = 1;
}

void imprimirMatriz() {
    printf("  ");
    for (int i = 0; i < V; i++) printf("%d ", i);
    printf("\\n");
    for (int i = 0; i < V; i++) {
        printf("%d ", i);
        for (int j = 0; j < V; j++) {
            printf("%d ", grafo[i][j]);
        }
        printf("\\n");
    }
}

int main() {
    agregarArista(0, 1);
    agregarArista(0, 4);
    agregarArista(1, 2);
    agregarArista(1, 3);
    agregarArista(1, 4);
    agregarArista(2, 3);
    agregarArista(3, 4);
    imprimirMatriz();
    return 0;
}`,
    blanks: [
      { line: 8, hint: "grafo[orig][dest] = 1; grafo[dest][orig] = 1;" },
      { line: 17, hint: "for (int j = 0; j < V; j++) printf(\"%d \", grafo[i][j]);" }
    ],
    expectedOutput: "  0 1 2 3 4 \n0 0 1 0 0 1 \n1 1 0 1 1 1 \n2 0 1 0 1 0 \n3 0 1 1 0 1 \n4 1 1 0 1 0 ",
    hints: [
      "agregarArista: marcar grafo[orig][dest] = 1 y grafo[dest][orig] = 1",
      "imprimirMatriz: recorrer filas y columnas con doble for",
      "Cada fila imprime V valores: grafo[i][0], grafo[i][1], ..."
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 30,
    module: 3,
    title: "BFS y DFS",
    icon: "fa-route",
    type: "write",
    xp: 35,
    theory: `<h3>Búsqueda en Amplitud (BFS)</h3>
<p>Explora todos los vecinos de un nodo antes de pasar al siguiente nivel. Usa una <strong>cola</strong>.</p>
<pre>BFS(inicio):
    cola.encolar(inicio)
    marcar inicio como visitado
    mientras cola no vacía:
        nodo = cola.desencolar()
        procesar nodo
        para cada vecino no visitado:
            marcar visitado
            cola.encolar(vecino)</pre>
<h3>Búsqueda en Profundidad (DFS)</h3>
<p>Explora lo más profundo posible antes de retroceder. Usa una <strong>pila</strong> (o recursión).</p>
<pre>DFS(nodo):
    si nodo no visitado:
        marcar visitado
        procesar nodo
        para cada vecino:
            DFS(vecino)</pre>
<div class="theory-note">BFS encuentra el camino más corto (en aristas). DFS es útil para detectar ciclos y recorridos completos.</div>`,
    instruction: "Implementa <strong>BFS</strong> y <strong>DFS</strong> para un grafo con matriz de adyacencia.",
    starterCode: `#include <stdio.h>
#define V 5

int grafo[V][V] = {0};
int visitado[V] = {0};

void agregarArista(int orig, int dest) {
    grafo[orig][dest] = 1;
    grafo[dest][orig] = 1;
}

void BFS(int inicio) {
    int cola[V], frente = 0, final = 0;
    // Implementar BFS usando la cola

}

void DFS(int nodo) {
    // Implementar DFS recursivo

}

int main() {
    agregarArista(0, 1);
    agregarArista(0, 4);
    agregarArista(1, 2);
    agregarArista(1, 3);
    agregarArista(2, 3);
    agregarArista(3, 4);

    printf("BFS desde 0: ");
    BFS(0);

    for (int i = 0; i < V; i++) visitado[i] = 0;
    printf("\\nDFS desde 0: ");
    DFS(0);
    printf("\\n");
    return 0;
}`,
    solution: `#include <stdio.h>
#define V 5

int grafo[V][V] = {0};
int visitado[V] = {0};

void agregarArista(int orig, int dest) {
    grafo[orig][dest] = 1;
    grafo[dest][orig] = 1;
}

void BFS(int inicio) {
    int cola[V], frente = 0, final = 0;
    visitado[inicio] = 1;
    cola[final++] = inicio;
    while (frente < final) {
        int nodo = cola[frente++];
        printf("%d ", nodo);
        for (int i = 0; i < V; i++) {
            if (grafo[nodo][i] && !visitado[i]) {
                visitado[i] = 1;
                cola[final++] = i;
            }
        }
    }
}

void DFS(int nodo) {
    visitado[nodo] = 1;
    printf("%d ", nodo);
    for (int i = 0; i < V; i++) {
        if (grafo[nodo][i] && !visitado[i]) {
            DFS(i);
        }
    }
}

int main() {
    agregarArista(0, 1);
    agregarArista(0, 4);
    agregarArista(1, 2);
    agregarArista(1, 3);
    agregarArista(2, 3);
    agregarArista(3, 4);

    printf("BFS desde 0: ");
    BFS(0);

    for (int i = 0; i < V; i++) visitado[i] = 0;
    printf("\\nDFS desde 0: ");
    DFS(0);
    printf("\\n");
    return 0;
}`,
    blanks: [],
    expectedOutput: "BFS desde 0: 0 1 4 2 3 \nDFS desde 0: 0 1 2 3 4 ",
    hints: [
      "BFS: encola inicio, marca visitado, desencola y recorre vecinos",
      "DFS: marca visitado, imprime nodo, recorre recursivamente vecinos",
      "En ambos, solo procesar vecinos donde grafo[nodo][i]==1 y !visitado[i]"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 31,
    module: 3,
    title: "Camino más corto (Dijkstra)",
    icon: "fa-map-marked-alt",
    type: "write",
    xp: 40,
    theory: `<h3>Algoritmo de Dijkstra</h3>
<p>Encuentra el camino más corto desde un nodo origen a todos los demás en un grafo con pesos no negativos.</p>
<h3>Pasos</h3>
<ol>
<li>Inicializar distancias: origen=0, demás=∞</li>
<li>Marcar todos como no visitados</li>
<li>Mientras existan nodos no visitados:
   <ul>
   <li>Seleccionar el nodo no visitado con menor distancia</li>
   <li>Para cada vecino, calcular distancia temporal = distancia[nodo] + peso(arista)</li>
   <li>Si distancia temporal < distancia[vecino], actualizar</li>
   </ul>
</li>
<li>Marcar nodo como visitado</li>
</ol>
<div class="theory-note">Complejidad con implementación simple: O(V²). Con cola de prioridad (heap): O((V+E) log V).</div>`,
    instruction: "Implementa el <strong>algoritmo de Dijkstra</strong> para un grafo con pesos.",
    starterCode: `#include <stdio.h>
#define V 5
#define INF 99999

int minDistancia(int dist[], int visitado[]) {
    // Encontrar el vértice no visitado con menor distancia

}

void dijkstra(int grafo[V][V], int origen) {
    int dist[V];
    int visitado[V] = {0};

    // Inicializar distancias

    // Dijkstra: iterar V-1 veces

    // Imprimir resultado
    printf("Vértice\\tDistancia desde %d\\n", origen);
    for (int i = 0; i < V; i++) {
        printf("%d\\t%d\\n", i, dist[i]);
    }
}

int main() {
    int grafo[V][V] = {
        {0, 10, 0, 0, 5},
        {0, 0, 1, 0, 2},
        {0, 0, 0, 4, 0},
        {0, 0, 0, 0, 0},
        {0, 3, 9, 2, 0}
    };
    dijkstra(grafo, 0);
    return 0;
}`,
    solution: `#include <stdio.h>
#define V 5
#define INF 99999

int minDistancia(int dist[], int visitado[]) {
    int min = INF, min_idx = -1;
    for (int v = 0; v < V; v++) {
        if (!visitado[v] && dist[v] <= min) {
            min = dist[v];
            min_idx = v;
        }
    }
    return min_idx;
}

void dijkstra(int grafo[V][V], int origen) {
    int dist[V];
    int visitado[V] = {0};

    for (int i = 0; i < V; i++) dist[i] = INF;
    dist[origen] = 0;

    for (int count = 0; count < V - 1; count++) {
        int u = minDistancia(dist, visitado);
        if (u == -1) break;
        visitado[u] = 1;
        for (int v = 0; v < V; v++) {
            if (!visitado[v] && grafo[u][v] && dist[u] != INF &&
                dist[u] + grafo[u][v] < dist[v]) {
                dist[v] = dist[u] + grafo[u][v];
            }
        }
    }

    printf("Vértice\\tDistancia desde %d\\n", origen);
    for (int i = 0; i < V; i++) {
        printf("%d\\t%d\\n", i, dist[i]);
    }
}

int main() {
    int grafo[V][V] = {
        {0, 10, 0, 0, 5},
        {0, 0, 1, 0, 2},
        {0, 0, 0, 4, 0},
        {0, 0, 0, 0, 0},
        {0, 3, 9, 2, 0}
    };
    dijkstra(grafo, 0);
    return 0;
}`,
    blanks: [],
    expectedOutput: "Vértice\tDistancia desde 0\n0\t0\n1\t8\n2\t9\n3\t7\n4\t5",
    hints: [
      "Inicializa todas las distancias a INF excepto el origen (0)",
      "En cada iteración, selecciona el nodo no visitado con menor distancia",
      "Relaja las aristas: si dist[u]+peso < dist[v], actualiza dist[v]"
    ],
    usesJSCPP: false,
    bugMode: null
  },
  {
    id: 32,
    module: 3,
    title: "Proyecto integrador",
    icon: "fa-graduation-cap",
    type: "write",
    xp: 60,
    theory: `<h3>Proyecto Final: Sistema de gestión de alumnos</h3>
<p>Vas a crear un programa completo que combina lo aprendido en todo el curso:</p>
<ul>
<li><strong>Árbol BST</strong> para búsqueda rápida por matrícula</li>
<li><strong>Tabla hash</strong> para acceso directo por nombre</li>
<li><strong>Lista enlazada</strong> para iterar en orden de inserción</li>
<li><strong>Ordenamiento</strong> para mostrar alumnos ordenados por promedio</li>
<li><strong>Menú interactivo</strong> con opciones CRUD</li>
</ul>
<h3>Requisitos</h3>
<pre>struct Alumno {
    int matricula;
    char nombre[50];
    float promedio;
};

Opciones del menú:
1. Agregar alumno
2. Buscar por matrícula (BST)
3. Mostrar todos
4. Ordenar por promedio (merge sort)
5. Salir</pre>
<div class="theory-note">Este proyecto integra estructuras de datos lineales y no lineales. ¡Demuestra que dominas el curso!</div>`,
    instruction: "Crea un <strong>sistema de gestión de alumnos</strong> con menú.Debe agregar, buscar por matrícula (BST), listar y ordenar por promedio.",
    starterCode: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Alumno {
    int matricula;
    char nombre[50];
    float promedio;
    struct Alumno* izq;
    struct Alumno* der;
} Alumno;

Alumno* raiz = NULL;

Alumno* crearAlumno(int mat, char* nom, float prom) {
    Alumno* n = malloc(sizeof(Alumno));
    n->matricula = mat;
    strcpy(n->nombre, nom);
    n->promedio = prom;
    n->izq = n->der = NULL;
    return n;
}

Alumno* insertar(Alumno* raiz, Alumno* nuevo) {
    if (raiz == NULL) return nuevo;
    if (nuevo->matricula < raiz->matricula)
        raiz->izq = insertar(raiz->izq, nuevo);
    else
        raiz->der = insertar(raiz->der, nuevo);
    return raiz;
}

Alumno* buscar(Alumno* raiz, int mat) {
    if (raiz == NULL || raiz->matricula == mat) return raiz;
    if (mat < raiz->matricula) return buscar(raiz->izq, mat);
    return buscar(raiz->der, mat);
}

void inorden(Alumno* raiz) {
    if (raiz != NULL) {
        inorden(raiz->izq);
        printf("%d - %s - %.1f\\n", raiz->matricula, raiz->nombre, raiz->promedio);
        inorden(raiz->der);
    }
}

// Colección para ordenar
Alumno* alumnos[100];
int numAlumnos = 0;

void recolectar(Alumno* raiz) {
    if (raiz != NULL) {
        recolectar(raiz->izq);
        alumnos[numAlumnos++] = raiz;
        recolectar(raiz->der);
    }
}

void mergeSort(Alumno* arr[], int l, int r) {
    // Implementa merge sort por promedio

}

void agregarAlumno() {
    int mat; char nom[50]; float prom;
    printf("Matrícula: "); scanf("%d", &mat);
    printf("Nombre: "); scanf("%s", nom);
    printf("Promedio: "); scanf("%f", &prom);
    if (buscar(raiz, mat) != NULL) {
        printf("Matrícula ya existe\\n");
        return;
    }
    Alumno* nuevo = crearAlumno(mat, nom, prom);
    raiz = insertar(raiz, nuevo);
    printf("Alumno agregado\\n");
}

void menu() {
    int op;
    do {
        printf("\\n1. Agregar\\n2. Buscar por matrícula\\n3. Mostrar todos\\n4. Ordenar por promedio\\n5. Salir\\nOpción: ");
        scanf("%d", &op);
        switch(op) {
            case 1: agregarAlumno(); break;
            case 2: {
                int mat;
                printf("Matrícula: "); scanf("%d", &mat);
                Alumno* a = buscar(raiz, mat);
                if (a) printf("%d - %s - %.1f\\n", a->matricula, a->nombre, a->promedio);
                else printf("No encontrado\\n");
                break;
            }
            case 3: inorden(raiz); break;
            case 4: {
                numAlumnos = 0;
                recolectar(raiz);
                mergeSort(alumnos, 0, numAlumnos - 1);
                for (int i = 0; i < numAlumnos; i++)
                    printf("%.1f - %s (%d)\\n", alumnos[i]->promedio, alumnos[i]->nombre, alumnos[i]->matricula);
                break;
            }
        }
    } while (op != 5);
}

int main() {
    raiz = insertar(raiz, crearAlumno(1001, "Ana", 9.5));
    raiz = insertar(raiz, crearAlumno(1002, "Bob", 8.3));
    raiz = insertar(raiz, crearAlumno(1003, "Carla", 7.8));
    raiz = insertar(raiz, crearAlumno(1004, "Diego", 9.1));
    raiz = insertar(raiz, crearAlumno(1005, "Elena", 8.9));
    printf("Alumnos (por matrícula):\\n");
    inorden(raiz);
    printf("\\nAlumnos (por promedio):\\n");
    numAlumnos = 0;
    recolectar(raiz);
    mergeSort(alumnos, 0, numAlumnos - 1);
    for (int i = 0; i < numAlumnos; i++)
        printf("%.1f - %s (%d)\\n", alumnos[i]->promedio, alumnos[i]->nombre, alumnos[i]->matricula);
    return 0;
}`,
    solution: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Alumno {
    int matricula;
    char nombre[50];
    float promedio;
    struct Alumno* izq;
    struct Alumno* der;
} Alumno;

Alumno* raiz = NULL;

Alumno* crearAlumno(int mat, char* nom, float prom) {
    Alumno* n = malloc(sizeof(Alumno));
    n->matricula = mat;
    strcpy(n->nombre, nom);
    n->promedio = prom;
    n->izq = n->der = NULL;
    return n;
}

Alumno* insertar(Alumno* raiz, Alumno* nuevo) {
    if (raiz == NULL) return nuevo;
    if (nuevo->matricula < raiz->matricula)
        raiz->izq = insertar(raiz->izq, nuevo);
    else
        raiz->der = insertar(raiz->der, nuevo);
    return raiz;
}

Alumno* buscar(Alumno* raiz, int mat) {
    if (raiz == NULL || raiz->matricula == mat) return raiz;
    if (mat < raiz->matricula) return buscar(raiz->izq, mat);
    return buscar(raiz->der, mat);
}

void inorden(Alumno* raiz) {
    if (raiz != NULL) {
        inorden(raiz->izq);
        printf("%d - %s - %.1f\\n", raiz->matricula, raiz->nombre, raiz->promedio);
        inorden(raiz->der);
    }
}

Alumno* alumnos[100];
int numAlumnos = 0;

void recolectar(Alumno* raiz) {
    if (raiz != NULL) {
        recolectar(raiz->izq);
        alumnos[numAlumnos++] = raiz;
        recolectar(raiz->der);
    }
}

void merge(Alumno* arr[], int l, int m, int r) {
    int n1 = m - l + 1, n2 = r - m;
    Alumno* L[n1], *R[n2];
    for (int i = 0; i < n1; i++) L[i] = arr[l + i];
    for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
    int i = 0, j = 0, k = l;
    while (i < n1 && j < n2) {
        if (L[i]->promedio <= R[j]->promedio) arr[k++] = L[i++];
        else arr[k++] = R[j++];
    }
    while (i < n1) arr[k++] = L[i++];
    while (j < n2) arr[k++] = R[j++];
}

void mergeSort(Alumno* arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    raiz = insertar(raiz, crearAlumno(1001, "Ana", 9.5));
    raiz = insertar(raiz, crearAlumno(1002, "Bob", 8.3));
    raiz = insertar(raiz, crearAlumno(1003, "Carla", 7.8));
    raiz = insertar(raiz, crearAlumno(1004, "Diego", 9.1));
    raiz = insertar(raiz, crearAlumno(1005, "Elena", 8.9));
    printf("Alumnos (por matricula):\\n");
    inorden(raiz);
    printf("\\nAlumnos (por promedio):\\n");
    numAlumnos = 0;
    recolectar(raiz);
    mergeSort(alumnos, 0, numAlumnos - 1);
    for (int i = 0; i < numAlumnos; i++)
        printf("%.1f - %s (%d)\\n", alumnos[i]->promedio, alumnos[i]->nome, alumnos[i]->matricula);
    return 0;
}`,
    blanks: [],
    expectedOutput: "Alumnos (por matrícula):\n1001 - Ana - 9.5\n1002 - Bob - 8.3\n1003 - Carla - 7.8\n1004 - Diego - 9.1\n1005 - Elena - 8.9\n\nAlumnos (por promedio):\n7.8 - Carla (1003)\n8.3 - Bob (1002)\n8.9 - Elena (1005)\n9.1 - Diego (1004)\n9.5 - Ana (1001)",
    hints: [
      "Para merge sort, primero implementa la función merge",
      "merge compara L[i]->promedio <= R[j]->promedio",
      "recolectar llena el arreglo con inorden del BST"
    ],
    usesJSCPP: false,
    bugMode: null
  }
];

const MODULES = [
  { id: 0, name: "C Básico", icon: "fa-code", levels: [1,2,3,4,5,6] },
  { id: 1, name: "Algoritmos Fundamentales", icon: "fa-brain", levels: [7,8,9,10,11,12,13,14,15,16] },
  { id: 2, name: "Estructuras Lineales", icon: "fa-link", levels: [17,18,19,20,21,22,23,24] },
  { id: 3, name: "Estructuras No Lineales", icon: "fa-project-diagram", levels: [25,26,27,28,29,30,31,32] }
];

const ACHIEVEMENTS = [
  { id: "primer-programa", name: "Primer programa", desc: "Completar nivel 1", icon: "🌟", condition: (g) => g.isLevelCompleted(1) },
  { id: "fundamentos-c", name: "Fundamentos de C", desc: "Completar módulo 0", icon: "⚡", condition: (g) => g.isModuleCompleted(0) },
  { id: "algoritmico", name: "Algorítmico", desc: "Completar módulo I", icon: "🧮", condition: (g) => g.isModuleCompleted(1) },
  { id: "maestro-lineal", name: "Maestro lineal", desc: "Completar módulo II", icon: "🔗", condition: (g) => g.isModuleCompleted(2) },
  { id: "maestro-no-lineal", name: "Maestro no lineal", desc: "Completar módulo III", icon: "🌳", condition: (g) => g.isModuleCompleted(3) },
  { id: "maestro-ipn", name: "Maestro IPN", desc: "Completar los 32 niveles", icon: "👑", condition: (g) => g.isAllCompleted() },
  { id: "ordenado", name: "Ordenado", desc: "Completar los 4 algoritmos de ordenamiento", icon: "📊", condition: (g) => [10,11,12,13].every(id => g.isLevelCompleted(id)) },
  { id: "buscador", name: "Buscador", desc: "Completar los 3 de búsqueda", icon: "🔍", condition: (g) => [14,15,16].every(id => g.isLevelCompleted(id)) },
  { id: "apilador", name: "Apilador", desc: "Completar los 2 de pila", icon: "🥞", condition: (g) => [17,18].every(id => g.isLevelCompleted(id)) },
  { id: "colero", name: "Colero", desc: "Completar los 2 de cola", icon: "🎫", condition: (g) => [19,20].every(id => g.isLevelCompleted(id)) },
  { id: "enlazador", name: "Enlazador", desc: "Completar los 2 de listas", icon: "🔗", condition: (g) => [21,22].every(id => g.isLevelCompleted(id)) },
  { id: "hasher", name: "Hasher", desc: "Completar los 2 de tablas hash", icon: "#️⃣", condition: (g) => [23,24].every(id => g.isLevelCompleted(id)) },
  { id: "explorador-arboles", name: "Explorador de árboles", desc: "Completar los 4 de árboles", icon: "🌲", condition: (g) => [25,26,27,28].every(id => g.isLevelCompleted(id)) },
  { id: "grafologo", name: "Grafólogo", desc: "Completar los 4 de grafos", icon: "🗺️", condition: (g) => [29,30,31,32].every(id => g.isLevelCompleted(id)) },
  { id: "perfeccionista", name: "Perfeccionista", desc: "3 estrellas en todos los niveles", icon: "💎", condition: (g) => g.allThreeStars() },
  { id: "racha-fuego", name: "Racha de fuego", desc: "7 días consecutivos", icon: "🔥", condition: (g) => g.getStreak() >= 7 },
  { id: "racha-legendaria", name: "Racha legendaria", desc: "30 días consecutivos", icon: "🏆", condition: (g) => g.getStreak() >= 30 },
  { id: "cazador-bugs", name: "Cazador de bugs", desc: "Completar 5 modos 'encuentra el bug'", icon: "🐛", condition: (g) => g.getBugsCompleted() >= 5 }
];