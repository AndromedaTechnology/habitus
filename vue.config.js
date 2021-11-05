const config = {
  pwa: {
    name: "Habitus",
    themeColor: "#42b983",
    iconPaths: {
      favicon16: "img/icons/favicon-16x16.png",
      favicon32: "img/icons/favicon-32x32.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/msapplication-icon-144x144.png",
    },
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      exclude: [/\.map$/, /_redirects/],
    },
  },
  transpileDependencies: ["vuetify"],
};

module.exports = config;
