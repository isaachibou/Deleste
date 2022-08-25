export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'Allégé.';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'Allégé...  ';
  const blogSubtitle = process.env.BLOG_SUBTITLE
    ? decodeURI(process.env.BLOG_SUBTITLE)
    : 'A humble summer project by ';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    blogSubtitle,
    footerText,
  };
};
