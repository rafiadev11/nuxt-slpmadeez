<template>
    <div class="app-auth-body mx-auto">
        <div class="app-auth-branding mb-4">
            <NuxtLink to="/" class="app-logo">
                <nuxt-img class="logo-icon me-2" src="/images/logo.png" alt="logo"/>
            </NuxtLink>
        </div>
        <h2 class="auth-heading text-center mb-5">Sign up</h2>
        <div class="auth-form-container text-start">
            <form class="auth-form auth-signup-form" @submit.prevent="register">
                <div>
                    <label class="sr-only" for="signup-name">Your Name</label>
                    <input id="signup-name" v-model="form.name" type="text" class="form-control signup-name"
                           placeholder="Full name" required="required"><br>
                    <span v-if="errors !== null && errors.name">{{ errors.name[0] }}</span>
                </div>
                <div class="email">
                    <label class="sr-only" for="signup-email">Your Email</label>
                    <input id="signup-email" v-model="form.email" name="signup-email" type="email"
                           class="form-control signup-email"
                           placeholder="Email" required="required"><br>
                    <span v-if="errors !== null && errors.email">{{ errors.email[0] }}</span>
                </div>
                <div class="password">
                    <label class="sr-only" for="signup-password">Password</label>
                    <input id="signup-password" v-model="form.password" name="signup-password" type="password"
                           class="form-control signup-password" placeholder="Create a password" required="required"><br>
                    <span v-if="errors !== null && errors.password">{{ errors.password[0] }}</span>
                </div>

                <div class="password">
                    <label class="sr-only" for="signup-password">Confirm Password</label>
                    <input v-model="form.password_confirmation" name="signup-password-confirmation" type="password"
                           class="form-control signup-password" placeholder="Confirm Your Password" required="required">
                </div>

                <div class="text-center">
                    <main-button type="submit">Sign Up</main-button>
                </div>
            </form><!--//auth-form-->

            <div class="auth-option text-center pt-5">Already have an account?
                <NuxtLink class="text-link" to="/login">Log in</NuxtLink>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    layout: 'auth',
    data: () => ({
        form: {
            name: '',
            email: '',
            password: '',
            password_confirmation: ''
        },
        errors: null
    }),
    methods: {
        async register() {
            try {
                await this.$axios.$get('/sanctum/csrf-cookie');
                await this.$axios.$post('/register', this.form)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        if (error.response.status === 422) {
                            this.errors = error.response.data.errors
                        }
                    });
                if(this.errors === null){
                    await this.$auth.loginWith('laravelSanctum', {data: this.form})
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>
