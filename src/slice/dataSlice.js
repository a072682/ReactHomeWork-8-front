import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const dataSlice = createSlice({
  name: 'data', //名稱
  initialState: { //初始數值
    originData:[],//單頁式產品資訊
    articleData:[],//所有文章資料
    allOriginData:[],//所有產品資訊
    ProductData:[],//單一產品
    cartData:[],//購物車資料
    userData:{},
    orderIdData:"",//訂單號碼資料
    ProductsMask:false,//遮罩開關
  },
  reducers: {
    originDataUp:(state, action) => {
        state.originData = action.payload; // 儲存頁面產品資訊
    },
    articleDataUp:(state, action) => {
        state.articleData = action.payload; // 儲存所有文章資訊
    },
    allOriginDataUp:(state, action) => {
        state.allOriginData = action.payload; // 儲存所有產品資訊
    },
    productDataUp:(state, action) => {
        state.ProductData = action.payload; // 儲存單一產品資訊
    },
    cartDataUp:(state, action) => {
        state.cartData = action.payload; // 儲存購物車資料    
    },
    cartDataGet:(state, action) => {
        //取得localStorage的付款者資料
        const cartData = JSON.parse(localStorage.getItem('cartData'));
        state.cartData = cartData; // 儲存購物車資料
        console.log("購物車資料取得成功");
    },
    cartDataDel:(state, action) => {
        state.cartData = [];
        localStorage.removeItem('cartData');
        console.log("購物車資料刪除成功");
    },
    userDataUp:(state, action) => { //付款者資料上傳
        try{
            state.userData = action.payload;
            localStorage.setItem('userData', JSON.stringify(action.payload));
            console.log("使用者資料上傳成功");
        }catch(error){
            console.error("使用者資料上傳失敗：", error);
        }
        
    },
    userDataGet:(state, action) => {//付款者資料取得
        try{
            //取得localStorage的付款者資料
            const userData = JSON.parse(localStorage.getItem('userData'));
            state.userData = userData || {};
            console.log("使用者資料取出成功");
        }catch(error){
            console.error("取出使用者資料時出錯：", error);
            state.userData = {};
        }
    },
    userDataDel:(state, action) => {//付款者資料刪除
        try{
            localStorage.removeItem('userData');
            console.log("使用者資料刪除成功");
        }catch(error){
            console.error("使用者資料刪除失敗：", error);
        }
    },
    orderIdDataUp:(state, action) => {
        state.orderIdData = action.payload; // 儲存訂單號碼資料
    },
    orderIdDataGet:(state, action) => {
        try{
            const orderId = JSON.parse(localStorage.getItem('orderId'));
            state.orderIdData = orderId || ""; // 儲存訂單號碼資料
            console.log("結帳id取出成功");
        }catch(error){
            console.error("結帳id取出失敗：", error);
            state.orderIdData = "";
        }
    },
    orderIdDataDel:(state, action) => {
        try{
            localStorage.removeItem('orderId');
            console.log("結帳id刪除成功");
        }catch(error){
            console.error("結帳id刪除失敗：", error);
            state.orderIdData = "";
        }
    },

    ProductsMaskTrue:(state, action) => {
        state.ProductsMask = true; // 儲存所有產品資訊
    },
    ProductsMaskFalse:(state, action) => {
        state.ProductsMask = false; // 儲存所有產品資訊
    },

    
  },
});

export const { originDataUp,articleDataUp,allOriginDataUp,productDataUp,
                cartDataUp,cartDataGet,cartDataDel,
                userDataUp,userDataGet,userDataDel,
                orderIdDataUp,orderIdDataGet,orderIdDataDel,
                ProductsMaskTrue,ProductsMaskFalse } = dataSlice.actions; //是為了在外部可以使用函式
export default dataSlice.reducer;

//取得產品資料
    export const getAllData = createAsyncThunk(
        "data/getAllData",
        async ({page = 1,category = ""},{ dispatch }) => {
            try {
                const getAllDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products?page=${page}&category=${category}`);
                console.log("取得後端產品資料成功(Slice端)",getAllDataRef.data.products);
                dispatch(originDataUp(getAllDataRef.data.products));
            } catch (error) {
                console.log("取得後端產品資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }
        }
    );
//取得產品資料

//取得文章資料
    export const getArticleData = createAsyncThunk(
        "data/getArticleData",
        async ({page = 1},{ dispatch }) => {
            try {
                const getArticleDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/articles?page=${page}`);
                console.log("取得文章資料成功(Slice端)",getArticleDataRef.data.articles);
                dispatch(articleDataUp(getArticleDataRef.data.articles));
            } catch (error) {
                console.log("取得文章資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }
        }
    );
//取得文章資料

//取得所有產品資料
    export const getAllProductsData = createAsyncThunk(
        "data/getAllProductsData",
        async (_,{ dispatch }) => {
            console.log("讀取開始");
            dispatch(ProductsMaskTrue());
            try {
                const getAllProductsDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products/all`);
                console.log("取得所有後端產品資料成功(Slice端)",getAllProductsDataRef.data.products);
                dispatch(allOriginDataUp(getAllProductsDataRef.data.products));

                // 加入等待 0.5 秒
                await new Promise(resolve => setTimeout(resolve, 500));

                console.log("讀取結束");
                dispatch(ProductsMaskFalse());
            } catch (error) {
                console.log("取得所有後端產品資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }
        }
    );
//取得所有產品資料

//取得單一產品資料
    export const getProductData = createAsyncThunk(
        "data/getProductData",
        async ({id},{ dispatch }) => {
            console.log("讀取開始");
            dispatch(ProductsMaskTrue());
            try {
                console.log("id:",id);
                const getProductDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/product/${id}`);
                console.log("取得單一後端產品資料成功(Slice端)",getProductDataRef.data.product);
                dispatch(productDataUp(getProductDataRef.data.product));

                // 加入等待 0.5 秒
                await new Promise(resolve => setTimeout(resolve, 500));
                
                console.log("讀取結束");
                dispatch(ProductsMaskFalse());
            } catch (error) {
                console.log("取得單一後端產品資料失敗(Slice端)",error.response.data);
                return(error.response.data);
            }
        }
    );
//取得單一產品資料

//加入購物車
    export const postCartData = createAsyncThunk(
        "data/postCartData", // action 名建議修正為 postCartData
        async ({ product_id, qty}, { dispatch }) => {
            console.log("加入購物車中...");
            dispatch(ProductsMaskTrue());

            try {
            // 包成符合 API 要求的格式
            const postBody = {
                data: {
                product_id,
                qty,
                },
            };

            const postCartDataRef = await axios.post(
                `${BASE_URL}/v2/api/${API_PATH}/cart`,
                postBody // ✅ 將資料放入 request body
            );

            console.log("加入購物車成功:", postCartDataRef.data);

            await new Promise((resolve) => setTimeout(resolve, 500)); // 假 loading

            dispatch(ProductsMaskFalse());

            return { success: true }; // 可選擇回傳狀態
            } catch (error) {
                console.error("加入購物車失敗:", error?.response?.data || error.message);
                dispatch(ProductsMaskFalse());
                return {
                    success: false,
                };
            }
        }
    );
//加入購物車

//取得購物車資料
    export const getCartData = createAsyncThunk(
        "data/getCartData", // action 名建議修正為 postCartData
        async (_, { dispatch }) => {
            dispatch(ProductsMaskTrue());
            try{
            const getCartDataRef = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
            console.log("取得購物車資料",getCartDataRef.data.data.carts);
            dispatch(cartDataUp(getCartDataRef.data.data.carts));
            localStorage.setItem('cartData', JSON.stringify(getCartDataRef.data.data.carts));
            await new Promise((resolve) => setTimeout(resolve, 500)); // 假 loading

            dispatch(ProductsMaskFalse());

            } catch (error) {
                console.error("取得購物車資料失敗:", error?.response?.data || error.message);
                dispatch(ProductsMaskFalse());
            }
        }
    );
//取得購物車資料

//更新購物車資料
    export const putCartData = createAsyncThunk( 
        "data/putCartData", // action 名建議修正為 postCartData
        async ({id,product_id,qty}, { dispatch }) => {
            dispatch(ProductsMaskTrue());
            try{
            const postBody = {
                data: {
                product_id,
                qty,
                },
            };
            const putCartDataRef = await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`,postBody);
            console.log("更新購物車資料",putCartDataRef);

            await new Promise((resolve) => setTimeout(resolve, 500)); // 假 loading

            dispatch(ProductsMaskFalse());
            } catch (error) {
                console.error("更新購物車資料失敗:", error?.response?.data || error.message);
                dispatch(ProductsMaskFalse());
            }
        }
    );
//更新購物車資料

//刪除單一購物車資料
    export const delCartData = createAsyncThunk( 
        "data/delCartData", // action 名建議修正為 postCartData
        async ({id}, { dispatch }) => {
            dispatch(ProductsMaskTrue());
            try{
                const delCartDataRef = await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/cart/${id}`);
                console.log("刪除單一購物車資料",delCartDataRef.data);
            
                await new Promise((resolve) => setTimeout(resolve, 500)); // 假 loading

                dispatch(ProductsMaskFalse());
            } catch (error) {
                console.error("刪除單一購物車資料失敗:", error?.response?.data || error.message);
                dispatch(ProductsMaskFalse());
            }
        }
    );
//刪除單一購物車資料

//處理結帳資料
    export const postCheckoutData = createAsyncThunk( 
        "data/postCheckoutData", // action 名建議修正為 postCartData
        async ({data}, { dispatch }) => {
            dispatch(ProductsMaskTrue());
            try{
                const postCheckoutDataRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`,data);
                console.log("結帳資料更新",postCheckoutDataRef.data.orderId);
                dispatch(orderIdDataUp(postCheckoutDataRef.data.orderId));
                localStorage.setItem('orderId', JSON.stringify(postCheckoutDataRef.data.orderId));
                await new Promise((resolve) => setTimeout(resolve, 500)); // 假 loading

                dispatch(ProductsMaskFalse());
                return { success: true }; // 可選擇回傳狀態
            } catch (error) {
                console.error("結帳資料更新失敗:", error?.response?.data || error.message);
                dispatch(ProductsMaskFalse());
                return {
                    success: false,
                };
            }
        }
    );
//處理結帳資料

//處理結尾付款資料
    export const postPayData = createAsyncThunk( 
        "data/postCheckoutData", // action 名建議修正為 postCartData
        async ({order_id}, { dispatch }) => {
            dispatch(ProductsMaskTrue());
            try{
                const postPayDataRef = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/pay/${order_id}`);
                console.log("付款資料更新",postPayDataRef.data);
                
                await new Promise((resolve) => setTimeout(resolve, 500)); // 假 loading
                dispatch(ProductsMaskFalse());
                return { success: true }; // 可選擇回傳狀態
            } catch (error) {
                console.error("結帳資料更新失敗:", error?.response?.data || error.message);
                dispatch(ProductsMaskFalse());
                return {
                    success: false,
                };
            }
        }
    );
//處理結尾付款資料



