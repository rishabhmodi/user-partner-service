import crypto from "crypto";
import bcrypt from "bcrypt";

class CoreUtil {
  static _generateUUID() {
    return crypto.randomUUID();
  }

  static async _generateHash(keyword) {
    return await bcrypt.hash(keyword, 10);
  }

  static async _compareHashes(hash1, hash2) {
    return await bcrypt.compare(hash1, hash2);
  }
}

export default CoreUtil;
