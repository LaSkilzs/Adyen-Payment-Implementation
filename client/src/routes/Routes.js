import Cart from '../components/cart';
import Checkout from '../components/checkout';
import ThankYou from '../components/checkout/ThankYou';


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
        component: ThankYou,
    },

];

export default routes;
