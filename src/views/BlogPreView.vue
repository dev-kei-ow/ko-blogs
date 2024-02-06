<script>
export default {
	name: 'PostPreView',
	computed: {
		blogTitle() {
			return this.$store.state.blogTitle;
		},
		blogHTML() {
			return this.$store.state.blogHTML;
		},
		blogCoverPhoto() {
			return this.$store.state.blogPhotoFileURL;
		},
	},
};
</script>

<template>
	<div class="postView">
		<div class="container quillWrapper">
			<h2>{{ this.blogTitle }}</h2>
			<img :src="blogCoverPhoto" alt="" />
			<div class="post-content ql-editor" v-html="blogHTML"></div>
		</div>
	</div>
</template>

<style lang="scss">
.postView {
	min-height: 100%;

	.container {
		max-width: 1000px;
		padding: 60px 25px;
	}

	.ql-editor {
		padding: 0;
	}

	h2 {
		margin-bottom: 16px;
		font-weight: 300;
		font-size: 32px;
	}

	img {
		width: 100%;
		margin-bottom: 32px;
	}
}
</style>
