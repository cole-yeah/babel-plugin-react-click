import * as t from "@babel/types";
import jsx from "babel-plugin-syntax-jsx";
import { Visitor, NodePath } from "@babel/traverse";

const BASE_ATTR_NAME = "onClick";

// 根据onClick属性获取函数值
const getTargetValue = (jsxElement: NodePath) => {
  const { attributes } = jsxElement.openingElement;
  let value;
  // 找到onClick属性
  attributes.some((attr) => {
    if (attr.name && attr.name.name === BASE_ATTR_NAME) {
      value = attr.value;
      return true;
    }
  });
  return value;
};

const babelPluginReactClick = () => {
  const visitor: Visitor = {
    JSXElement(path: NodePath, state) {
      const { node } = path;
      const value = getTargetValue(node);
      if (!value) return;
      // TODO: 怎么对value里面的函数进行增加防抖替换呢？
    },
  };
  return {
    inherits: jsx,
    name: "babel-plugin-react-click",
    visitor,
  };
};

export default babelPluginReactClick;
