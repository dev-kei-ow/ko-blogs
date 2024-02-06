import Vue from 'vue';
import Vuex from 'vuex';

import {
	dbFireStore,
	firebaseAuth,
	collection,
	doc,
	getDoc,
	query,
	orderBy,
	getDocs,
	updateDoc,
	deleteDoc,
} from '@/firebase/firebaseInit';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		blogPosts: [],
		postLoaded: null,
		blogHTML: '...',
		blogTitle: '',
		blogPhotoName: '',
		blogPhotoFileURL: null,
		blogPhotoPreview: null,
		editPost: null,
		user: null,
		profileEmail: null,
		profileFirstName: null,
		profileLastName: null,
		profileUsername: null,
		profileId: null,
		profileAdmin: null,
		profileInitials: null,
	},
	getters: {
		blogPostsFeed(state) {
			return state.blogPosts.slice(0, 2);
		},

		blogPostsCards(state) {
			return state.blogPosts.slice(2, 6);
		},
	},
	mutations: {
		newBlogPost(state, payload) {
			state.blogHTML = payload;
			// console.log(state.blogHTML);
		},

		updateBlogTitle(state, payload) {
			state.blogTitle = payload;
		},

		fileNameChange(state, payload) {
			state.blogPhotoName = payload;
		},

		createFileURL(state, payload) {
			state.blogPhotoFileURL = payload;
		},

		openPhotoPreview(state) {
			state.blogPhotoPreview = !state.blogPhotoPreview;
		},

		toggleEditPost(state, payload) {
			state.editPost = payload;
			// console.log(state.editPost);
		},

		updateUser(state, payload) {
			state.user = payload;
		},

		setBlogState(state, payload) {
			state.blogTitle = payload.blogTitle;
			state.blogHTML = payload.blogHTML;
			state.blogPhotoFileURL = payload.blogCoverPhoto;
			state.blogPhotoName = payload.blogCoverPhotoName;
		},

		filterBlogPost(state, payload) {
			state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
		},

		setProfileInfo(state, doc) {
			if (doc.exists()) {
				//++ verifica si el documento existe
				const data = doc.data(); //llama a la función data para obtener los datos del documento

				state.profileId = doc.id; //doc.id es correcto, el id es una propiedad del DocumentSnapshot
				state.profileEmail = data.email;
				state.profileFirstName = data.firstName;
				state.profileLastName = data.lastName;
				state.profileUsername = data.username;
			}
		},

		setProfileInitials(state) {
			state.profileInitials =
				state.profileFirstName.match(/(\b\S)?/g).join('') +
				state.profileLastName.match(/(\b\S)?/g).join('');
		},

		setProfileAdmin(state, isAdmin) {
			state.profileAdmin = isAdmin;
		},

		changeFirstName(state, payload) {
			state.profileFirstName = payload;
		},
		changeLastName(state, payload) {
			state.profileLastName = payload;
		},
		changeUsername(state, payload) {
			state.profileUsername = payload;
		},
	},
	actions: {
		async getCurrentUser({ commit }) {
			const currentUser = firebaseAuth.currentUser;

			//++ verifica si el usuario está autenticado
			if (currentUser) {
				const userCollection = collection(dbFireStore, 'users');
				const userDoc = doc(userCollection, currentUser.uid);
				const dbResults = await getDoc(userDoc);

				commit('setProfileInfo', dbResults);
				commit('setProfileInitials');
				commit('setProfileAdmin', dbResults.data().admin); // establece el valor de profileAdmin

				// console.log(dbResults);
			}
		},

		async updateUserSettings({ commit, state }) {
			const userCollection = collection(dbFireStore, 'users');
			const userDoc = doc(userCollection, state.profileId);

			await updateDoc(userDoc, {
				firstName: state.profileFirstName,
				lastName: state.profileLastName,
				username: state.profileUsername,
			});

			commit('setProfileInitials');
		},

		async getPost({ state }) {
			const dataBase = query(collection(dbFireStore, 'blogPosts'), orderBy('date', 'desc'));

			const dbResults = await getDocs(dataBase);

			dbResults.forEach((doc) => {
				if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
					const data = {
						blogID: doc.data().blogID,
						blogHTML: doc.data().blogHTML,
						blogCoverPhoto: doc.data().blogCoverPhoto,
						blogTitle: doc.data().blogTitle,
						blogDate: doc.data().date,
						blogCoverPhotoName: doc.data().blogCoverPhotoName,
					};

					state.blogPosts.push(data);
				}
			});

			state.postLoaded = true;
			// console.log(state.blogPosts);
		},

		async updatePost({ commit, dispatch }, payload) {
			commit('filterBlogPost', payload);

			await dispatch('getPost');
		},

		async deletePost({ commit }, payload) {
			const postDoc = doc(dbFireStore, 'blogPosts', payload);
			await deleteDoc(postDoc);
			commit('filterBlogPost', payload);
		},
	},
	modules: {},
});
