const mercadopago = require("mercadopago");
const accesToken =
  "TEST-2841731726731965-091418-fbd7cff6aeb75af4af564147d178a655-129930141";
const credential =
  process.env.MP || "TEST-dd615c19-c006-4dc1-964c-5c95a00577fa";
let server = process.env.SERVER || "http://localhost:3030";
const feedback = `${server}/checkout/feedback`;

const mp = async (items, cuotes, shipping) => {
  try {
    mercadopago.configure({ access_token: credential });
    let preference = {
      items: items.map((item) => {
        return Object({
          title: item.name,
          currency_id: "ARS",
          picture_url: `${server}/${item.image}`,
          quantity: item.quantity,
          unit_price: item.price,
        });
      }),
      back_urls: {
        success: feedback,
        failure: feedback,
        pending: feedback,
      },
      auto_return: "approved",
      statement_descriptor: "DH Shop",
      payment_methods: {
        installments: cuotes,
      },
      shipments: {
        cost: shipping,
        mode: "not_specified",
      },
    };
    return await mercadopago.preferences.create(preference);
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = mp;
