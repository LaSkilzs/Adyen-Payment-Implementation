// import Navbar from '../components/navbar';
import Product from '../components/product';
import Cart from '../components/cart';


const routes = [
    {
        path: '/',
        exact: true,
        component: Product,
    },
    {
        path: '/cart',
        exact: true,
        component: Cart,
    }
];

export default routes;
