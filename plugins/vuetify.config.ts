import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import {defineNuxtPlugin} from "#app";
import 'vuetify/styles'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import {VBtn} from "vuetify/components";


export default defineNuxtPlugin((nuxtApp) => {

    const vuetify = createVuetify({
        components,
        directives,
        icons: {
            defaultSet: 'mdi',
            aliases,
            sets: {
                mdi,
            },
        },
        theme: {
            defaultTheme: 'CustomTheme',
            themes: {
                CustomTheme: {
                    dark: true,
                    colors:{
                        primary: '#ffc300',     // Botones, acciones principales
                        secondary: '#003566',   // Acciones secundarias o destacados
                        accent: '#ffd60a',      // Pequeños detalles/acentos
                        background: '#000814',  // Fondo principal
                        surface: '#001d3d',     // Superficies elevadas (tarjetas, diálogos)
                        error: '#6a040f',       // Rojo para errores (opcional)
                        info: '#48cae4',        // Azul para info (opcional)
                        success: '#006400',     // Verde para éxito (opcional)
                        warning: '#ff8800'      // Naranja para advertencias (opcional)000814
                    }
                }
            }
        },

        aliases: {
            VBtnSecondary: VBtn,
        },
        defaults: {
            VBtn: {
                color: 'primary',
                variant: 'tonal',
                rounded: "lg"
            },
            VBtnSecondary: {
                color: 'info',
                variant: 'tonal',
                rounded: 'lg'
            }
        }

    })

    nuxtApp.vueApp.use(vuetify)
})