import '@/assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import vClickOutside from 'click-outside-vue3';
import Notifications from '@kyvg/vue3-notification'

import App from '@/App.vue';
import router from '@/router';

const app = createApp(App);

export const pinia = createPinia();
app.use(pinia);
app.use(vClickOutside);
app.use(Notifications);
app.use(router);


app.mount('#app');
