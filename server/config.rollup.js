import path from "path"

import alias from "@rollup/plugin-alias"

export default {
  input: "server/index.js",
  plugins: [
    alias({
      entries: [
        {
          find: "#src",
          replacement: path.dirname(new URL(import.meta.url).pathname),
        },
      ],
    }),
  ],
}
