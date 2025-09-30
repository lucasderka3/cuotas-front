import {User} from "~/core/types/User";
import {useFetchStatic} from "~/Composables/http/useFetchStatic";
import {useFetchDynamic} from "~/Composables/http/useFetchDynamic";


interface State{
    token: string | null;
    user: User | null;
}

interface ApiLoginResponse extends State {}

export const useAuthStore = defineStore('auth', () => {

    const user = ref<User | null>(null);
    const token = ref<string | null>(null);

    const getUser = computed(() => user.value);
    const authenticated = computed(() => user.value !== null && token.value !== null);

    const checkLogin = () => {
        if (process.client) {
            const storedUser = localStorage.getItem('user')
            const storedToken = localStorage.getItem('token')
            if (storedUser && storedToken) {
                user.value = JSON.parse(storedUser)
                token.value = storedToken
            }
        }
    };


    const login = async (email: string, password: string)=> {
        const res = await useFetchDynamic<ApiLoginResponse>('/api/v1/auth/login', {
            method: 'POST',
            body:{
                email: email,
                password: password
            }
        });

        if (res) {
            user.value = res.user;
            token.value = res.token;

            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('token', res.token);
        }
    };

    const logout = () => {
        user.value = null;
        token.value = null;

        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    watch([user, token], ([newUser, newToken]) => {
        if (import.meta.client) {
            if (newUser) {
                localStorage.setItem('user', JSON.stringify(newUser));
            } else {
                localStorage.removeItem('user');
            }

            if (newToken) {
                localStorage.setItem('token', newToken);
            } else {
                localStorage.removeItem('token');
            }
        }
    });

    checkLogin();

    return{
        user,
        token,
        login,
        logout,
        checkLogin,
        getUser,
        authenticated,
    }

})