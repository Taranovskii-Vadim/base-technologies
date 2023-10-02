// root
const TEXT_TYPE = "TEXT_ELEMENT";

const createElement = (type, props, ...children) => ({
  type,
  props: {
    ...props,
    children: children.map((item) =>
      typeof item === "object"
        ? item
        : {
            type: TEXT_TYPE,
            props: {
              nodeValue: item,
              children: [],
            },
          }
    ),
  },
});

const render = (element, container) => {
  const dom =
    element.type === TEXT_TYPE
      ? document.createTextNode("")
      : document.createElement(element.type);

  Object.keys(element.props)
    .filter((key) => key !== "children")
    .forEach((name) => {
      dom[name] = element.props[name];
    });

  //   bad solution. If the tree is big, it can block main thread, because when we start render we will not stop it
  //   until render the full tree. Should think about concurent mode
  element.props.children.forEach((item) => render(item, dom));

  container.appendChild(dom);
};

const myReact = { createElement };

const myReactDOM = { render };

// app

const element = myReact.createElement(
  "div",
  { id: "foo" },
  myReact.createElement("a", { style: "color: red" }, "foo"),
  myReact.createElement("a", { style: "color: blue" }, "bar")
);

myReactDOM.render(element, document.getElementById("root"));
