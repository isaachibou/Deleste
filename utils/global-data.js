export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'Isaac Hibou';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'Voyager Léger';
  const blogSubtitle = process.env.BLOG_SUBTITLE
    ? decodeURI(process.env.BLOG_SUBTITLE)
    : 'Le petit projet d\'été de Zaki';
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
