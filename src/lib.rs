#![deny(clippy::all)]

use image::Luma;
use napi::bindgen_prelude::Buffer;
use napi_derive::napi;
use qrcode::QrCode;

fn create_qrcode(data: &[u8]) -> Vec<u8> {
  let code = QrCode::new(data).unwrap();
  let image = code.render::<Luma<u8>>().build();

  let mut png_data = Vec::new();
  let mut cursor = std::io::Cursor::new(&mut png_data);
  image
    .write_to(&mut cursor, image::ImageFormat::Png)
    .unwrap();
  png_data
}

#[napi(js_name = "generateQRCode")]
pub fn generate_qr_code(data: String) -> Buffer {
  let png_data = create_qrcode(data.as_bytes());
  Buffer::from(png_data)
}
