export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'Délesté.';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'Délesté.';
  const blogSubtitle = process.env.BLOG_SUBTITLE
    ? decodeURI(process.env.BLOG_SUBTITLE)
    : 'Gear packing by ';
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
