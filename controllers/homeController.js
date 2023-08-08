const path = require("path");
const fs = require("fs");

let tagName = "";
let tagClass = "";

const replaceArr = (value, htmlContent, data) => {
  const tag = new RegExp(`}\\(([^)]+)\\)`, "gi");
  // }(tag)
  const match = htmlContent.match(tag);
  if (match) {
    tagName = match[0].slice(2, -1);
    if (tagName.includes(".")) {
      tagClass = tagName.slice(tagName.lastIndexOf(".") + 1);
      tagName = tagName.slice(0, tagName.lastIndexOf("."));
    }
  }
  const content = data[value]?.map((content, i) => {
    return `<${tagName} class="${tagClass}" id="${
      (tagClass || tagName) + i
    }">${content}</${tagName}>`;
  });
  data[value] = content.join(""); // [tag, tag, tag, tag]
};

const renderObj = (value, data, type) => {
  switch (type) {
    case "contact":
      {
        const content = Object.keys(data[value]).map((key) => {
          return `<p><span class="list-subkey">${key}</span><span class="list-attr">${data[value][key]}</span></p>`;
        });
        data[value] = content.join("");
      }
      break;

    case "profiles":
      {
        const content = Object.keys(data[value]).map((key) => {
          return `<p class='array-attr'><a href='${data[value][key]}' target='_blank'>${key}</a></p>`;
        });
        data[value] = content.join("");
      }
      break;

    default:
      {
        const content = Object.keys(data[value]).map((key) => {
          return `<p><span class="list-subkey">${key}</span><span class="list-attr">${data[value][key]}</span></p>`;
        });
        data[value] = content.join("");
      }
      break;
  }
};

const replace = (value, htmlContent, data) => {
  const regex = new RegExp(`{${value}}`, "gi");
  // {value} => data[value]
  if (Array.isArray(data[value])) {
    replaceArr(value, htmlContent, data);
  }
  if (typeof data[value] === "object") {
    if (value === "contact") {
      renderObj(value, data, "contact");
    } else if (value === "profiles") {
      renderObj(value, data, "profiles");
    } else {
      renderObj(value, data, "content");
    }
  }
  return htmlContent?.replaceAll(regex, data[value]);
};

const htmlController = (res, pathName, data) => {
  const pathView = path.join("views/" + pathName);
  let htmlContent = fs.readFileSync(pathView, { encoding: "utf-8" });
  Object.keys(data).forEach((value) => {
    htmlContent = replace(value, htmlContent, data);
  });
  while (htmlContent.includes(`(${tagName}.${tagClass})`)) {
    htmlContent = htmlContent.replace(`(${tagName}.${tagClass})`, "");
  }
  res.end(htmlContent);
};

const assetsController = (res, pathDir, pathname) => {
  let data;
  if (pathname.includes(".ico")) {
    res.writeHead(200, { "Content-Type": "image/x-icon;" });
    data = fs.readFileSync(path.join(__dirname, pathDir + pathname));
  } else if (pathname.includes(".css")) {
    res.writeHead(200, { "Content-Type": "text/css" });
    data = fs.readFileSync(path.join(__dirname, pathDir + pathname), {
      encoding: "utf-8",
    });
  } else if (pathname.includes(".js")) {
    res.writeHead(200, { "Content-Type": "text/javascript" });
    data = fs.readFileSync(path.join(__dirname, pathDir + pathname), {
      encoding: "utf-8",
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    data = fs.readFileSync(path.join(__dirname, pathDir + pathname), {
      encoding: "utf-8",
    });
  }
  res.end(data);
};
module.exports = { htmlController, assetsController };
