import fs from "fs";
import path from "path";
import * as yaml from "js-yaml";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let swaggerSpec = null;

try {
  const swaggerPath = path.join(__dirname, "../docs/openapi.yaml");
  if (fs.existsSync(swaggerPath)) {
    const yamlLoader = yaml.load || yaml.default?.load;
    swaggerSpec = yamlLoader(fs.readFileSync(swaggerPath, "utf8"));
  }
} catch (error) {
  console.warn("Notice: OpenAPI docs fallback enabled:", error.message);
}

export default swaggerSpec;
