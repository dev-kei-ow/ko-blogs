<script>
import {
	dbFireStore,
	query,
	where,
	collection,
	doc,
	getDocs,
	updateDoc,
} from '@/firebase/firebaseInit';

export default {
	name: 'AdminView',
	data() {
		return {
			adminEmail: '',
			functionMsg: null,
		};
	},
	methods: {
		async addAdmin() {
			const userCollection = collection(dbFireStore, 'users');
			const userQuery = query(userCollection, where('email', '==', this.adminEmail));
			const userSnapshot = await getDocs(userQuery);

			if (!userSnapshot.empty) {
				const userDoc = doc(dbFireStore, 'users', userSnapshot.docs[0].id);
				await updateDoc(userDoc, { admin: true });
				this.functionMsg = 'El usuario se ha convertido en administrador.';
			} else {
				this.functionMsg = 'No se encontró ningún usuario con este correo electrónico';
			}
		},
	},
};
</script>

<template>
	<div class="admin">
		<div class="container">
			<h2>Gestion de administración:</h2>
			<div class="admin-info">
				<h2>Agregar administrador</h2>
				<div class="input">
					<input
						placeholder="Ingrese el correo electrónico del usuario para convertirlo en administrador."
						type="text"
						id="addAdmins"
						v-model="adminEmail" />
				</div>
				<span>{{ this.functionMsg }}</span>
				<button @click="addAdmin" class="button">Enviar</button>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.admin {
	.container {
		max-width: 1000px;
		padding: 60px 25px;

		h2 {
			text-align: center;
			margin-bottom: 16px;
			font-weight: 300;
			font-size: 32px;
		}

		.admin-info {
			border-radius: 8px;
			box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
			padding: 32px;
			background-color: #f1f1f1;
			display: flex;
			flex-direction: column;
			max-width: 600px;
			margin: 32px auto;

			span {
				font-size: 14px;
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
