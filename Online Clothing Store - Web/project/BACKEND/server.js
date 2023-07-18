const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const users = require("./routes/users");
const cartProductRoutes = require('./routes/cartProductRoutes');
const checkoutInfo = require('./routes/checkoutRoutes');
const orderInfo = require('./routes/orderRoutes')
const deliveryRoutes = require('./routes/deliveryRoutes');
const router = require("./routes/product-routes");
const memberships = require("./routes/memberships");

const finance = require("./routes/FinanceRoute");

const cartA = require("./routes/cartAroute");

const payment = require("./routes/paycustomers");

const productButton = require("./routes/buttonClick");


// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(cors());

//recieve json format data
app.use(express.json());


// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose.connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));

// Routes
app.use("/users", users);
app.use('/api/cart/', cartProductRoutes);
app.use('/api/checkout/', checkoutInfo);
app.use('/api/Order/',orderInfo );
app.use('/api/cartA/',cartA );

app.use("/products", router);
app.use("/memberships", memberships);

app.use('/api/delivery', deliveryRoutes);
app.use("/products", router);
app.use("/product-button", productButton);


const tailoringInfo = require('./routes/tailoringInfo.js');
app.use('/tailoringInfo', tailoringInfo);

app.use('/api/finance', finance)
app.use('/paycustomers', payment)

