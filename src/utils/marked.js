import {marked} from "marked";
import hljs from "highlight.js";

const formatText = text => {
  text = text || '';
  // https://github.com/markedjs/marked/issues/190#issuecomment-865303317
  // marked.js не хочет переносить текст, если ставить больше одной пустой строки,
  // поэтому вручную пихаем <br>, при этом дописываем специальный data-атрибут,
  // потому что если создать code block в md разметке, то там начинает отображаться
  // этот <br>, и если мы будем просто делать code.replace(/<br>/g, ''),
  // то можем случайно убрать и нужные <br>, которые ввёл юзер сам
  return text.replace(/\n(?=\n)/g, "\n\n<br data-autobr>\n");
};

const highlight = (code, lang) => {
  // Тут опять костыль с переносами
  // Перенос с тремя \n заменяем на один \n, чтобы не было дофига переносов,
  // а вот второй вариант, где два \n нужен для первого вхождения переноса,
  // так как одна \n уходит в lang
  // Наверное это можно сделать круче, но я устал...
  code = code.replace(/\n\n<br data-autobr>\n/g, '\n').replace(/\n<br data-autobr>\n/g, '\n');
  lang = lang.replace(/<br>/g, '');
  try {
    return hljs.highlight(code, { language: lang }, true).value;
  } catch {}
};

export function markedRender(text) {
  const options = {
    highlight,
    breaks: true,
    sanitize: false
  };
  return marked(formatText(text), options);
}
