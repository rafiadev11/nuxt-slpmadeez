<template>
    <div class="app-auth-body mx-auto">
        <div class="app-auth-branding mb-4">
            <NuxtLink to="/" class="app-logo">
                <nuxt-img class="logo-icon me-2" src="/images/logo.png" alt="logo"/>
            </NuxtLink>
        </div>
        <h2 class="auth-heading text-center mb-5">Log in to Portal</h2>
        <div class="auth-form-container text-start">
            <div class="alert alert-danger" v-if="error">{{ error }}</div>
            <form class="auth-form login-form" @submit.prevent="login">
                <div class="email mb-3">
                    <label class="sr-only" for="signin-email">Email</label>
                    <input id="signin-email" v-model="form.email" name="signin-email" type="email" class="form-control signin-email"
                           placeholder="Email address" required="required">
                </div>
                <div class="password mb-3">
                    <label class="sr-only" for="signin-password">Password</label>
                    <input id="signin-password" v-model="form.password" name="signin-password" type="password"
                           class="form-control signin-password"
                           placeholder="Password" required="required">
                    <div class="extra mt-3 row justify-content-between">
                        <div class="col-6">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="RememberPassword">
                                <label class="form-check-label" for="RememberPassword">
                                    Remember me
                                </label>
                            </div>
                        </div><!--//col-6-->
                        <div class="col-6">
                            <div class="forgot-password text-end">
                                <a href="#">Forgot password?</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <main-button type="submit" class="app-btn-primary">Log In</main-button>
                </div>
            </form>
            <div class="auth-option text-center pt-5">No Account? Sign up
                <NuxtLink class="text-link" to="/register">here</NuxtLink>
                .
            </div>
        </div>

    </div>
</template>

<script>
export default {
    layout: 'auth',
    data: () => ({
        form: {
            email: '',
            password: ''
        },
        error: ''
    }),
    methods: {
        async login() {
            try {
                await this.$auth.loginWith('laravelSanctum', {data: this.form})
            } catch (error) {
                if(error.response.status === 422){
                    this.error = 'Incorrect email or password';
                    this.form.password = '';
                }
            }
        }
    }

}
</script>
