<script>
import BlogCoverPreview from '@/components/BlogCoverPreview.vue';
import Loading from '@/components/Loading.vue';

import {
	dbFireStore,
	collection,
	doc,
	setDoc,
	firebaseStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from '@/firebase/firebaseInit';

const Quill = require('quill');
const ImageResize = require('quill-image-resize').default;

Quill.register('modules/imageResize', ImageResize);

export default {
	name: 'CreatePostView',
	components: { BlogCoverPreview, Loading },
	data() {
		return {
			file: null,
			error: null,
			errorMsg: null,
			loading: null,
			editorSettings: {
				modules: {
					imageResize: true,
				},
			},
		};
	},

	methods: {
		fileChange() {
			this.file = this.$refs.blogPhoto.files[0];
			const fileName = this.file.name;
			this.$store.commit('fileNameChange', fileName);
			this.$store.commit('createFileURL', URL.createObjectURL(this.file));
		},

		openPreview() {
			this.$store.commit('openPhotoPreview');
		},

		imageHandler(file, Editor, cursorLocation, resetUploader) {
			const storageRef = ref(firebaseStorage, `documents/blogPostPhotos/${file.name}`);

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				'state_changed',
				(snapshot) => {
					console.log(snapshot);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						Editor.insertEmbed(cursorLocation, 'image', downloadURL);
						resetUploader();
					});
				}
			);
		},

		async uploadBlog() {
			if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
				if (this.file) {
					this.loading = true;
					const storageRef = ref(
						firebaseStorage,
						`documents/blogCoverPhotos/${this.$store.state.blogPhotoName}`
					);

					const uploadTask = uploadBytesResumable(storageRef, this.file);

					uploadTask.on(
						'state_changed',
						(snapshot) => {
							console.log(snapshot);
						},
						(err) => {
							console.log(err);
							this.loading = false;
						},
						async () => {
							const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
							const timestamp = Date.now();
							const blogPostsCollection = collection(dbFireStore, 'blogPosts');

							//++ genera un nuevo ID para el documento
							const newBlogPostId = doc(blogPostsCollection).id;

							const newBlogPost = {
								blogID: newBlogPostId,
								blogHTML: this.blogHTML,
								blogCoverPhoto: downloadURL,
								blogCoverPhotoName: this.blogCoverPhotoName,
								blogTitle: this.blogTitle,
								profileId: this.profileId,
								date: timestamp,
							};

							this.loading = false;

							//++ crea el documento con el ID específico
							await setDoc(doc(blogPostsCollection, newBlogPostId), newBlogPost);
							console.log('Documento escrito con ID: ', newBlogPostId);

							//++ obtén los posts actualizados
							await this.$store.dispatch('getPost');

							//++ redirige a la ruta con el postID
							this.$router.push({ name: 'BlogView', params: { blogid: newBlogPostId } });
						}
					);

					return;
				}

				this.error = true;
				this.errorMsg = '¡Asegúrate de haber subido una foto de portada!';

				setTimeout(() => {
					this.error = false;
				}, 5000);
				return;
			}

			this.error = true;
			this.errorMsg =
				'¡Asegúrese de que el título del blog y la publicación del blog estén completos!';

			setTimeout(() => {
				this.error = false;
			}, 5000);

			return;
		},
	},
	computed: {
		profileId() {
			return this.$store.state.profileId;
		},
		blogCoverPhotoName() {
			return this.$store.state.blogPhotoName;
		},
		blogTitle: {
			get() {
				return this.$store.state.blogTitle;
			},
			set(payload) {
				this.$store.commit('updateBlogTitle', payload);
			},
		},
		blogHTML: {
			get() {
				return this.$store.state.blogHTML;
			},
			set(payload) {
				this.$store.commit('newBlogPost', payload);
			},
		},
	},
};
</script>

<template>
	<div class="createPost">
		<BlogCoverPreview v-show="this.$store.state.blogPhotoPreview" />
		<Loading v-show="loading" />

		<div class="container">
			<div class="errMessage" :class="{ invisible: !error }">
				<p><span>Error:</span> {{ this.errorMsg }}</p>
			</div>
			<div class="blogInfo">
				<input type="text" placeholder="Ingrese el título del blog" v-model="blogTitle" />
				<div class="uploadFile">
					<label for="blogPhoto">Subir foto de portada</label>
					<input
						type="file"
						ref="blogPhoto"
						id="blogPhoto"
						@change="fileChange"
						accept=".png, .jpg, .jpeg" />
					<button
						class="preview"
						:class="{ buttonInactive: !this.$store.state.blogPhotoFileURL }"
						@click="openPreview">
						Vista previa de la foto
					</button>
					<span>Archivo elegido: {{ this.$store.state.blogPhotoName }}</span>
				</div>
			</div>
			<div class="editor">
				<vue-editor
					:editorOptions="editorSettings"
					v-model="blogHTML"
					useCustomImageHandler
					@image-added="imageHandler" />
			</div>

			<div class="blogActions">
				<button @click="uploadBlog">Publicar Blog</button>
				<router-link class="routerButton" :to="{ name: 'BlogPreView' }"
					>Vista previa del Post</router-link
				>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.createPost {
	position: relative;
	height: 100%;

	button {
		margin-top: 0;
	}

	.routerButton {
		text-decoration: none;
		color: #fff;
	}

	label,
	button,
	.routerButton {
		transition: 0.5s ease-in-out all;
		align-self: center;
		font-size: 14px;
		cursor: pointer;
		border-radius: 20px;
		padding: 12px 24px;
		color: #fff;
		background-color: #303030;
		text-decoration: none;

		&:hover {
			background-color: rgba(48, 48, 48, 0.7);
		}
	}

	.container {
		position: relative;
		height: 100%;
		padding: 10px 25px 60px;
	}

	// error styling
	.invisible {
		opacity: 0 !important;
	}

	.errMessage {
		width: 100%;
		padding: 12px;
		border-radius: 8px;
		color: #fff;
		margin-bottom: 10px;
		background-color: #303030;
		opacity: 1;
		transition: 0.5s ease all;

		p {
			font-size: 14px;
		}

		span {
			font-weight: 600;
		}
	}

	.blogInfo {
		display: flex;
		margin-bottom: 32px;

		input:nth-child(1) {
			min-width: 300px;
		}

		input {
			transition: 0.5s ease-in-out all;
			padding: 10px 4px;
			border: none;
			border-bottom: 1px solid #303030;

			&:focus {
				outline: none;
				box-shadow: 0 1px 0 0 #303030;
			}
		}

		.uploadFile {
			flex: 1;
			margin-left: 16px;
			position: relative;
			display: flex;

			input {
				display: none;
			}

			.preview {
				margin-left: 16px;
				text-transform: initial;
			}

			span {
				font-size: 12px;
				margin-left: 16px;
				align-self: center;
			}
		}
	}

	.editor {
		height: 60vh;
		display: flex;
		flex-direction: column;

		.quillWrapper {
			position: relative;
			display: flex;
			flex-direction: column;
			height: 100%;
		}

		.ql-container {
			display: flex;
			flex-direction: column;
			height: 100%;
			overflow: scroll;
		}

		.ql-editor {
			padding: 20px 16px 30px;
		}
	}

	.blogActions {
		margin-top: 32px;

		button {
			margin-right: 16px;
		}
	}
}
</style>
