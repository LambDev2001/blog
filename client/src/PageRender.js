import React from "react";
import { useParams } from "react-router-dom";
import NotFound from './components/global/NotFound.jsx';

const generatePage = (name) => {
  const component = () => require(`./pages/${name}`).default;

  try {
    return React.createElement(component());
  } catch (error) {
    return <NotFound />
  }
};

const PageRender = () => {
  const { role, page, slug } = useParams();
  let name = "";

  if (page) {
    name = slug ? `${role}/${page}/[slug]` : `${role}/${page}`;
  }

  return generatePage(name);
};

export default PageRender;
