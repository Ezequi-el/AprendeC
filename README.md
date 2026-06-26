<div align="center">
  <h1>&lt;/&gt; Aprende C</h1>
  <p><strong>Juego interactivo para aprender C, Algoritmos y Estructuras de Datos</strong></p>
  <p>32 niveles — 4 módulos — 18 logros — estilo Duolingo</p>

  <p>
    <a href="#-características">Características</a> •
    <a href="#-módulos-y-niveles">Módulos</a> •
    <a href="#-cómo-funciona">Cómo funciona</a> •
    <a href="#-ejecutar-localmente">Ejecutar local</a> •
    <a href="#-desplegar-en-vercel">Desplegar</a> •
    <a href="#-supabase">Supabase</a>
  </p>
</div>

---

## Características

- **32 niveles progresivos** — Desde `printf("Hola Mundo")` hasta Dijkstra y árboles AVL
- **Compilador C real en el navegador** — Usa [browsercc](https://github.com/nicedoc/browsercc) (Clang vía WASM). Sin servidor, sin API key, sin límites de peticiones
- **Intérprete ligero integrado** — Para los primeros niveles (tipos básicos, loops, strings) usa un intérprete C simple inline (~100KB). Compilación instantánea
- **Dos motores de compilación**:
  | Niveles | Motor | Descripción |
  |---------|-------|-------------|
  | 1–5, 7–9 | JSCPP (intérprete) | Ligero, sin descarga, instantáneo |
  | 6, 10–32 | browsercc (Clang WASM) | Compilación real con GCC, soporta punteros, structs, malloc |
- **Editor de código** con CodeMirror 5 (resaltado de sintaxis, tema Dracula)
- **Sistema de progreso** con XP, estrellas (1–3), racha diaria, barra de nivel
- **18 logros** con notificaciones estilo toast
- **Nubes de conocimiento** — Temas con teoría + ejercicio práctico
- **Modo "Encuentra el bug"** — Código con errores que el estudiante debe corregir
- **Práctica libre** — Sandbox para escribir cualquier código C
- **Persistencia local** (LocalStorage) + **sincronización en la nube** (Supabase, opcional)
- **Tema oscuro/claro**
- **Interfaz 100% en español**
- **Confetti** al completar niveles (canvas-confetti)

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5 + CSS3 + JavaScript (vanilla, sin frameworks) |
| Editor | CodeMirror 5 |
| Compilador (avanzado) | [browsercc](https://github.com/nicedoc/browsercc) (Clang → WASM) |
| WASI | [@bjorn3/browser_wasi_shim](https://github.com/bjorn3/browser_wasi_shim) |
| Compilador (básico) | JSCPP (intérprete C inline, ~100KB) |
| Nube | Supabase (Auth + PostgreSQL + RLS) |
| Build (dev) | Vite 6 |
| Despliegue | Vercel (static site, sin servidor) |
| CDN | jsDelivr (importmap para paquetes npm) |
| Iconos | Font Awesome 6 |
| Confeti | canvas-confetti |

---

## Cómo funciona

### Sin build step en producción

El proyecto se despliega como sitio estático. Las dependencias npm (`browsercc`, `wasi_shim`, `supabase-js`) se resuelven desde CDN mediante un **importmap** en el HTML:

```html
<script type="importmap">
{
  "imports": {
    "browsercc": "https://cdn.jsdelivr.net/npm/browsercc@0.1.1/dist/index.js",
    "@bjorn3/browser_wasi_shim": "https://cdn.jsdelivr.net/npm/@bjorn3/browser_wasi_shim@0.4.2/+esm",
    "@supabase/supabase-js": "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm"
  }
}
</script>
```

El archivo `src/main.js` (módulo ES) importa estos paquetes y los expone globalmente para los scripts clásicos.

### Flujo de compilación

```
Editor (CodeMirror) → Compiler.compile(code, levelId)
                           │
                    ┌──────┴──────┐
                    ▼              ▼
             usesJSCPP?       ¡No! → compileWASM()
                 │                     │
                 ▼                     ▼
          JSCPP.run(code)    browsercc.compile(code)
                 │                     │
                 ▼                     ▼
          stdout + exit       WASM binary → WASI.start()
                                         │
                                         ▼
                                    stdout + stderr
```

---

## Módulos y niveles

### Módulo 0 — C Básico (6 niveles)
| # | Tema | XP | Tipo |
|---|------|----|------|
| 1 | Hola Mundo | 10 | fill |
| 2 | Variables y tipos | 10 | fill |
| 3 | Decisiones y ciclos | 15 | fill |
| 4 | Funciones y arreglos | 15 | write |
| 5 | Strings | 15 | fill |
| 6 | Punteros y memoria | 20 | fill |

### Módulo I — Algoritmos Fundamentales (10 niveles)
| # | Tema | XP | Tipo |
|---|------|----|------|
| 7 | ¿Qué es un algoritmo? | 10 | quiz |
| 8 | Pseudocódigo y TDA | 15 | fill |
| 9 | Notación Big O | 15 | quiz |
| 10 | Ordenamiento por inserción | 25 | write |
| 11 | Ordenamiento por selección | 25 | write |
| 12 | Burbuja | 25 | write |
| 13 | Merge sort | 35 | write |
| 14 | Búsqueda secuencial y binaria | 25 | write |
| 15 | Búsqueda indexada | 20 | fill |
| 16 | Vuelta atrás (backtracking) | 40 | write |

### Módulo II — Estructuras Lineales (8 niveles)
| # | Tema | XP | Tipo |
|---|------|----|------|
| 17 | Pila estática | 25 | fill |
| 18 | Pila dinámica | 30 | write |
| 19 | Cola estática y dinámica | 25 | fill |
| 20 | Cola de prioridad | 30 | write |
| 21 | Lista simplemente enlazada | 30 | write |
| 22 | Lista doblemente enlazada | 30 | fill |
| 23 | Función hash y colisiones | 30 | fill |
| 24 | Tablas hash completas | 35 | write |

### Módulo III — Estructuras No Lineales (8 niveles)
| # | Tema | XP | Tipo |
|---|------|----|------|
| 25 | Árboles binarios y recorridos | 35 | write |
| 26 | Árbol binario de búsqueda | 35 | write |
| 27 | Montículo (Heap) | 40 | fill |
| 28 | Más árboles y complejidad | 25 | quiz |
| 29 | Representaciones de grafos | 30 | fill |
| 30 | BFS y DFS | 35 | write |
| 31 | Camino más corto (Dijkstra) | 40 | write |
| 32 | Proyecto integrador | 60 | write |

---

## Logros

| Logro | Requisito |
|-------|-----------|
| 🌟 Primer programa | Completar nivel 1 |
| ⚡ Fundamentos de C | Completar módulo 0 |
| 🧮 Algorítmico | Completar módulo I |
| 🔗 Maestro lineal | Completar módulo II |
| 🌳 Maestro no lineal | Completar módulo III |
| 👑 Maestro IPN | Completar los 32 niveles |
| 📊 Ordenado | Completar los 4 algoritmos de ordenamiento |
| 🔍 Buscador | Completar los 3 de búsqueda |
| 🥞 Apilador | Completar los 2 de pila |
| 🎫 Colero | Completar los 2 de cola |
| 🔗 Enlazador | Completar los 2 de listas |
| #️⃣ Hasher | Completar los 2 de tablas hash |
| 🌲 Explorador de árboles | Completar los 4 de árboles |
| 🗺️ Grafólogo | Completar los 4 de grafos |
| 💎 Perfeccionista | 3 estrellas en todos los niveles |
| 🔥 Racha de fuego | 7 días consecutivos |
| 🏆 Racha legendaria | 30 días consecutivos |
| 🐛 Cazador de bugs | Completar 5 modos "encuentra el bug" |

---

## Ejecutar localmente

### Opción 1: Servidor estático (sin build)

```bash
# Desde el directorio raíz del proyecto:
python3 -m http.server 8765
# Abrir: http://localhost:8765
```

### Opción 2: Vite (con HMR)

```bash
# Instalar dependencias (solo para dev)
pnpm install

# Servidor de desarrollo con hot reload
pnpm dev
# Abrir: http://localhost:5173

# Build de producción
pnpm build

# Previsualizar build
pnpm preview
```

---

## Desplegar en Vercel

1. Subir el repositorio a GitHub
2. Ir a [vercel.com](https://vercel.com) → Importar repositorio
3. Framework: **Other** (static site)
4. Build command: `pnpm build` (opcional, sirve igual sin build)
5. Output directory: `dist` (si se usa build) o dejar vacío
6. Desplegar

No se necesita configuración especial. Vercel sirve `index.html`, el importmap resuelve las dependencias desde CDN.

---

## Supabase

La sincronización en la nube es **opcional**. Sin configurar, el juego funciona completamente offline con LocalStorage.

### Configuración

1. Crear proyecto en [supabase.com](https://supabase.com)
2. Ir a **SQL Editor** y ejecutar `supabase-migration.sql`
3. Copiar **Project URL** y **anon public key** desde Settings → API
4. Configurar en producción: definir las constantes en el HTML

```html
<script>
window.SUPABASE_URL = 'https://tu-proyecto.supabase.co';
window.SUPABASE_ANON_KEY = 'tu-anon-key';
</script>
```

Para desarrollo local, crear `.env` (copiar de `.env.example`):

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key
```

### Cómo funciona

- Usuarios anónimos: el progreso se guarda solo en LocalStorage
- Usuarios autenticados (magic link por email): el progreso se sincroniza con Supabase
- Merge: al iniciar sesión, se comparan XP totales. Gana el que tenga más XP (local vs cloud)
- Los datos se estructuran como `{ user_id, game_date, data: { levels, xp, streak, achievements } }`

---

## Estructura del proyecto

```
├── index.html              # Punto de entrada (importmap + scripts)
├── css/
│   └── styles.css          # Estilos completos (1150+ líneas)
├── js/
│   ├── levels.js           # Definición de los 32 niveles (3174 líneas)
│   ├── game.js             # Lógica del juego (progreso, XP, estrellas)
│   ├── compiler.js         # Compilador (JSCPP + WASM + Judge0)
│   ├── app.js              # Controlador principal (navegación, auth)
│   ├── ui.js               # Interfaz de usuario (render, eventos)
│   └── jscpp-shim.js       # Intérprete C simple + shim JSCPP
├── src/
│   └── main.js             # Módulo ES entry (browsercc + Supabase)
├── supabase-migration.sql  # Schema de base de datos
├── package.json            # Dependencias npm (solo dev / build)
├── vite.config.js          # Configuración de Vite
├── vercel.json             # Configuración de despliegue
└── .env.example            # Ejemplo de variables de entorno
```

---

## Desarrollo

```bash
# Clonar
git clone git@github.com:Ezequi-el/AprendeC.git
cd AprendeC

# Instalar dependencias
pnpm install

# Servidor de desarrollo
pnpm dev

# Build de producción
pnpm build
```

---

## Licencia

MIT
