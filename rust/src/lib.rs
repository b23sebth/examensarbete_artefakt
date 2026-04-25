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
    let fragment = document.create_document_fragment();
    let cards = document.get_element_by_id("cards").unwrap();

    web_sys::console::log_1(&format!("Headings: {:?}", test_data.headings).into());
    web_sys::console::log_1(&format!("Sentences: {:?}", test_data.sentences).into());
    web_sys::console::log_1(&format!("TableData: {:?}", test_data.table_data).into());
    web_sys::console::log_1(&format!("ImgSrc: {:?}", test_data.img_src).into());

    //This should be the same as the number of elements in the JSON
    let mut index: usize = 0;
    for i in 1..=10 {
        let newDiv = document.create_element("div").unwrap();
        newDiv.set_class_name("content");

        let h1 = document.create_element("h1").unwrap();
        h1.set_text_content(Some(&test_data.headings[index]));

        newDiv.append_child(&h1).unwrap();

        fragment.append_child(&newDiv).unwrap();

        index += 1;
    }

    cards.append_child(&fragment).unwrap();
}

