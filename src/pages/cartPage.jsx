import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Link, useNavigate } from 'react-router-dom';
import { delCartData, getAllProductsData, getCartData, putCartData } from '../slice/dataSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';




function CartPage (){

    const navigate = useNavigate();//頁面跳轉宣告

    const dispatch = useDispatch();//使用中央函式

    

    //負責取得購物車資料
        const [cartData,setCartData]=useState([]);//儲存產品資料

        const cart = useSelector((state) => {//讀取中央資料
            return(
                state.data.cartData
            )
        });

        useEffect(() => {
            dispatch(getCartData());
        }, []);

        const[totalPrice,setTotalPrice] = useState(0);

        useEffect(() => {
            if (cart) {
                setCartData(cart);
                const total = cart.reduce((sum, item) => sum + item.final_total, 0);
                setTotalPrice(total);
            }else if(cart.length <= 0 || !cart){
                dispatch(getCartData());
            }
        }, [cart]);

        

        useEffect(() => {
            console.log("購物車資料:",cartData)
        }, [cartData]);
    //負責取得購物車資料

    //處理總價格資料
        useEffect(() => {
            console.log("總價格:",totalPrice)
        }, [totalPrice]);
    //處理總價格資料

    //處理更新購物車
    const[disabledCheck,setDisabledCheck] = useState(false);

    useEffect(()=>{},[disabledCheck]);

    const handlePutCartAdd = async(DataId,productId,numData)=>{
        try{
            setDisabledCheck(true);
            const result = await dispatch(putCartData({id:DataId,product_id:productId,qty:numData + 1}));
            console.log("更新成功");
            await dispatch(getCartData());
            setDisabledCheck(false);
        }catch{
            console.log("加入購物車失敗");
            setDisabledCheck(false);
        }
    };

    const handlePutCartSub = async(DataId,productId,numData)=>{
        if(numData <= 1){
            return;
        };
        try{
            setDisabledCheck(true);
            const result = await dispatch(putCartData({id:DataId,product_id:productId,qty:numData - 1}));
            dispatch(getCartData());
            setDisabledCheck(false);
        }catch{
            console.log("加入購物車失敗");
            setDisabledCheck(false);
        }
    }
    //處理更新購物車

    //處理刪除單一購物車資料

    const handleDelCartAdd = async(DataId)=>{
        try{
            setDisabledCheck(true);
            const result = await dispatch(delCartData({id:DataId}));
            console.log("刪除成功");
            await dispatch(getCartData());
            setDisabledCheck(false);
        }catch{
            console.log("加入購物車失敗");
            setDisabledCheck(false);
        }
    };
    //處理刪除單一購物車資料

    //處理遮罩
    const mask = useSelector((state) => {//遮罩
        return(
            state.data.ProductsMask
        )
    });

    useEffect(()=>{
        console.log("test",mask);
    },[mask])
    //處理遮罩

    //處理其他產品資料
        const [otherProductData,setOtherProductData]=useState([]);//儲存其他產品資料

        const otherProduct = useSelector((state) => {//讀取中央資料
            return(
                state.data.allOriginData
            )
        });

        useEffect(() => {
            dispatch(getAllProductsData());
        }, []);

        useEffect(() => {
            setOtherProductData(otherProduct);
        }, [otherProduct]);

        useEffect(() => {
            console.log("其他",otherProductData);
        }, [otherProductData]);

    //處理其他產品資料

    const title = [
        {
            title:"產品",
        },
        {
            title:"數量",
        },
        {
            title:"價格",
        },
        {
            title:"",
        },
    ];

    return(
        <>
            <div    className="position-relative"
                                style={{
                                    ...(mask ? {height:'calc(100vh -56px - 86px - 228px)', overflow: 'hidden', } : {  }),
                                }}>
                <div className={`position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center ${mask?(null):("d-none")}`} 
                style={{backgroundColor:"#ffffff",opacity:"0.8",zIndex:"10",}}>
                    <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
                </div>
                <div className="container">
                    <div className="mt-3">
                        <h3 className="mt-3 mb-24">購物車</h3>
                        <div className="row">
                            <div className="col-md-8">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            {title.map((item, index) => (
                                                <th scope="col" className={`border-0 ${index === 0 ? 'ps-0' : ''}`} key={index}>
                                                    {item.title}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cartData?.map((item,index) => (
                                                <tr key={item.id} className={`border-bottom ${index === 0 ? 'border-top' : ''}`}>
                                                    <th scope="row" className="border-0 px-0 font-weight-normal py-4">
                                                        <img src={item.product.imageUrl} alt="" style={{width: "72px", height: "72px", objectFit: "cover"}} />
                                                        <p className="mb-0 fw-bold ms-3 d-inline-block">{item.product.title}</p>
                                                    </th>
                                                    <td className="border-0 align-middle" style={{maxWidth:"160px",}}>
                                                        <div className="input-group pe-5">
                                                            <button className="btn btn-outline-dark border-0 py-2" 
                                                                    type="button"
                                                                    onClick={()=>{handlePutCartSub(item.id,item.product_id,item.qty);}}
                                                                    disabled={item.qty === 1 || disabledCheck}>
                                                                        
                                                                <i className="fas fa-minus"></i>
                                                            </button>
                                                            
                                                            <div className="form-control border-0 text-center my-auto shadow-none bg-light">
                                                                {item.qty}
                                                            </div>
                                                        
                                                            <button className="btn btn-outline-dark border-0 py-2" 
                                                                    type="button"
                                                                    onClick={()=>{handlePutCartAdd(item.id,item.product_id,item.qty);}}
                                                                    disabled={disabledCheck}>
                                                                <i className="fas fa-plus"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="border-0 align-middle">
                                                        <p className="mb-0 ms-auto">NT${item.final_total}</p>
                                                    </td>
                                                    <td className="border-0 align-middle pointer" onClick={()=>{handleDelCartAdd(item.id)}}>
                                                        <i className="fas fa-times"></i>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className="input-group w-50 mb-3">
                                    <input type="text" className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none" placeholder="Coupon Code" aria-label="Recipient's username" aria-describedby="button-addon2" />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0" type="button" id="button-addon2"><i className="fas fa-paper-plane"></i></button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className='detail p-12 h-100 border d-flex flex-column' style={{minHeight:"250px",}}>
                                    
                                        <h4 className="fw-bold mb-4">Order Detail</h4>
                                        <table className="table text-muted border-bottom mt-auto">
                                            <tbody>
                                            <tr>
                                                <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                                                <td className="text-end border-0 px-0 pt-4">NT${totalPrice}</td>
                                            </tr>
                                            <tr>
                                                <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                                                <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div className="d-flex justify-content-between ">
                                            <p className="mb-0 h4 fw-bold">Total</p>
                                            <p className="mb-0 h4 fw-bold">NT${totalPrice}</p>
                                        </div>
                                        <Link to="/Checkout" className='btn btn-dark w-100 mt-4'>
                                            付款確認
                                        </Link>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="mt-5 mb-24">
                        <h3 className="fw-bold">其他商品</h3>
                    </div>
                </div>
                <div className="swiper-container mt-3 mb-5">
                    <div className="swiper-wrapper">
                        <Swiper
                            spaceBetween={24}
                            centeredSlides={true}
                            loop={true}
                            breakpoints={{
                            0: {
                                slidesPerView: 1,
                                centeredSlides: false,
                            },
                            992: {
                                slidesPerView: 5,
                                centeredSlides: true,
                            },
                            }}
                        >
                            {otherProductData.map((item, index) => (
                                <SwiperSlide key={item.id}>
                                    <div className="card border-0 mb-4 position-relative">
                                        <img
                                            src={item.imageUrl}
                                            className="card-img-top mb-12"
                                            alt={item.title}
                                            style={{aspectRatio:"745 / 520",white:"100%",objectFit:"cover",objectPosition: 'center top',borderRadius:"12px",}}
                                        />
                                        <div className="card-body p-0">
                                            <h4 className="mb-0 mt-3 mb-12" >
                                                <Link to={`/DetailPage/${item.id}`} style={{color:"rgb(33, 37, 41)",}}>
                                                    {item.title}
                                                </Link>
                                            </h4>
                                            <p className="card-text mb-0">
                                                NT$ {item.price}{' '}
                                                <span className="text-muted">
                                                    <del>NT$ {item.origin_price}</del>
                                                </span>
                                            </p>
                                            <p className="text-muted mt-3"></p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div> 
        </>
    )
}
export default CartPage;