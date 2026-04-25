mod utils;

use wasm_bindgen::prelude::*;
use web_sys::{ HtmlTableElement, HtmlTableRowElement };
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

        let p = document.create_element("p").unwrap();
        p.set_text_content(Some(&test_data.sentences[index]));

        let table_element = document.create_element("table").unwrap();
        let table: HtmlTableElement = table_element.dyn_into().unwrap();
        let number_of_columns = 4;
        let thead = table.create_t_head();
        let tbody = table.create_t_body();

        let tr_element = document.create_element("tr").unwrap();
        let tr: HtmlTableRowElement = tr_element.dyn_into().unwrap();

        for j in 0..number_of_columns {
            let td = tr.insert_cell().unwrap();
            let th = document.create_element("th").unwrap();

            th.set_text_content(Some(&test_data.table_data[index]));
            td.replace_with_with_node_1(&th).unwrap();

            thead.append_child(&tr).unwrap();
        }

        for k in 0..10 {
            let tr_body_element = document.create_element("tr").unwrap();
            let tr_body: HtmlTableRowElement = tr_body_element.dyn_into().unwrap();

            for l in 0..number_of_columns {

            let td_body = tr_body.insert_cell().unwrap();
            td_body.set_text_content(Some(&test_data.table_data[index]));
            tr_body.append_child(&td_body).unwrap();
            }

            tbody.append_child(&tr_body);
        }

        let img = document.create_element("img").unwrap();
        let src = &test_data.img_src[index];
        img.set_attribute("src", src);

        newDiv.append_child(&h1).unwrap();
        newDiv.append_child(&p).unwrap();
        newDiv.append_child(&img).unwrap();
        newDiv.append_child(&table).unwrap();

        fragment.append_child(&newDiv).unwrap();

        index += 1;
    }

    cards.append_child(&fragment).unwrap();
}

