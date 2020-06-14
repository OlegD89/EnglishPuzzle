/* eslint-disable no-useless-escape */
const renderElement = function renderElement<K extends keyof HTMLElementTagNameMap>(layout: Node,
  type: K, classes: string, text: string = undefined): HTMLElementTagNameMap[K] {
  const element = document.createElement(type);
  if (classes) element.className = classes;
  if (text) element.textContent = text;
  if (layout) layout.appendChild(element);
  return element;
};

const onlyUnique = function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
};

const getDistinct = function getDistinct<T>(array: T[]): T[] {
  return array.filter(onlyUnique);
};

const validateURL = function validateURL(url: string) {
  const res = url
    .match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null);
};

function validateEmail(email: string) {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const checkPassword = function CheckPassword(password: string) {
  const decimal = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return !!password.match(decimal);
};

const randomInteger = function randomInteger(max: number) {
  const random = Math.random() * (max + 1);
  return Math.floor(random);
};

const shuffle = function shuffle(arrayInput: any[]) {
  const array = [...arrayInput];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const arrayPopByKey = function arrayPopByKey(array, key, value) {
  const elementIndex = array.findIndex((o) => o[key] === value);
  const element = array[elementIndex];
  array.splice(elementIndex, 1);
  return element;
};

export {
  renderElement, getDistinct, validateURL, randomInteger, checkPassword, validateEmail,
  shuffle, arrayPopByKey,
};
