import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const encodedDirectory = path.join(projectRoot, ".assets", "site");
const files = await readdir(encodedDirectory);

await Promise.all(
  files
    .filter((file) => file.endsWith(".b64"))
    .map(async (file) => {
      const relativePath = file.slice(0, -4).replaceAll("__", path.sep);
      const destination = path.join(projectRoot, relativePath);
      const encoded = await readFile(path.join(encodedDirectory, file), "utf8");

      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, Buffer.from(encoded.trim(), "base64"));
    }),
);