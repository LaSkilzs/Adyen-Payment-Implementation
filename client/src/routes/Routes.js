// import Navbar from '../components/navbar';
import Product from '../components/product';
import Cart from '../components/cart';
import Checkout from '../components/checkout';
import ProductDetail from '../components/product/ProductDetail';


const routes = [
    {
        path: '/',
        exact: true,
        component: Product,
    },
    {
        path: "/productDetail/:id",
        exact: true,
        component: ProductDetail,
    },
    {
        path: '/cart',
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
        component: Product,
    },

];

export default routes;
