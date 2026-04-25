mod utils;

use wasm_bindgen::prelude::*;
use web_sys;
use serde::Deserialize;
use serde_wasm_bindgen;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[derive(Deserialize)]
struct TestData {
    headings: Vec<String>,
    sentences: Vec<String>,
    #[serde(rename = "tableData")]
    table_data: Vec<String>,
    #[serde(rename = "imgSrc")]
    img_src: Vec<String>,
}

#[wasm_bindgen]
pub fn init_json(json: JsValue) {
    let test_data: TestData = serde_wasm_bindgen::from_value(json).unwrap();
    web_sys::console::log_1(&format!("Headings: {:?}", test_data.headings).into());
}

#[wasm_bindgen]
pub fn main() {
    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let body = document.body().unwrap();

    let h1 = document.create_element("h1").unwrap();
    h1.set_text_content(Some("Create Elements"));

    let button1 = document.create_element("button").unwrap();
    button1.set_text_content(Some("1+ element"));

    body.append_child(&h1).unwrap();
    body.append_child(&button1).unwrap();
}

