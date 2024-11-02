const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
export class ImageProcessor {
  constructor() { }
  async resize(file: any): Promise<string> {
    await sharp(file.path)
      .resize(500)
      .jpeg({ quality: 40 })
      .toFile(
        path.resolve(file.destination, 're-' + file.filename)
      )
    sharp.cache(false);
    fs.unlinkSync(file.path);
    const result = 're-' + file.filename;
    return result;
  }
}