#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const ignorePatterns = [
  "node_modules",
  ".next",
  ".git",
  ".vercel",
  "coverage",
  "out",
  "dist",
  "logs",
  ".cache",
  "build",
  ".turbo",
];

function shouldIgnore(name) {
  return ignorePatterns.some((pattern) => name.includes(pattern));
}

function generateTree(dir, prefix = "", maxDepth = 3, currentDepth = 0) {
  if (currentDepth >= maxDepth) return "";

  let result = "";
  const items = fs.readdirSync(dir).filter((item) => !shouldIgnore(item));

  items.forEach((item, index) => {
    const isLast = index === items.length - 1;
    const itemPath = path.join(dir, item);
    const stats = fs.statSync(itemPath);
    const connector = isLast ? "└── " : "├── ";
    const nextPrefix = prefix + (isLast ? "    " : "│   ");

    result += prefix + connector + item;
    if (stats.isDirectory()) {
      result += "/\n";
      if (currentDepth < maxDepth - 1) {
        result += generateTree(
          itemPath,
          nextPrefix,
          maxDepth,
          currentDepth + 1
        );
      }
    } else {
      result += "\n";
    }
  });

  return result;
}

function main() {
  const rootDir = process.cwd();
  const tree = generateTree(rootDir);

  const output = `${rootDir}\n${tree}`;

  // Write to filetree.txt
  fs.writeFileSync("filetree.txt", output);
  console.log("File tree generated in filetree.txt");
  console.log(output);
}

if (require.main === module) {
  main();
}
