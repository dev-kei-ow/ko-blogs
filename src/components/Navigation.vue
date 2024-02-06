<script>
import InlineSvg from 'vue-inline-svg';
import menuIcon from '@/assets/Icons/bars-regular.svg';
import userIcon from '@/assets/Icons/user-alt-light.svg';
import adminIcon from '@/assets/Icons/user-crown-light.svg';
import singOutIcon from '@/assets/Icons/sign-out-alt-regular.svg';

import { firebaseAuth, signOut } from '@/firebase/firebaseInit';

export default {
	name: 'Navigation',

	components: {
		InlineSvg,
	},
	data() {
		return {
			menuIcon,
			userIcon,
			adminIcon,
			singOutIcon,

			profileMenu: null,
			mobile: null,
			mobileNav: null,
			windownWidth: null,
		};
	},

	created() {
		window.addEventListener('resize', this.checkScreen);
		this.checkScreen();
	},

	methods: {
		checkScreen() {
			this.windownWidth = window.innerWidth;

			if (this.windownWidth <= 750) {
				this.mobile = true;
				return;
			}

			this.mobile = false;
			this.mobileNav = false;

			return;
		},

		toggleMobileNav() {
			this.mobileNav = !this.mobileNav;
		},

		toggleProfileMenu(e) {
			if (e.target === this.$refs.profile) {
				this.profileMenu = !this.profileMenu;
			}
		},

		signOutFirebase() {
			signOut(firebaseAuth); //usa signOut para cerrar sesion

			window.location.reload();
		},
	},

	computed: {
		user() {
			return this.$store.state.user;
		},
		admin() {
			return this.$store.state.profileAdmin; //agrega la propiedad computada admin
		},
	},
};
</script>

<template>
	<header>
		<nav class="container">
			<div class="branding">
				<router-link class="header" :to="{ name: 'Home' }">KoBlogs</router-link>
			</div>
			<div class="navLinks">
				<ul v-show="!mobile">
					<router-link class="link" :to="{ name: 'Home' }">Index</router-link>
					<router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
					<router-link class="link" v-if="admin" :to="{ name: 'CreatePost' }">Crear Post</router-link>
					<router-link class="link" v-if="!user" :to="{ name: 'Login' }">Login/Registrarse</router-link>
				</ul>

				<div class="profile" ref="profile" v-if="user" @click="toggleProfileMenu">
					<span>{{ this.$store.state.profileInitials }}</span>

					<div class="profileMenu" v-show="profileMenu">
						<div class="info">
							<p class="initials">{{ this.$store.state.profileInitials }}</p>
							<div class="right">
								<p>
									{{ this.$store.state.profileFirstName }}
									{{ this.$store.state.profileLastName }}
								</p>
								<p>
									{{ this.$store.state.profileUsername }}
								</p>
								<p>
									{{ this.$store.state.profileEmail }}
								</p>
							</div>
						</div>
						<div class="options">
							<div class="option">
								<router-link class="option" :to="{ name: 'Profile' }">
									<InlineSvg class="icon" :src="userIcon" />
									<p>Perfil</p>
								</router-link>
							</div>
							<div class="option" v-if="admin">
								<router-link class="option" :to="{ name: 'Admin' }">
									<InlineSvg class="icon" :src="adminIcon" />
									<p>Admin</p>
								</router-link>
							</div>
							<div class="option" @click="signOutFirebase">
								<InlineSvg class="icon" :src="singOutIcon" />
								<p>Desconectar</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</nav>

		<InlineSvg class="menuIcon" :src="menuIcon" v-show="mobile" @click="toggleMobileNav" />

		<transition name="mobileNav">
			<ul class="mobileNav" v-show="mobileNav">
				<router-link class="link" :to="{ name: 'Home' }">Index</router-link>
				<router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
				<router-link class="link" v-if="admin" :to="{ name: 'CreatePost' }">Crear Post</router-link>
				<router-link class="link" v-if="!user" :to="{ name: 'Login' }">Login/Registrarse</router-link>
			</ul>
		</transition>
	</header>
</template>

<style lang="scss" scoped>
header {
	background-color: #fff;
	padding: 0 25px;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
	z-index: 99;

	.link {
		font-weight: 500;
		padding: 0 8px;
		transition: 0.3s color ease;

		&:hover {
			color: #1eb8b8;
		}
	}

	nav {
		display: flex;
		padding: 25px 0;

		.branding {
			display: flex;
			align-items: center;

			.header {
				font-weight: 600;
				font-size: 24px;
				color: #000;
				text-decoration: none;
			}
		}

		.navLinks {
			position: relative;
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: flex-end;

			ul {
				margin-right: 32px;

				.link {
					margin-right: 32px;
				}

				.link:last-child {
					margin-right: 0;
				}
			}

			.profile {
				position: relative;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				color: #fff;
				background-color: #303030;

				span {
					pointer-events: none;
				}

				.profileMenu {
					position: absolute;
					top: 60px;
					right: 0;
					width: 250px;
					background-color: #303030;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

					.info {
						display: flex;
						align-items: center;
						padding: 15px;
						border-bottom: 1px solid #fff;

						.initials {
							position: initial;
							width: 40px;
							height: 40px;
							background-color: #fff;
							color: #303030;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 50%;
						}

						.right {
							flex: 1;
							margin-left: 24px;

							p:nth-child(1) {
								font-size: 14px;
							}

							p:nth-child(2),
							p:nth-child(3) {
								font-size: 12px;
							}
						}
					}

					.options {
						padding: 15px;
						.option {
							text-decoration: none;
							color: #fff;
							display: flex;
							align-items: center;
							margin-bottom: 12px;

							.icon {
								width: 18px;
								height: auto;
							}

							p {
								font-size: 14px;
								margin-left: 12px;
							}
							&:last-child {
								margin-bottom: 0px;
							}
						}
					}
				}
			}
		}
	}

	.menuIcon {
		cursor: pointer;
		position: absolute;
		top: 32px;
		right: 25px;
		height: 25px;
		width: auto;
	}

	.mobileNav {
		padding: 20px;
		width: 70%;
		max-width: 250px;
		display: flex;
		flex-direction: column;
		position: fixed;
		height: 100%;
		background-color: #303030;
		top: 0;
		left: 0;

		.link {
			padding: 15px 0;
			color: #fff;
		}
	}

	.mobileNav-enter-active,
	.mobileNav-leave-active {
		transition: all 1s ease;
	}

	.mobileNav-enter {
		transform: translate(-250px);
	}

	.mobileNav-enter-to {
		transform: translate(0);
	}

	.mobileNav-leave-to {
		transform: translateX(-250px);
	}
}
</style>
