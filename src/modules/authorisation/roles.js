const AccessControl = require("accesscontrol");
const myAccess = new AccessControl();
 
exports.roles = (function() {
    myAccess.grant("user")
    .createOwn('profile')
    .readOwn("profile")
    .updateOwn("profile")

    myAccess.grant("admin")
    .extend("user")
    .updateAny("profile")
    .deleteAny("profile")
 
return myAccess;
})();