// Use #[neon::export] to export Rust functions as JavaScript functions.
// See more at: https://docs.rs/neon/latest/neon/attr.export.html

use image::Luma;
use neon::{
    object::Object,
    prelude::{Context, FunctionContext, ModuleContext},
    result::{JsResult, NeonResult},
    types::{JsObject, JsString, buffer::*},
};
use qrcode::QrCode;
use std::borrow::BorrowMut;

/*
 * let url: &String = matches.get_one("url").expect("URL requirida");
 * let code = QrCode::new(url.as_bytes()).unwrap();
 * let image = code.render::<Luma<u8>>().build();
 * */

fn create_qrcode(mut cx: FunctionContext) -> JsResult<JsObject> {
    let data = cx.argument::<JsString>(0)?.value(&mut cx);
    let data = data.as_bytes();

    let code = QrCode::new(data).unwrap();
    let image = code.render::<Luma<u8>>().build();

    // When writing the image to a format, we need to use a cursor that implements Seek
    // Using std::io::Cursor to wrap Vec<u8> which provides the Seek trait
    let mut png_data = Vec::new();
    let mut cursor = std::io::Cursor::new(&mut png_data);
    image
        .write_to(&mut cursor, image::ImageFormat::Png)
        .unwrap();

    let obj = cx.empty_object();
    let mut buffer = cx.buffer(cursor.get_mut().len() as usize)?;
    {
        let slice = buffer.borrow_mut();
        slice.as_mut_slice(&mut cx).copy_from_slice(&png_data);
    }

    obj.set(&mut cx, "qrcode", buffer)?;
    Ok(obj)
}

// Use #[neon::main] to add additional behavior at module loading time.
// See more at: https://docs.rs/neon/latest/neon/attr.main.html

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("createQrcode", create_qrcode)?;
    Ok(())
}
