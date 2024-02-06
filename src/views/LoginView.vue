<script>
import InlineSvg from 'vue-inline-svg';
import emailIcon from '@/assets/Icons/envelope-regular.svg';
import passwordIcon from '@/assets/Icons/lock-alt-solid.svg';

import { firebaseAuth, signInWithEmailAndPassword } from '@/firebase/firebaseInit';

export default {
	name: 'LoginView',
	components: { InlineSvg },
	data() {
		return {
			emailIcon,
			passwordIcon,

			email: null,
			password: null,
			error: null,
			errorMsg: '',
		};
	},

	methods: {
		signIn() {
			signInWithEmailAndPassword(firebaseAuth, this.email, this.password)
				.then((userCredential) => {
					this.$router.push({ name: 'Home' });
					this.error = false;
					this.errorMsg = '';
					console.log(userCredential.user.uid);
				})
				.catch((err) => {
					if (err.code === 'auth/invalid-email') {
						this.error = true;
						this.errorMsg =
							'La dirección de correo electrónico no es válida. Por favor ingrese su dirección de correo electrónico válida.';
					} else if (err.code === 'auth/invalid-credential') {
						this.error = true;
						this.errorMsg =
							'El correo electrónico y la contraseña que ingresó no coinciden con nuestros registros. Por favor, vuelve a comprobarlo e inténtalo de nuevo..';
					} else {
						// Handle other errors
						this.error = true;
						this.errorMsg = err.message;
					}
				});
		},
	},
};
</script>

<template>
	<div class="formWrap">
		<form class="login">
			<p class="loginRegister">
				¿No tienes una cuenta?

				<router-link class="routerLink" :to="{ name: 'Register' }">Registrate</router-link>
			</p>

			<h2>Inicie sesión en KoBlogs</h2>

			<div class="inputs">
				<div class="input">
					<input type="text" placeholder="Correo" v-model="email" />
					<InlineSvg :src="emailIcon" class="icon" />
				</div>
				<div class="input">
					<input type="password" placeholder="Contraseña" v-model="password" />
					<InlineSvg :src="passwordIcon" class="icon" />
				</div>
				<div class="error" v-show="error">{{ this.errorMsg }}</div>
			</div>

			<router-link class="forgotPassword" :to="{ name: 'ForgotPassword' }">
				¿Olvidaste tu contraseña?
			</router-link>

			<button @click.prevent="signIn">Iniciar sesión</button>
			<div class="angle"></div>
		</form>

		<div class="background"></div>
	</div>
</template>

<style lang="scss">
.formWrap {
	overflow: hidden;
	display: flex;
	height: 100vh;
	justify-content: center;
	align-self: center;
	margin: 0 auto;
	width: 90%;

	@media (min-width: 900px) {
		width: 100%;
	}

	.loginRegister {
		margin-bottom: 32px;

		.routerLink {
			color: #000;
		}
	}

	form {
		padding: 0 10px;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;

		@media (min-width: 900px) {
			padding: 0 50px;
		}

		h2 {
			text-align: center;
			font-size: 32px;
			color: #303030;
			margin-bottom: 40px;
			@media (min-width: 900px) {
				font-size: 40px;
			}
		}

		.inputs {
			width: 100%;
			max-width: 350px;

			.input {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 8px;

				input {
					width: 100%;
					border: none;
					background-color: #f2f7f6;
					padding: 4px 4px 4px 30px;
					height: 50px;

					&:focus {
						outline: none;
					}
				}

				.icon {
					width: 12px;
					position: absolute;
					left: 6px;
				}
			}
		}

		.forgotPassword {
			text-decoration: none;
			color: #000;
			cursor: pointer;
			font-size: 14px;
			margin: 16px 0 32px;
			border-bottom: 1px solid transparent;
			transition: 0.5s ease all;

			&:hover {
				border-color: #303030;
			}
		}

		.angle {
			display: block;
			position: absolute;
			background-color: #fff;
			transform: rotateZ(3deg);
			width: 60px;
			right: -30px;
			height: 101%;

			@media (min-width: 900px) {
				display: initial;
			}
		}
	}

	.background {
		display: none;
		flex: 2;
		background-size: cover;
		background-image: url('@/assets/background.png');
		width: 100%;
		height: 100%;
		@media (min-width: 900px) {
			display: initial;
		}
	}
}
</style>
