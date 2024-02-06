import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import BlogsView from '../views/BlogsView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import ForgotPasswordView from '../views/ForgotPasswordView.vue';
import ProfileView from '../views/ProfileView.vue';
import AdminView from '../views/AdminView.vue';
import CreatePostView from '../views/CreatePostView.vue';
import BlogPreView from '../views/BlogPreView.vue';
import BlogView from '../views/BlogView.vue';
import EditBlogView from '../views/EditBlogView.vue';

import { dbFireStore, doc, getDoc, firebaseAuth } from '@/firebase/firebaseInit';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomeView,
		meta: {
			title: 'Home',
			requiresAuth: false, // Esta ruta no requiere autenticación
		},
	},
	{
		path: '/blogs',
		name: 'Blogs',
		component: BlogsView,
		meta: {
			title: 'Blogs',
			requiresAuth: false, // Esta ruta no requiere autenticación
		},
	},
	{
		path: '/login',
		name: 'Login',
		component: LoginView,
		meta: {
			title: 'Login',
			requiresAuth: false, // Esta ruta no requiere autenticación
		},
	},
	{
		path: '/register',
		name: 'Register',
		component: RegisterView,
		meta: {
			title: 'Register',
			requiresAuth: false, // Esta ruta no requiere autenticación
		},
	},
	{
		path: '/forgot-password',
		name: 'ForgotPassword',
		component: ForgotPasswordView,
		meta: {
			title: 'Forgot Password',
			requiresAuth: false, // Esta ruta no requiere autenticación
		},
	},
	{
		path: '/profile',
		name: 'Profile',
		component: ProfileView,
		meta: {
			title: 'Profile',
			requiresAuth: true, // Esta ruta requiere autenticación
		},
	},
	{
		path: '/admin',
		name: 'Admin',
		component: AdminView,
		meta: {
			title: 'Admin',
			requiresAuth: true, // Esta ruta requiere autenticación
			requiresAdmin: true, // Esta ruta requiere ser administrador
		},
	},
	{
		path: '/create-post',
		name: 'CreatePost',
		component: CreatePostView,
		meta: {
			title: 'Create Post',
			requiresAuth: true, // Esta ruta requiere autenticación
			requiresAdmin: true, // Esta ruta requiere ser administrador
		},
	},
	{
		path: '/post-preview',
		name: 'BlogPreView',
		component: BlogPreView,
		meta: {
			title: 'Preview Blog Post',
			requiresAuth: true, // Esta ruta requiere autenticación
			requiresAdmin: true, // Esta ruta requiere ser administrador
		},
	},
	{
		path: '/blog-view/:blogid',
		name: 'BlogView',
		component: BlogView,
		meta: {
			title: 'Blog View Post',
			requiresAuth: false, // Esta ruta no requiere autenticación
		},
	},
	{
		path: '/edit-blog/:blogid',
		name: 'EditBlogView',
		component: EditBlogView,
		meta: {
			title: 'Edit Blog Post',
			requiresAuth: true, // Esta ruta requiere autenticación
			requiresAdmin: true, // Esta ruta requiere ser administrador
		},
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach(async (to, from, next) => {
	document.title = `${to.meta.title} | FireBlog`;

	let user = firebaseAuth.currentUser;
	let admin = null;

	if (user) {
		const userDoc = doc(dbFireStore, 'users', user.uid);
		const userData = await getDoc(userDoc);
		admin = userData.data().admin;
	}

	if (to.matched.some((res) => res.meta.requiresAuth)) {
		if (user) {
			if (to.matched.some((res) => res.meta.requiresAdmin)) {
				if (admin) {
					return next();
				}
				return next({ name: 'Home' });
			}
			return next();
		}
		return next({ name: 'Home' });
	}
	return next();
});

export default router;
