<script>
import InlineSvg from 'vue-inline-svg';
import youtubeIcon from '@/assets/Icons/youtube-brands.svg';
import twitterIcon from '@/assets/Icons/twitter-brands.svg';
import instagramIcon from '@/assets/Icons/instagram-brands.svg';
import linkedinIcon from '@/assets/Icons/linkedin-brands.svg';

export default {
	name: 'Footer',

	components: {
		InlineSvg,
	},
	data() {
		return {
			youtubeIcon,
			twitterIcon,
			instagramIcon,
			linkedinIcon,
		};
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
	<footer>
		<div class="container">
			<div class="left">
				<div class="col-1">
					<router-link class="header" :to="{ name: 'Home' }">KoBlogs</router-link>
					<ul>
						<li>
							<a href="#">
								<InlineSvg :src="youtubeIcon" class="svg-icon" />
							</a>
						</li>
						<li>
							<InlineSvg :src="twitterIcon" class="svg-icon" />
						</li>
						<li>
							<InlineSvg :src="instagramIcon" class="svg-icon" />
						</li>
						<li>
							<InlineSvg :src="linkedinIcon" class="svg-icon" />
						</li>
					</ul>
				</div>

				<div class="col-2">
					<ul>
						<router-link class="link" :to="{ name: 'Home' }">Index</router-link>
						<router-link class="link" :to="{ name: 'Blogs' }">Blogs</router-link>
						<router-link class="link" v-if="admin" :to="{ name: 'CreatePost' }">Crear Post</router-link>
						<router-link class="link" v-if="!user" :to="{ name: 'Login' }">Login/Registrarse</router-link>
					</ul>
				</div>
			</div>
			<div class="right">
				<p>&copy;dev-kei-ow/2022</p>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
footer {
	margin-top: auto;
	padding: 100px 25px;
	background-color: #303030;

	.container {
		display: flex;
		flex-direction: column;
		gap: 32px;

		@media (min-width: 800px) {
			flex-direction: row;
			gap: 0px;
		}

		> div {
			display: flex;
			flex: 1;
		}

		.left {
			gap: 32px;
			color: #fff;
			display: flex;
			flex-direction: column;
			align-items: center;
			@media (min-width: 800px) {
				flex-direction: row;
				align-items: initial;
				gap: 0px;
			}

			.header {
				text-align: center;
				font-size: 24px;
				color: #fff;
				text-decoration: none;
				font-weight: 600;
				@media (min-width: 800px) {
					text-align: initial;
				}
			}

			ul {
				gap: 16px;
				list-style: none;
				display: flex;
			}

			.col-1,
			.col-2 {
				gap: 32px;
				display: flex;
				flex: 1;
				@media (min-width: 800px) {
					gap: 0;
				}
			}

			.col-1 {
				flex-direction: column;

				h2 {
					text-align: center;
					@media (min-width: 800px) {
						text-align: initial;
					}
				}

				ul {
					margin-top: auto;

					li {
						display: flex;
						align-items: center;

						.svg-icon {
							width: 24px;
							height: auto;
							color: #fff;
						}
					}
				}
			}

			.col-2 {
				ul {
					height: 100%;
					justify-content: center;
					flex-direction: row;
					flex-wrap: wrap;
					@media (min-width: 800px) {
						flex-direction: column;
					}

					.link {
						font-size: 16px;
						font-weight: 500;
						color: #fff;
						text-decoration: none;
					}
				}
			}
		}

		.right {
			gap: 32px;
			color: #fff;
			align-items: center;
			flex-direction: column;
			@media (min-width: 800px) {
				align-items: flex-end;
				gap: 0;
			}
		}

		p {
			margin-top: auto;
		}
	}
}
</style>
