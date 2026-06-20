import { noPhysicalDirection } from "./rules/noPhysicalDirection.js";
import { noRawColor } from "./rules/noRawColor.js";

const averoPlugin = {
  meta: { name: "eslint-plugin-avero", version: "0.0.0" },
  rules: {
    "no-physical-direction": noPhysicalDirection,
    "no-raw-color": noRawColor,
  },
};

export default averoPlugin;
