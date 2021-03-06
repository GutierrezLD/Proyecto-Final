const axios = require("axios");
const { modifyStockPaypal } = require("../middlewares/middlewares");
const {
  createPurchaseOrder,
  createPurchaseCompleted,
  createPurchaseCanceled,
} = require("./purchase_order");

const createOrder = async (req, res) => {
  const { purchase_units, user, local, address } = req.body;
  try {
    const order = {
      intent: "CAPTURE",
      purchase_units: purchase_units,
      application_context: {
        //No requerido, pero añade un montón de info extra bastante útil, aparte de dos métodos para redireccionar al usuario que son bastante como útiles.
        brand_name: "Mercadon't Libre", //String. 127 max length. Nombre de la marca del sitio en PayPal.
        landing_page: "LOGIN", //ENUM. LOGIN: si acepta el pago lo lleva a la página para loggearse en PP. BILLING: lo lleva a la página para poner la info de tarjeta de crédito/débito en PP. NO_PREFERENCE: dependiendo de si está logeado o no en PP va al login o al billing.
        user_action: "PAY_NOW", //ENUM. CONTINUE: básicamente si el sitio no te dio toda la info porque cosas usar este. Más "confianza", ponele. PAY_NOW: cobrale ahora y que se cague.
        return_url: `${process.env.HOST_PORT_BACK}/buying/payPal/capture-order`, //Si todo sale bien (acepta el pago) devolvelo a esta página.
        cancel_url: `${process.env.HOST_PORT_BACK}/buying/payPal/cancel-order`, //Si el muchacho cancela traelo para acá.
      },
    };
    //Sí o sí hay que hacerlo así porque no se puede enviar un "grant-type", "client_credentials" así nomás al segundo argumento de la petición POST.
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(`${process.env.PAYPAL_API}/v1/oauth2/token`, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET,
      },
    });

    const { data } = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    createPurchaseOrder(data.id, user, local, purchase_units[0].amount.value, address);
    res.status(200).send(data.links[1].href);
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .send(
        "Nope. Something went wrong while trying to generate the purchase order."
      );
  }
};

const captureOrder = async (req, res) => {
  let completedOrder;
  const { token } = req.query;

  const stock = await modifyStockPaypal(token)
  if (!stock) {
    createPurchaseCanceled(req.query?.token)
    return res.status(400).redirect(`${process.env.HOST_PORT_FRONT}/cart?buy=noStock`);
  }

  const { data } = await axios.post(
    `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
    {},
    {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_CLIENT_SECRET,
      },
    }
  );

  completedOrder = createPurchaseCompleted(data.id)
  res.status(200).redirect(`${process.env.HOST_PORT_FRONT}/cart?buy=true`);
};

const cancelOrder = (req, res) => {
  let canceledOrder;
  canceledOrder = createPurchaseCanceled(req.query?.token)
  res.status(200).redirect(`${process.env.HOST_PORT_FRONT}/cart?buy=false`);
};

module.exports = {
  createOrder,
  captureOrder,
  cancelOrder,
};
