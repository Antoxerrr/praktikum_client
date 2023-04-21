import router from "@/router";

export const pushToAuth = () => { router.push({ name: 'Login' }); }

export const pushToHome = () => { router.push({ name: 'Home' }); }

export default { pushToHome, pushToAuth };
