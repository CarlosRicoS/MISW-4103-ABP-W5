const inquirer = require("inquirer");
const spawn = require("child_process").spawn;
const TreePrompt = require("inquirer-tree-prompt");

inquirer.registerPrompt("tree", TreePrompt);

inquirer.registerPrompt("tree", TreePrompt);

inquirer
  .prompt([
    {
      type: "list",
      name: "exploratoryTests",
      message:
        "Seleccione los sets de pruebas exploratorias que se van a ejecutar, (Default: Ripper)",
      default: "ripper",
      choices: [
        {
          name: "Ripper",
          value: "ripper",
        },
        {
          name: "No ejecutar",
          value: "none",
        },
      ],
    },
    {
      type: "list",
      name: "e2eTests",
      message:
        "Seleccione los sets de pruebas E2E que se van a ejecutar, (Default: Playwright)",
      default: "playwright",
      choices: [
        {
          name: "Playwright",
          value: "playwright",
        },
        {
          name: "Kraken",
          value: "kraken",
        },
        {
          name: "No ejecutar",
          value: "none",
        },
      ],
    },
    {
      type: "list",
      name: "vrtTests",
      message:
        "Seleccione los sets de pruebas VRT que se van a ejecutar, (Default: Playwright + Pixelmatch)",
      default: "playwright",
      choices: [
        {
          name: "Playwright + Pixelmatch",
          value: "playwright",
        },
        {
          name: "Kraken + Backstop.js",
          value: "kraken",
        },
        {
          name: "No ejecutar",
          value: "none",
        },
      ],
    },
    {
      type: "list",
      name: "dataTests",
      message:
        "Seleccione el tipo de datos para las pruebas que se van a ejecutar, (Default: Todos)",
      default: "all",
      choices: [
        {
          name: "A-priori",
          value: "priori",
        },
        {
          name: "(Pseudo) aleatorios",
          value: "psd-rand",
        },
        {
          name: "Aleatorios",
          value: "rand",
        },
        {
          name: "Todos",
          value: "all",
        },
        {
          name: "No ejecutar",
          value: "none",
        },
      ],
    },
  ])
  .then(async (answers) => {
    console.log(answers);
    Object.keys(answers).map(async (key) => {
      const scriptName = await scriptMap[key](answers[key]);
      if (scriptName) {
        const child = await spawn("npm", ["run", scriptName], {
          stdio: "inherit",
          shell: true,
        });
      }
    });
  });

const scriptMap = {
  exploratoryTests: async (value) => {
    switch (value) {
      case "monkey":
        break;
      case "ripper":
        return "ripper";
      default:
        return undefined;
    }
  },
  e2eTests: async (value) => {
    switch (value) {
      case "playwright":
        return "playwright-run";
      case "kraken":
        return "kraken-run";
      default:
        return undefined;
    }
  },
  vrtTests: async (value) => {
    switch (value) {
      case "playwright":
        return "playwright-vrt";
      case "kraken":
        return "kraken-vrt";
      default:
        return undefined;
    }
  },
  dataTests: async (value) => {
    switch (value) {
      case "priori":
        return "playwright-priori";
      case "psd-rand":
        return "playwright-ps-rand";
      case "rand":
        return "playwright-rand";
      case "all":
        return "playwright-all";
      default:
        return undefined;
    }
  },
};
