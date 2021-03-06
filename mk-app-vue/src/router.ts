import Router, { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [{ path: '/', redirect: '/home' }];

const router = new Router({
	mode: 'history',
	routes,
});

export default router;
