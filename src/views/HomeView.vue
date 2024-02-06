<script>
import InlineSvg from 'vue-inline-svg';
import arrowIcon from '@/assets/Icons/arrow-right-light.svg';
import BlogCard from '@/components/BlogCard.vue';
import BlogPost from '@/components/BlogPost.vue';

export default {
	name: 'HomeView',

	components: { BlogPost, BlogCard, InlineSvg },

	data() {
		return {
			arrowIcon,

			welcomeScreen: {
				title: 'Bienvenido!',
				blogPost:
					'Artículos de blog con todo lo relacionado con la programación, incluidos HTML, CSS, JavaScript y más. Regístrese hoy para no perderse nunca una publicación!',
				welcomeScreen: true,
				photo: 'coding',
			},
		};
	},

	computed: {
		blogPostsFeed() {
			return this.$store.getters.blogPostsFeed;
		},

		blogPostsCards() {
			return this.$store.getters.blogPostsCards;
		},

		user() {
			return this.$store.state.user;
		},
	},
};
</script>

<template>
	<div>
		<BlogPost v-if="!user" :post="welcomeScreen" />
		<BlogPost :post="post" v-for="(post, index) in blogPostsFeed" :key="index" />

		<div class="blogCardWrap">
			<div class="container">
				<h3>Blogs más recientes:</h3>
				<div class="blogCards">
					<BlogCard :post="post" v-for="(post, index) in blogPostsCards" :key="index" />
				</div>
			</div>
		</div>

		<div v-if="!user" class="updates">
			<div class="container">
				<h2>
					nunca te pierdas una publicación. ¡Regístrese para obtener su cuenta gratuita hoy!
				</h2>
				<router-link class="routerButton" to="#">
					Regístrate en KoBlogs <InlineSvg :src="arrowIcon" class="arrow arrowLight" />
				</router-link>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.blogCardWrap {
	h3 {
		font-weight: 300;
		font-size: 28px;
		margin-bottom: 32px;
	}
}

.updates {
	.container {
		padding: 100px 25px;
		display: flex;
		flex-direction: column;
		align-items: center;

		@media (min-width: 800px) {
			padding: 125px 25px;
			flex-direction: row;
		}

		.routerButton {
			display: flex;
			font-size: 14px;
			text-decoration: none;

			@media (min-width: 800px) {
				margin-left: auto;
			}
		}

		h2 {
			font-weight: 300;
			font-size: 32px;
			max-width: 425px;
			width: 100%;
			text-align: center;
			text-transform: uppercase;

			@media (min-width: 800px) {
				text-align: initial;
				font-size: 40px;
			}
		}
	}
}
</style>
