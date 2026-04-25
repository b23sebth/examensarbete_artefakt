mod utils;

use wasm_bindgen::prelude::*;
use web_sys;
use serde::Deserialize;
use serde_json::from_str;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[derive(Deserialize, Debug)]
struct TestData {
    headings: Vec<String>,
    sentences: Vec<String>,
    #[serde(rename = "tableData")]
    table_data: Vec<String>,
    #[serde(rename = "imgSrc")]
    img_src: Vec<String>,
}

#[wasm_bindgen]
pub fn run() {
    let json = include_str!("../json_files/data_100_elements.json");
    let test_data: TestData = from_str(&json).unwrap();

    let window = web_sys::window().unwrap();
    let document = window.document().unwrap();
    let body = document.body().unwrap();

    web_sys::console::log_1(&format!("Headings: {:?}", test_data.headings).into());
    let h1 = document.create_element("h1").unwrap();
    h1.set_text_content(Some(&test_data.headings[3]));

    let button1 = document.create_element("button").unwrap();
    button1.set_text_content(Some("1+ element"));

    body.append_child(&h1).unwrap();
    body.append_child(&button1).unwrap();

}

