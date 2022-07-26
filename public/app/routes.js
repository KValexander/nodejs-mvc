/* Routes */
route.use("/", controllers.main_page); // main page
route.use("/add", controllers.add_page); // add product page

route.use("/register", controllers.register_page); // register page
route.use("/login", controllers.login_page); // login page

route.use("/client", controllers.client_page); // client page