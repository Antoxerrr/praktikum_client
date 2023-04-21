export const minLength = n => value => value.length >= n ? true : `Минимальная длина поля: ${n}.`;
export const maxLength = n => value => value.length <= n ? true : `Максимальная длина поля: ${n}.`;
export const required = value => value ? true : 'Это обязательное поле.'
export const emailRe = value => {
  let re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return value.match(re) ? true : 'Введите валидный email';
}

export default {
  minLength, maxLength, required, emailRe
};
