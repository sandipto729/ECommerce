const backendDomin = "http://localhost:3000";

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/logout`,
        method: 'POST'
    },
    all_users: {
        url: `${backendDomin}/api/all-users`,
        method: 'POST'
    },
    update_user: {
        url: `${backendDomin}/api/update-user`,
        method: "put"
    },
    upload_product:{
        url: `${backendDomin}/api/upload-product`,
        method: "post"
    },
    all_product:{
        url: `${backendDomin}/api/get-product`,
        method: "get"
    },
    update_product:{
        url: `${backendDomin}/api/update-product`,
        method: "post"
    },
    get_catagoryProduct:{
        url: `${backendDomin}/api/get-catagoryProduct`,
        method: "post"
    },
    get_productById:{
        url: `${backendDomin}/api/get-productById`,
        method: "post"
    },
    addToCartProduct:{
        url: `${backendDomin}/api//add-to-cart`,
        method: "post"
    },
    countCartProduct:{
        url: `${backendDomin}/api/countcartProduct`,
        method: "get"
    },
    cartView:{
        url: `${backendDomin}/api/get-cartProduct`,
        method: "get"
    },
    cartEdit:{
        url: `${backendDomin}/api/cart-edit`,
        method: "post"
    },
    cartDelete:{
        url: `${backendDomin}/api/delete-cartProduct`,
        method: "delete"
    },
    searchProduct:{
        url: `${backendDomin}/api/search-product`,
        method: "get"
    }
}

export default SummaryApi;
