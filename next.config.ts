export default {
  turbopack: {
    rules: {
      "*.component.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};
