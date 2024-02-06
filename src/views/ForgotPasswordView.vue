<script>
import InlineSvg from 'vue-inline-svg';
import emailIcon from '@/assets/Icons/envelope-regular.svg';
import Modal from '@/components/Modal.vue';
import Loading from '@/components/Loading.vue';

import { firebaseAuth, sendPasswordResetEmail } from '@/firebase/firebaseInit';

export default {
	name: 'ForgotPasswordView',
	components: { InlineSvg, Modal, Loading },
	data() {
		return {
			emailIcon,
			email: '',
			modalActive: false,
			modalMessage: '',
			loading: null,
		};
	},

	methods: {
		resetPassword() {
			this.loading = true;

			sendPasswordResetEmail(firebaseAuth, this.email)
				.then(() => {
					this.modalMessage = 'Si su cuenta existe, recibirá un correo electrónico.';
					this.loading = false;
					this.modalActive = true;
				})
				.catch((err) => {
					this.modalMessage = err.message;
					this.loading = false;
					this.modalActive = true;
				});
		},

		closeModal() {
			this.modalActive = !this.modalActive;
			this.email = '';
		},
	},
};
</script>

<template>
	<div class="resetPassword">
		<Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
		<Loading v-if="loading" />
		<div class="formWrap">
			<form class="reset">
				<p class="loginRegister">
					De regreso
					<router-link class="routerLink" :to="{ name: 'Login' }">Login</router-link>
				</p>

				<h2>Restablecer la contraseña</h2>

				<p>¿Olvidaste tu contraseña? Introduce tu correo electrónico para restablecerlo</p>

				<div class="inputs">
					<div class="input">
						<input type="text" placeholder="Correo" v-model="email" />
						<InlineSvg :src="emailIcon" class="icon" />
					</div>
				</div>

				<button @click.prevent="resetPassword">Recuperar</button>
				<div class="angle"></div>
			</form>

			<div class="background"></div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.resetPassword {
	position: relative;

	.formWrap {
		.reset {
			h2 {
				margin-bottom: 8px;
			}

			p {
				text-align: center;
				margin-bottom: 32px;
			}
		}
	}
}
</style>
