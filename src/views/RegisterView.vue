<script>
import InlineSvg from 'vue-inline-svg';
import emailIcon from '@/assets/Icons/envelope-regular.svg';
import passwordIcon from '@/assets/Icons/lock-alt-solid.svg';
import userIcon from '@/assets/Icons/user-alt-light.svg';

import {
	dbFireStore,
	firebaseAuth,
	createUserWithEmailAndPassword,
	collection,
	doc,
	setDoc,
	getDocs,
} from '@/firebase/firebaseInit';

export default {
	name: 'Register',
	components: { InlineSvg },
	data() {
		return {
			emailIcon,
			passwordIcon,
			userIcon,

			firstName: null,
			lastName: null,
			username: null,
			email: null,
			password: null,
			error: null,
			errorMsg: '',
		};
	},

	methods: {
		async register() {
			if (
				this.email !== '' &&
				this.password !== '' &&
				this.firstName !== '' &&
				this.lastName !== '' &&
				this.username !== ''
			) {
				this.error = false;
				this.errorMsg = '';

				try {
					const userCredentials = await createUserWithEmailAndPassword(
						firebaseAuth,
						this.email,
						this.password
					);

					const userCollection = collection(dbFireStore, 'users');
					const userDoc = doc(userCollection, userCredentials.user.uid);

					//++ comprobar si ya existen usuarios en la collecion de users
					const usersSnapshot = await getDocs(userCollection);
					const isAdmin = usersSnapshot.empty; //si no hay usuarios, este usuario será administrador

					await setDoc(userDoc, {
						firstName: this.firstName,
						lastName: this.lastName,
						username: this.username,
						email: this.email,
						admin: isAdmin, // establece el campo admin
					});

					this.$router.push({ name: 'Home' });
				} catch (err) {
					if (err.code === 'auth/email-already-in-use') {
						this.error = true;
						this.errorMsg = 'La dirección de correo electrónico ya está en uso por otra cuenta.';
					} else if (err.code === 'auth/weak-password') {
						this.error = true;
						this.errorMsg = 'La contraseña debe tener al menos 6 caracteres..';
					} else {
						// Handle other errors
						this.error = true;
						this.errorMsg = err.message;
					}
				}

				return;
			}

			this.error = true;
			this.errorMsg = 'Por favor complete todos los campos!';
		},
	},
};
</script>

<template>
	<div class="formWrap">
		<form class="register">
			<p class="loginRegister">
				¿Ya tienes una cuenta?

				<router-link class="routerLink" :to="{ name: 'Login' }">Inicie Sesión</router-link>
			</p>

			<h2>Crea tu cuenta de KoBlog:</h2>

			<div class="inputs">
				<div class="input">
					<input type="text" placeholder="Nombres" v-model="firstName" />
					<InlineSvg :src="userIcon" class="icon" />
				</div>
				<div class="input">
					<input type="text" placeholder="Apellidos" v-model="lastName" />
					<InlineSvg :src="userIcon" class="icon" />
				</div>
				<div class="input">
					<input type="text" placeholder="Usuario" v-model="username" />
					<InlineSvg :src="userIcon" class="icon" />
				</div>

				<div class="input">
					<input type="text" placeholder="Correo" v-model="email" />
					<InlineSvg :src="emailIcon" class="icon" />
				</div>
				<div class="input">
					<input type="password" placeholder="Contraseña" v-model="password" />
					<InlineSvg :src="passwordIcon" class="icon" />
				</div>
			</div>

			<div class="error" v-show="error">{{ this.errorMsg }}</div>

			<button @click.prevent="register">Registrarse</button>
			<div class="angle"></div>
		</form>

		<div class="background"></div>
	</div>
</template>

<style lang="scss" scoped>
.register {
	h2 {
		max-width: 350px;
	}
}
</style>
