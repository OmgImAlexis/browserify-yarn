<template>
    <div>
        <input v-model="newMessage" v-on:keyup.enter="tryAddMessage" type="text" placeholder="Enter message">
        <button type="submit" @click="tryAddMessage">Add message</button>
        <ul>
            <li v-for="message in messages">
                <span>{{ message.text }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data() {
        return {
            newMessage: ''
        }
    },
    mounted() {
        this.fetchMessages();
    },
    methods: {
        ...mapActions([
            'fetchMessages',
            'addMessage'
        ]),
        tryAddMessage() {
            var text = this.newMessage;
            if (text.trim()) {
                this.addMessage(text);
            }
        }
    },
    computed: {
        ...mapGetters({
            messages: 'getMessages',
        })
    }
};
</script>
