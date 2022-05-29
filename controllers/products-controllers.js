const path = require("path");

module.exports = {

    detail: (req, res) => {
        res.render(path.join(__dirname, "../views/productDetail.ejs"));
    },
    cart: (req, res) => {
        res.render(path.join(__dirname, "../views/productCart.ejs"));
    },
};
