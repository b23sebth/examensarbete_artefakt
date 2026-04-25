mod utils;

use wasm_bindgen::prelude::*;
use web_sys;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    fn getRandomWord() -> String;
    fn getRandomSentence(amount: &str) -> String;
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn main() -> String {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let body = document.body().unwrap();

    let h1 = document.create_element("h1").unwrap();
    h1.set_text_content(Some("Create Elements"));

    let button1 = document.create_element("button").unwrap();
    button1.set_text_content(Some("1+ element"));

    body.append_child(&h1).unwrap();
    body.append_child(&button1).unwrap();

    let test = getRandomWord();
    let test2 = getRandomSentence("1");
    return test2;

}

