mod utils;

use wasm_bindgen::prelude::*;
use maud::html;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn get_element() -> String {
    let markup = html! {
        p { "This is a paragraph!" }
    };
    return markup.into_string();
}

