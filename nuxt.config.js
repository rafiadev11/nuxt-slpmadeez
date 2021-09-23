export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: "SlpMadeEZ",
        htmlAttrs: {
            lang: "en"
        },
        meta: [
            { charset: "utf-8" },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1"
            },
            { hid: "description", name: "description", content: "" },
            { name: "format-detection", content: "telephone=no" }
        ],
        link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
        script: []
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [{ hid: "coreCSS", src: "@/assets/scss/main.scss", lang: "scss" }],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        { src: "~plugins/v-calendar.js", ssr: false },
        { src: "~plugins/service.js" },
        {
            src: "~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js",
            mode: "client"
        }
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: ["@nuxtjs/composition-api/module"],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        "@nuxt/image",
        "@nuxtjs/axios",
        "@nuxtjs/auth-next",
        "@nuxtjs/toast"
    ],

    toast: {
        position: "bottom-right"
        // register: [
        //     // Register custom toasts
        //     {
        //         name: "my-error",
        //         message: "Oops...Something went wrong",
        //         options: {
        //             type: "error"
        //         }
        //     }
        // ]
    },

    // Axios Config
    axios: {
        baseURL: "http://localhost:8001/",
        credentials: true
    },

    auth: {
        strategies: {
            laravelSanctum: {
                provider: "laravel/sanctum",
                url: "http://localhost:8001",
                endpoints: {
                    login: {
                        url: "/login"
                    },
                    logout: {
                        url: "/logout"
                    },
                    user: {
                        url: "/api/user"
                    }
                },
                user: {
                    property: false
                }
            }
        },
        redirect: {
            login: "/login",
            home: "/dashboard"
        }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    router: {
        middleware: ["auth"]
    },

    loading: { color: "#15a362" },
    generate: {
        // choose to suit your project
        interval: 2000
    }
};
