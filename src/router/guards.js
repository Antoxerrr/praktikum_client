import {useUserStore} from "@/store/user";

export const isAuthenticated = (to, from, next) => {
  const store = useUserStore();
  return store.isAuthenticated ? next(): next({ name: 'Login' });
};

export const isNotAuthenticated = (to, from, next) => {
  const store = useUserStore();
  return !store.isAuthenticated ? next() : next({name: 'Home'})
};

export default { isAuthenticated, isNotAuthenticated };
