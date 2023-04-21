import {useLoadingStore} from "@/store/loading";

const loading = value => useLoadingStore().setLoading(value);

export const startGlobalLoading = () => loading(true);
export const stopGlobalLoading = () => loading(false);

export default { startGlobalLoading, stopGlobalLoading }
