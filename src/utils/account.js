export const setAccount = (accountData) => {
  window.localStorage.setItem('account', JSON.stringify(accountData));
  return accountData;
};

export const getAccount = () => {
  const account = window.localStorage.getItem('account');
  return JSON.parse(account);
};

export const removeAccount = () => {
  window.localStorage.removeItem('account');
};

export default { setAccount, getAccount, removeAccount };
