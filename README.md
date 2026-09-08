# OliveBridge

🌿 **Live Demo:** https://olive-bridge.netlify.app

OliveBridge is a digital showcase and e-commerce platform for an Italian extra virgin olive oil producer from Puglia, with a focus on the Japanese market.

The application presents Italian olive oil products, their characteristics and stories, while providing different experiences for individual customers, business users and administrators.

This project was developed as part of a Full Stack Web Development capstone project.

---

## Features

### Public area

- Home page
- Hero image carousel
- Featured products carousel
- Product catalog
- Product details
- Product formats and prices
- Technical information
- Shopping cart
- Guest checkout

### Registered users

- Registration
- Login
- Personal profile
- Saved addresses
- Favourite products
- Persistent shopping cart
- Checkout as a registered user

### Business users

- Dedicated Business area
- Request product samples
- Submit business inquiries
- View submitted requests and inquiries

### Admin area

- Protected admin dashboard
- Product management
- Create and edit products
- Activate and deactivate products
- Category management
- Technical information management
- View sample requests
- View business inquiries
- View registered buyers

---

## Technologies

- React
- TypeScript
- Vite
- Redux Toolkit
- React Redux
- React Router
- React Bootstrap
- Bootstrap
- CSS

---

## External Libraries

### Embla Carousel

OliveBridge uses [Embla Carousel](https://www.embla-carousel.com/) for the horizontal carousel in the Featured Products section of the Home page.

The library provides the carousel functionality, while the layout and visual appearance are customized through the project's CSS.

### React Bootstrap

[React Bootstrap](https://react-bootstrap.github.io/) is used for responsive UI components, including:

- Navbar
- Buttons
- Cards
- Containers
- Grid layout
- Forms
- Carousel

### Redux Toolkit

[Redux Toolkit](https://redux-toolkit.js.org/) is used for global application state management.

The Redux store manages different areas of the application, including:

- User authentication
- Products
- Product variants
- Shopping cart
- Favourites
- Addresses
- Business inquiries
- Sample requests

---

## Project Structure

The frontend follows a component-based architecture.

```text
src/
├── components/
├── pages/
├── redux/
│   ├── actions/
│   ├── reducers/
│   └── store/
├── types/
├── App.tsx
├── App.css
└── index.css
```
---

## Backend Integration

OliveBridge Frontend communicates with the OliveBridge Backend through REST API requests.

The backend repository is available here:

[OliveBridge Backend](https://github.com/Vals098/olive_bridge_BE.git)

The frontend consumes the backend APIs for:

- Authentication
- Products
- Product variants
- Users
- Orders
- Addresses
- Favourites
- Sample requests
- Business inquiries
- Admin operations

API requests are handled through Redux actions and React components.

---

## Authentication

The application uses JWT authentication provided by the backend.

After a successful login, the JWT token is stored locally and used to access protected resources.

The application supports different user experiences:

- Guest users
- Individual users
- Business users
- Administrators

Protected frontend routes are handled through dedicated route components, while the backend performs the final authentication and authorization checks.

---

## Guest Checkout

OliveBridge allows users to complete an order without creating an account.

Guests can:

1. Browse the product catalog
2. Add products to the cart
3. Proceed to checkout
4. Enter their shipping information
5. Complete the order

Users can also choose to log in or register before completing checkout.

The shopping cart is preserved when a guest logs in, allowing the user to continue the checkout process without losing the selected products.

---

## Business Features

OliveBridge provides dedicated features for business users.

Business users can:

- Request product samples
- Submit business inquiries
- View their submitted requests
- View their submitted inquiries

The frontend provides the dedicated Business area and forms, while the backend verifies the user's account type before allowing business-only operations.

---

## Admin Features

The application includes a dedicated admin area accessible only to administrators.

Administrators can:

- View all products
- Create products
- Edit products
- Activate products
- Deactivate products
- Create categories
- Create technical information
- View sample requests
- View business inquiries
- View registered buyers

The frontend protects the admin routes through an `AdminRoute` component, while the backend performs the final authorization check.

---

## Images and Credits

The project uses a combination of AI-generated images and photographs from Pexels.

AI-generated images were created specifically for the OliveBridge project.

External images and their sources are documented in:

[IMAGE-CREDITS.md](IMAGE-CREDITS.md)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Vals098/olive_bridge_FE.git
```
---

## Future Improvements

Possible future developments include:

- Complete Italian / English / Japanese interface
- Japanese address autocomplete
- Email notifications
- Advanced product filtering
- Payment integration
- Additional product types

---

## Project

**OliveBridge**

Full Stack Web Development Capstone Project

Frontend developed with React, TypeScript, Redux Toolkit and React Bootstrap.

---

## Author

Valeria Farinosi
