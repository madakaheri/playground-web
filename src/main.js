import './assets/main.css';
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import * as worker from './app/worker/index.js';
import * as db from './app/db/index.js';

const app = createApp(App);

app.use(router);

app.mount('#app');

//

// worker.play();
db.play();
