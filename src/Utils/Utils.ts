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

const validatingURL = function validatingURL(str) {
  const res = str
    // eslint-disable-next-line no-useless-escape
    .match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
  return (res !== null);
};

const randomInteger = function randomInteger(max: number) {
  const random = Math.random() * (max + 1);
  return Math.floor(random);
};

export {
  renderElement, getDistinct, validatingURL, randomInteger, 
};
