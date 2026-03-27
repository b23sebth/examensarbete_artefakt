mod utils;

use wasm_bindgen::prelude::*;
use web_sys;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn main() {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let body = document.body().unwrap();

    let h1 = document.create_element("h1").unwrap();
    h1.set_text_content(Some("It works"));
    body.append_child(&h1).unwrap();
}

