<script>
import InlineSvg from 'vue-inline-svg';
import adminIcon from '@/assets/Icons/user-crown-light.svg';
import Modal from '@/components/Modal.vue';
export default {
	name: 'ProfileView',

	components: {
		InlineSvg,
		Modal,
	},

	data() {
		return {
			adminIcon,

			modalMessage: '¡¡Se guardaron los cambios!!',
			modalActive: null,
		};
	},

	methods: {
		updateProfile() {
			this.$store.dispatch('updateUserSettings');
			this.modalActive = !this.modalActive;
		},

		closeModal() {
			this.modalActive = !this.modalActive;
		},
	},

	computed: {
		firstName: {
			get() {
				return this.$store.state.profileFirstName;
			},
			set(payload) {
				this.$store.commit('changeFirstName', payload);
			},
		},

		lastName: {
			get() {
				return this.$store.state.profileLastName;
			},
			set(payload) {
				this.$store.commit('changeLastName', payload);
			},
		},
		username: {
			get() {
				return this.$store.state.profileUsername;
			},
			set(payload) {
				this.$store.commit('changeUsername', payload);
			},
		},

		email() {
			return this.$store.state.profileEmail;
		},
	},
};
</script>

<template>
	<div class="profile">
		<Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
		<div class="container">
			<h2>Configuraciones de la cuenta:</h2>
			<div class="profileInfo">
				<div class="initials">{{ $store.state.profileInitials }}</div>
				<div class="adminBadge">
					<InlineSvg class="icon" :src="adminIcon" />
					<span>admin</span>
				</div>
				<div class="input">
					<label for="firstName">Nombres:</label>
					<input type="text" id="firstName" v-model="firstName" />
				</div>
				<div class="input">
					<label for="lastName">Apellidos:</label>
					<input type="text" id="lastName" v-model="lastName" />
				</div>
				<div class="input">
					<label for="username">Usuario:</label>
					<input type="text" id="username" v-model="username" />
				</div>
				<div class="input">
					<label for="email">Correo:</label>
					<input disabled type="text" id="email" v-model="email" />
				</div>
				<button @click="updateProfile">Guardar cambios</button>
			</div>
		</div>
	</div>
</template>
<style lang="scss" scoped>
.profile {
	.container {
		max-width: 1000px;
		padding: 60px 25px;

		h2 {
			text-align: center;
			margin-bottom: 16px;
			font-weight: 300;
			font-size: 32px;
		}

		.profileInfo {
			border-radius: 8px;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
			padding: 32px;
			background-color: #f1f1f1;
			display: flex;
			flex-direction: column;
			max-width: 600px;
			margin: 32px auto;

			.initials {
				position: initial;
				width: 80px;
				height: 80px;
				font-size: 32px;
				background-color: #303030;
				color: #fff;
				display: flex;
				align-self: center;
				align-items: center;
				justify-content: center;
				border-radius: 50%;
			}

			.adminBadge {
				display: flex;
				align-self: center;
				color: #fff;
				font-size: 14px;
				padding: 8px 24px;
				border-radius: 8px;
				background-color: #303030;
				margin: 16px 0;
				text-align: center;
				text-transform: capitalize;

				.icon {
					width: 14px;
					height: auto;
					margin-right: 8px;
				}
			}

			.input {
				margin: 16px 0;

				label {
					font-size: 14px;
					display: block;
					padding-bottom: 6px;
				}
				input {
					width: 100%;
					border: none;
					background-color: #f2f7f6;
					padding: 8px;
					height: 50px;
					@media (min-width: 900px) {
					}

					&:focus {
						outline: none;
					}
				}
			}

			button {
				align-self: center;
			}
		}
	}
}
</style>
