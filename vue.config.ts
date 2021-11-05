import { InjectManifest } from "workbox-webpack-plugin";

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
    workboxOptions: {
      exclude: ["_redirects"],
    },
  },
  transpileDependencies: ["vuetify"],
};

/**
 * ServiceWorker
 */
if (process.env.NODE_ENV === "production") {
  config["configureWebpack"] = {
    plugins: [
      new InjectManifest({
        swSrc: "./service-worker.js",
      }),
    ],
  };
}

module.exports = config;
