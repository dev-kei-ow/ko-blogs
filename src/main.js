import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vue2Editor from 'vue2-editor';

import { firebaseAuth, onAuthStateChanged } from '@/firebase/firebaseInit';

//++ habilita el uso de Vue2Editor en tu aplicación Vue
Vue.use(Vue2Editor);

//++ desactiva la sugerencia de producción en la consola del navegador
Vue.config.productionTip = false;

//++ declara una variable que almacenará tu instancia de Vue.js
let app;

//++ establece un observador de eventos que se dispara cada vez que el estado de autenticación del usuario cambia
onAuthStateChanged(firebaseAuth, () => {
	//++ verifica si la variable app ya ha sido definida
	//++ si no es así, significa que esta es la primera vez que se dispara el observador de eventos y que la aplicación Vue.js aún no se ha inicializado
	if (!app) {
		//++ inicializa tu aplicación Vue.js y la monta en el elemento con el ID 'app' en tu HTML
		app = new Vue({
			router,
			store,
			render: (h) => h(App),
		}).$mount('#app');
	}
});
