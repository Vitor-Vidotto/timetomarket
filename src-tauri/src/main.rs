
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::sync::{Arc, Mutex};
use tauri::{Manager, Window};
mod scripts; // Importa o módulo scripts
use scripts::{set_window_size::set_window_size, set_fullscreen::set_fullscreen}; // Importa list_files_in_directory corretamente

// Estrutura para informações dos arquivos
#[derive(serde::Serialize)]
struct FileInfo {
    name: String,
    size: u64,
}

// Criamos uma variável estática para controlar se o close_splashscreen foi executado
lazy_static::lazy_static! {
    static ref SPLASHSCREEN_CLOSED: Arc<Mutex<bool>> = Arc::new(Mutex::new(false));
}

#[tauri::command]
async fn close_splashscreen(window: Window) {
    // Verifica se o comando já foi executado
    let mut closed = SPLASHSCREEN_CLOSED.lock().unwrap();
    if *closed {
        return; // Se já foi fechado, não faz nada
    }
    // Caso contrário, fecha a splashscreen
    let splashscreen = window
        .get_webview_window("splashscreen")
        .expect("Não foi possível encontrar a janela de splashscreen");

    splashscreen.close().unwrap(); // Fecha a splashscreen

    // Exibe a janela principal (timetomarket)
    let timetomarket = window
        .get_webview_window("timetomarket")
        .expect("Não foi possível encontrar a janela principal");

    timetomarket.show().unwrap(); // Torna a janela principal visível

    // Marca a splashscreen como fechada
    *closed = true;
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![
            close_splashscreen,
            set_window_size,
            set_fullscreen,  // Usa a função importada do módulo
        ])
        .run(tauri::generate_context!())
        .expect("Erro ao rodar o app");
}
