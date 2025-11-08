/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require("fs");
const path = require("path");

const blogsDir = path.join(process.cwd(), "src", "content", "blogs");
const metadataPath = path.join(process.cwd(), "src", "content", "blog-metadata.json");

function extractFrontmatter(content) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split("\n");

  lines.forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      let value = valueParts.join(":").trim();

      // Remove aspas se existirem
      value = value.replace(/^['"](.*)['"]$/, "$1");

      // Converte arrays (como tags)
      if (value.startsWith("[") && value.endsWith("]")) {
        try {
          value = JSON.parse(value);
        } catch {
          // Se não for JSON válido, mantém como string
        }
      }

      frontmatter[key.trim()] = value;
    }
  });

  return frontmatter;
}

function generateMetadata() {
  const files = fs.readdirSync(blogsDir).filter((file) => file.endsWith(".mdx"));
  const posts = [];

  files.forEach((file) => {
    const content = fs.readFileSync(path.join(blogsDir, file), "utf8");
    const frontmatter = extractFrontmatter(content);

    if (frontmatter) {
      posts.push({
        slug: file.replace(".mdx", ""),
        ...frontmatter,
      });
    }
  });

  fs.writeFileSync(metadataPath, JSON.stringify({ posts }, null, 2));
  console.log("✅ Metadados do blog gerados com sucesso!");
}

generateMetadata();
