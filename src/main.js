import { compile as wasmCompile } from 'browsercc';
import { WASI, File, OpenFile, ConsoleStdout } from '@bjorn3/browser_wasi_shim';
import { createClient } from '@supabase/supabase-js';

window.__wasm = {
  compile: wasmCompile,
  WASI: WASI,
  File: File,
  OpenFile: OpenFile,
  ConsoleStdout: ConsoleStdout
};

var supabaseUrl = window.SUPABASE_URL;
var supabaseAnonKey = window.SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseAnonKey) {
  window.__supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: true, autoRefreshToken: true }
  });
}
