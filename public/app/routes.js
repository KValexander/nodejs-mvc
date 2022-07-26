/* Routes */
route.use("/", controllers.main); // main page
route.use("/add", controllers.add); // add product page

route.use("/register", controllers.register); // register page
route.use("/login", controllers.login); // login page

route.use("/client", controllers.client); // client page