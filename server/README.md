# E-commerce MERN Stack Project Overall Planning
 
- /test -> health check (D) ... done by (Jest)
- /seed -> seeding some data (D) ...

- /api/v1/users (D)
  
  - POST /register -> create a new user account (D) ...
  - POST /activate -> activate the user account (D) ...
  - GET /profile -> get the user account (D) ...
  - DELETE /del/:id -> delete particular user account by :id (D) ...
  - PUT/PATCH /edit/:id -> update particular user account by :id (D) ...
  - PUT/PATCH /update-password/:id (D) -> update the password :id ...
  - POST /forget-password (D) -> forget the password ...
  - PUT/PATCH /reset-password (D) -> reset the password ...
  - PUT/PATCH -Admin /ban/:id (D) -> ban the user ...
  - PUT/PATCH -Admin /unban/:id (D) -> unban the user ...
  - GET -Admin /export_users (D) -> export all the users into csv files ...
  - GET -Admin /all_users -> get all users including search & pagination (D) ...


- /api/v1/auth (JWT Auth)
  
  -POST /login -> isLoggedOut -> user login (D) ...
  -POST /logout -> isLoggedIn -> user logout (D) ...
  -GET /refresh -> get refresh token (D) ...


- Middlewares

  - isLoggedIn (D)
  - isLoggedOut (D)
  - isAdmin (D)
  - uploadFile (D)
  - getRefreshToken 
  - userValidation (D) ----> Performed by express-validator
  - runValidation/ sanitization (D)
  - validateItemId


- /api/v1/categories  (CRUD)


  -POST /add -> create all the category (Admin)
  -GET /list -> get all the category 
  -GET /list/:slug -> get particular category by :slug as id   
  -DELETE /del/:slug -> delete single category by :slug as id  (Admin)
  -PUT/PATCH /edit/:slug -> update single category by :slug as id  (Admin)


- /api/v1/products (CRUD)

  -POST /add -> create the product (Admin)
  -GET /list -> get all the products
  -GET /list/:slug -> get single product by :slug as id
  -GET /search/:keywords -> search products
  -PUT/PATCH /edit/:slug -> update single product by :slug as id (Admin)
  -DELETE /del/:slug -> delete single product by :slug as id (Admin)   

- /api/v1/sliders (CRUD) 

  -POST /add -> add slider (Admin)
  -GET /list -> get all slider products 
  -PUT/PATCH /edit/:slug -> update single slider by :slug as id (Admin)
  -DELETE /del/:slug -> delete single slider by :slug as id (Admin)  

- /api/v1/carts (CRUD) 

  -POST /add -> add product item to cart 
  -GET /list -> get all cart items
  -DELETE /remove-item-cart -> remove single item from cart 
  -DELETE /empty-cart -> emptied/ clear the entire cart  

- /api/v1/orders (CRUD)
 
  -POST /place -> create an order (User/Admin) for authenticated user
  -GET /view/:order_id -> view single order by :order_id (User/Admin)
  -GET /list -> get all orders (User/Admin)
  -GET /list/single -> get single order information (User/Admin) 
  -DELETE /cancel/:order_id -> cancel order by :order_id (User/Admin)
  -PUT/PATCH /edit/:order_id -> update single order by :order_id (Admin)


- /api/v1/payment

  -GET /token -> get the payment token (User/Admin)
  -POST /process-payment -> process the payment (User/Admin)

- package that we will needed 

    `npm install --save express cors multer http-errors body-parser bcryptjs jsonwebtoken  nodemailer cookie-parser`

    `npm install --save-dev morgan nodemon`




# E-Comm MERN Project - Daily Planning 

  1. Course plan
  2. Enviroment Setup
  3. Create express server -> express
  4. HTTP request & response
  5. nodemon and morgan package -> nodemon, morgan
  6. API testing with postman
  7. Middleware and types of middleware
  8. Express Error Handling Middleware -> body-parser
  9. How to handle HTTP errors -> http-errors
  10. How to secure API -> xss-clean, express-rate-limit
  11. Enviroment variables setup and .gitignore file
  12. MVC Architecture 
  13. MongoDb Database Connection (MongoDb Altas cloud Db and MongoDb Compass local Db for backup)
  14. User model and schema creation using mongoose ODM/ ORM package
  15. Create a seed route for testing
  16. GET /api/seed/users -> isLoggedIn -> isAdmin -> getAllUsers -> searchByNAME or, searchByEmail  + pagination functionality
  17. responseHandler controller for error or, success
  18. GET /api/v1/users/all_users/:id -> get a single user by :id
  19. How to create services in the backend
  20. DELETE /api/v1/users/del/:id -> delete single user by :id
  21. Refactoring and reusuability, code dynamic
  22. deleteImage helper
  23. POST /api/v1/users/register -> process the registration
      a. get the user info from request body
      b. check whether the user email exist in db or not
      c. if not then create jwt to store user's info temporarily into token 
      d. setup SMTP server and prepare mail
      e. send mail with link and jwt 
  24. POST /api/v1/users/verify -> verify user + register into database
      a. get token and verify jwt token
      b. if valid, then extract user's info from that token 
      c. save user's info into db...
  25. PUT/ /api/v1/users/edit/:id -> PATCH update single user by :id   
  26. Should we store image as string or, buffer ?
  27. POST /api/v1/auth/login -> isLoggedOut -> login user by using email and password as req body  
  28. POST /api/v1/auth/logout -> isLoggedIn -> user logout functionality
  29. Middlewares -> isLoggedIn, isLoogedOut, isAdmin
  30. GET /api/v1/auth/refresh -> get the refresh token 
  31. Input validation using express-validator third-party package for both login and registration
  32. PUT/PATCH /api/v1/users/ban-user/:id -> ban user
  33. PUT/PATCH /api/v1/users/unban-user/:id -> unban user
  34. PUT/PATCH /api/v1/users/update-password -> update the password
      a. extract email, oldPassword, newPassword, confirmedPassword
      b. check whether email exists -> isExist
      c. isPasswordMatched (oldPassword, password)
      d. setup update options
      e. response
  35. POST /api/v1/users/forget-password  -> forget the password 
      a. extract email, newPassword, security_ques
      b. check whether email exists -> isExist
      c. reset the newly created password
      d. send response
  36. GET /api/v1/auth/refresh -> get refresh token    
  37. GET /api/v1/auth/protected -> for frontend decision
  38. winston logger library (External library)
  39. create a category schema and model with Input validation 
  40. GET /api/v1/seed/categories -> seed categories with dummy data in DB for testing purposes
  41. CRUD category - create a category in db -> POST /api/v1/categories/add ->  create all the category (Admin)
  42. CRUD category - get categories from db -> 
        a. GET /api/v1/categories/list ->  get all the categories
        b. GET /api/v1/categories/list/:slug -> get particular category by :slug as id

  43. CRUD category - PUT/PATCH /edit/:slug -> update single category by :slug as id   (Admin)     
  44. CRUD category - DELETE /del/:slug -> delete single category by :slug as id   (Admin)
  45. Product Schema and Model 
  46. GET /api/v1/seed/products -> seed products with dummy data in DB for testing purposes
  47. CRUD - products -> POST /api/v1/products/add -> create the product (Admin)
  48. CRUD - products -> GET /api/v1/products/list -> get all the products
  49. CRUD - products -> GET /api/v1/products/list/:slug -> get single by :slug as id
  50. CRUD - products -> GET /api/v1/products/search/:keywords -> search products
  51. CRUD - products -> PUT/PATCH /api/v1/products/edit/:slug -> update single product by :slug as id (Admin)
  52. CRUD - products -> DELETE /api/v1/products/del/:slug -> delete single product by :slug as id (Admin) 
  53. CRUD - slider ->  POST /api/v1/sliders/add -> add slider (Admin)
  54. CRUD - slider ->  GET /api/v1/sliders/list -> get all slider products 
  54. CRUD - slider ->  PUT or, PATCH /api/v1/sliders/edit/:slug -> update single slider by :slug as id (Admin)
  55. CRUD - slider ->  DELETE /api/v1/sliders/del/:slug -> delete single slider by :slug as id (Admin)  
  56. CRUD - carts ->  POST /api/v1/carts/add -> add product item to cart 
  57. CRUD - carts ->  GET /api/v1/carts/list -> get all cart items
  58. CRUD - carts ->  DELETE /remove-item-cart -> remove single item from cart 
  59. CRUD - carts ->  DELETE /empty-cart -> emptied/ clear the entire cart  
  60. CRUD - orders -> GET /api/v1/orders/list -> get all orders (Admin)
  61. CRUD - orders -> POST /api/v1/orders/place -> create an order (User/Admin)
  62. CRUD - orders -> GET /api/v1/orders/list -> get all orders (User/Admin)
  63. CRUD - orders -> PUT/PATCH /api/v1/orders/edit/:order_id -> update single order by :order_id (Admin)
  64. CRUD - orders -> DELETE /api/v1/orders/cancel/:order_id -> cancel order by :order_id (User/Admin)
  65. CRUD - orders -> GET /api/v1/orders/list/single -> get single order (User/Admin)




