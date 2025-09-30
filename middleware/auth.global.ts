import { defineNuxtRouteMiddleware, navigateTo } from '#app'


export default defineNuxtRouteMiddleware((to) => {
    if (process.client) {
        const token = localStorage.getItem('token')

        // Si no estoy logueado me redirige a login
        if (!token && to.path !== '/login') {
            return navigateTo('/login')
        }

        //Este sirve para que si estoy logueado y quiero ir a /login me mande a otra ruta
        if (token && to.path === '/login') {
            return navigateTo('/inicio/dashboard')
        }
    }
})
