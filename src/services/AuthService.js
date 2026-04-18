import { toast } from 'react-toastify'
import apiService from './ApiService'

const authService = {
    async LoginWithCredentials(email, password) {
        try {
            const res = await apiService.postData('api/auth/login', {
                email: email,
                password: password
            })
            if (res.success) {
                if (typeof window !== 'undefined') {
                    toast.success('logged in successfully!!')
                    localStorage.setItem('userData', JSON.stringify(res.user))
                }
                return res.user
            } else {
                toast.error(res.message)
                return null
            }
        } catch (error) {
            console.error('Error during login:', error)
            return null
        }
    },

    async SocialLogin(data) {
        try {
            const res = await apiService.postData('Auth/SocialLogin', data)
            if (res.success) {
                if (typeof window !== 'undefined') {
                    toast.success('logged in successfully!!')
                    localStorage.setItem('userData', JSON.stringify(res.data))
                }
                return res.data
            } else {
                toast.error('Something went wrong! Please try again later!')
                return null
            }
        } catch (error) {
            console.error('Login failed:', error)
            return null
        }
    },

    async ForgotPassword(data) {
        try {
            const endpoint = "http://localhost:3000/api/auth/forgot-password";

            const res = await apiService.postData(endpoint, data)
            if (res.success) {
                toast.success(res.message)
                return res.data
            } else {
                toast.error(res.message)
                return null
            }
        } catch (error) {
            console.error('failed:', error)
            return null
        }
    },
    async ResetPassword(data) {
        try {
            const endpoint = "http://localhost:3000/api/auth/reset-password";
            const res = await apiService.postData(endpoint, data)
            if (res.success) {
                toast.success(res.message)
                return res.success
            } else {
                toast.error(res.message)
                return null
            }
        } catch (error) {
            console.error('failed:', error)
            return null
        }
    },
    async UserSignUp(data) {
        try {
            const res = await apiService.postData('api/auth/register', data)
            if (res.success) {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('userData', JSON.stringify(res.data))
                }
                toast.success(res.message)
                return res.data
            } else {
                toast.error(res.message)
                return null
            }
        } catch (error) {
            console.error('failed:', error)
            return null
        }
    },
}

export default authService
