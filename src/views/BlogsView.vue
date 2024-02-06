<script>
import BlogCard from '@/components/BlogCard.vue';

export default {
	name: 'BlogsView',
	components: { BlogCard },

	computed: {
		blogPosts() {
			return this.$store.state.blogPosts;
		},

		editPost: {
			get() {
				return this.$store.state.sampleBlogCards;
			},

			set(payload) {
				this.$store.commit('toggleEditPost', payload);
			},
		},
		admin() {
			return this.$store.state.profileAdmin; //agrega la propiedad computada admin
		},
	},

	beforeDestroy() {
		this.$store.commit('toggleEditPost', false);
	},
};
</script>

<template>
	<div class="blogCardWrap">
		<div class="blogCards container">
			<div v-if="admin" class="toggleEdit">
				<span>Habilitar edición de post</span>
				<label class="switch">
					<input type="checkbox" v-model="editPost" />
					<span class="slider"></span>
				</label>
			</div>

			<BlogCard :post="post" v-for="(post, index) in blogPosts" :key="index" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
.blogCards {
	position: relative;

	.toggleEdit {
		display: flex;
		align-items: center;
		position: absolute;
		top: -70px;
		right: 0;

		span {
			margin-right: 16px;
		}

		.switch {
			position: relative;
			display: inline-block;
			width: 76px;
			height: 30px;
		}

		.switch input {
			opacity: 0;
			width: 0;
			height: 0;
		}

		.slider {
			position: absolute;
			cursor: pointer;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: #ccc;
			transition: 0.4s;
			border-radius: 34px;
		}

		.slider:before {
			position: absolute;
			content: '';
			height: 23px;
			width: 23px;
			left: 4px;
			bottom: 4px;
			background-color: white;
			transition: 0.4s;
			border-radius: 50%;
		}

		input:checked + .slider {
			background-color: #303030;
		}

		input:checked + .slider:before {
			transform: translateX(26px);
		}
	}
}
</style>
