<template>
    <div v-if="authenticated">
        <button v-on:click="signout" type="submit" class="button button-primary block login">Signout</button>
        <Messages></Messages>
    </div>
    <div v-else>
        <main class="login container">
            <div class="row">
                <div class="col-12 col-6-tablet push-3-tablet text-center">
                    <h1 class="font-100">Welcome Back</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-6-tablet push-3-tablet col-4-desktop push-4-desktop text-center">
                    <span v-if="error && error.name == 'NotAuthenticated'">Invalid user or pass.</span>
                    <form v-on:submit.prevent="tryAuth" class="form" method="post">
                        <fieldset>
                            <input v-model="username" class="block" type="email" placeholder="email">
                        </fieldset>
                        <fieldset>
                            <input v-model="password" class="block" type="password" placeholder="password">
                        </fieldset>
                        <button type="submit" class="button button-primary block login">Sigin</button>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import {app} from './services';
import Messages from './components/Messages.vue';

export default {
    data() {
        return {
            hasCheckedAuth: false,
            username: '',
            password: ''
        };
    },
    mounted() {
        this.signin();
    },
    components: { Messages },
    computed: {
        ...mapGetters([
            'authenticated',
            'errors'
        ]),
        error() {
            return this.errors.authentication;
        }
    },
    methods: {
        ...mapActions([
            'signin',
            'signout'
        ]),
        tryAuth(event) {
            var vm = this;
            this.signin({
                username: vm.username,
                password: vm.password
            }).then(() => {
                vm.username = vm.password = '';
            });
        }
    }
}
</script>
