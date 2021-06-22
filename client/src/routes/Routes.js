import Cart from '../components/cart';
import Checkout from '../components/checkout';


const routes = [
    {
        path: '/',
        exact: true,
        component: Cart,
    },
    {
        path: '/checkout',
        exact: true,
        component: Checkout,
    },
    {
        path: '/result/error',
        exact: true,
        component: Cart,
    },

];

export default routes;
