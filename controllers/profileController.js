const getProfile = (req, res) => {
    // #swagger.tags = ['Profile']
    /* #swagger.security = [{
              "OAuth2": [
                  'read'
              ]
      }] */
    res.send(JSON.stringify(req.oidc.user));
  };
  
  module.exports = { getProfile };