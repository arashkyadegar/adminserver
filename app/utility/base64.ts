export class Base64 {
  encodeBuffer = (buffer) => buffer.toString("base64");
  encodeString = (string) => this.encodeBuffer(Buffer.from(string));
  encodeData = (data) => this.encodeString(JSON.stringify(data));
  encode = (data) => {
    if (Buffer.isBuffer(data)) return this.encodeBuffer(data);
    if (typeof data === "string") return this.encodeString(data);
    return this.encodeData(data);
  };
  decode = (string) => {
    const decoded = Buffer.from(string, "base64").toString();
    try {
      return JSON.parse(decoded);
    } catch (e) {
      return decoded;
    }
  };
}

