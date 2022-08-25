import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";


const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (!localStorage.token) {
//             next({ name: "login", query: { redirect: to.fullPath } });
//         } else {
//             next();
//         }
//     } else {
//         next();
//     }
// });

export default router;
