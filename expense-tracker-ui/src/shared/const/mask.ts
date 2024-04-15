export const TEXT_MASK = /^[a-zA-Zа-яА-Я\s]{3,30}$/;
export const EMAIL_MASK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PASSWORD_MASK = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

// export const EMAIL_MASK_OPTIONS = {
//   mask: '', // Принимает любые символы
//   blocks: {
//     name: {
//       // Любые символы кроме пробелов и @ до @
//       mask: /^[^\s@]*$/
//     },
//     domain: {
//       // Любые символы после @ до точки
//       mask: /^[^\s@]*$/
//     },
//     topLevelDomain: {
//       // Домен верхнего уровня: от 2 до 5 латинских букв
//       mask: /^[a-zA-Z]{2,5}$/
//     }
//   },
//   // Паттерн, определяющий структуру email
//   pattern: '{name}@{domain}.{topLevelDomain}'
// };

// export const PASSWORD_MASK_OPTIONS = {
//   mask: /^[\w!@#$%^&*]{0,}$/, // Разрешаем буквы, цифры и некоторые спецсимволы
//   lazy: false, // Делает маску не "ленивой", т.е. она сразу активна
//   minLength: 8, // Минимальная длина пароля
//   maxLength: 50 // Максимальная длина пароля
// };
