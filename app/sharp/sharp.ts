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


  async compositeImages(baseImage: string, extraImage: string, finalImage: string) {
    try {
      const filepath = path.resolve(process.env.UPLOAD_PATH);
      const result_fileName = `mix-${finalImage}.png`
      const result = filepath + '/' + result_fileName;
      await sharp(filepath + '/' + baseImage)
        .composite([
          {
            input: filepath + '/' + extraImage,
            top: 10,
            left: 10,
          },
        ])
        .toFile(result);
      return result_fileName;
    } catch (error) {
      console.log(error);
    }
  }


  async resizeImageByName(fileName: string): Promise<string> {
    const _path = path.resolve(process.env.UPLOAD_PATH);
    const result_fileName = 're-' + fileName

    await sharp(_path + '/' + fileName)
      .resize(500)
      .jpeg({ quality: 40 })
      .toFile(
        path.resolve(_path, result_fileName)
      )
    sharp.cache(false);
    fs.unlinkSync(_path + '/' + fileName);
    const result = result_fileName;
    return result;
  }


  async addTextOnImage(fileName: string) {
    const _path = path.resolve(process.env.UPLOAD_PATH);
    const result_fileName = `${fileName}.png`
    try {
      const width = 100;
      const height = 20;
      const text = "فروش بزرگ پایان فصل";

      const svgImage = `
      <svg width="${width}" height="${height}">
        <style>
        .title { fill: #001; font-size: 12px; font-weight: bold;}
        </style>
        <text x="10" y="10" text-anchor="right" class="title">${text}</text>
      </svg>
      `;
      const svgBuffer = Buffer.from(svgImage);
      const image = await sharp(svgBuffer).toFile(_path + '/' + result_fileName);
      return result_fileName;
    } catch (error) {
      console.log(error);
      return "";
    }
  }
}