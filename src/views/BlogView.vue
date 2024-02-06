<script>
export default {
	name: 'BlogView',

	data() {
		return {
			currentBlog: null,
		};
	},

	async mounted() {
		this.currentBlog = await this.$store.state.blogPosts.find((post) => {
			return post.blogID === this.$route.params.blogid;
		});
	},
};
</script>

<template>
	<div class="postView" v-if="currentBlog">
		<div class="container quillWrapper">
			<h2>{{ this.currentBlog.blogTitle }}</h2>
			<h4>
				Publicado el:
				{{
					new Date(this.currentBlog.blogDate).toLocaleString('en-us', { dateStyle: 'long' })
				}}
			</h4>
			<img :src="this.currentBlog.blogCoverPhoto" alt="" />
			<div class="post-content ql-editor" v-html="this.currentBlog.blogHTML"></div>
		</div>
	</div>
</template>

<style lang="scss">
.postView {
	h4 {
		font-weight: 400;
		font-size: 14px;
		margin-bottom: 24px;
	}
}
</style>
