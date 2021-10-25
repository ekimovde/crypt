export default {
  head: {
    title: "crypt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        as: "style",
        rel: "stylesheet preload prefetch",
        href: "/fonts/fonts.css",
      },
    ],
  },

  css: ["~/assets/global.styl", "boxicons/css/boxicons.min.css"],

  plugins: [{ src: "~/plugins/notifications.js", ssr: false }],

  styleResources: {
    stylus: ["~/assets/*.styl", "~/assets/vars/*.styl"],
  },

  components: true,

  buildModules: ["@nuxt/typescript-build"],

  modules: ["@nuxtjs/axios", "@nuxtjs/style-resources"],

  axios: {},

  build: {},
};
