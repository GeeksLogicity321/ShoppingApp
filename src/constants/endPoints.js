export default endPoints = {
  baseUrl: 'https://demowebsite.click/meat/',
  consumerKey: 'ck_4f86c521a909b2b30131070f18c3178be6b674fe',
  consumerSecret: 'cs_a17de7f40f8fb9aaa05b677cd481e9144930750e',
  version: 'wc/v3',

  // Products
  getProducts: 'products',

  // Auth
  getToken: `${this.baseUrl}wp-json/jwt-auth/v1/token`,
};
