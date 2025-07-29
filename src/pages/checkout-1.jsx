import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useNavigate } from "react-router-dom";
import { cartDataDel, cartDataGet, getCartData, orderIdDataDel, orderIdDataGet, postPayData, userDataDel, userDataGet } from "../slice/dataSlice";
import { useEffect, useState } from "react";
import { Collapse } from "react-bootstrap";

function CheckoutIn (){

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
            dispatch(cartDataGet());
            console.log("第一")
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

    //取得結帳id
        const keyId = useSelector((state) => {//讀取中央資料
            return(
                state.data.orderIdData
            )
        });

        useEffect(() => {
            dispatch(orderIdDataGet());
        }, []);

        useEffect(() => {
            console.log("keyId",keyId);
        }, [keyId]);
    //取得結帳id

    //取得使用者資料
        const [userData,setUserData]=useState({});//儲存產品資料

        const user = useSelector((state) => {//讀取中央資料
            return(
                state.data.userData
            )
        });

        useEffect(() => {
            dispatch(userDataGet());
        }, []);

        useEffect(() => {
            setUserData(user);
        }, [user]);

        useEffect(() => {
            console.log("使用者資料:",userData);
        }, [userData]);
    //取得使用者資料

    //處理付款方式資料
        //付款方式狀態
        const [selectedPayment, setSelectedPayment] = useState("現金支付");
        // 狀態: 存放信用卡號碼
        const [creditCardNumber, setCreditCardNumber] = useState("");

        useEffect(()=>{},[selectedPayment,creditCardNumber]);

        const [payData,setPayData]=useState({
            pay:{
                payType:"現金支付",
                card:{
                    cardNum:"",
                }
            },   
        })

        useEffect(()=>{
            console.log("付款資料:",payData);
        },[payData]);

        const handleInput = (event, key) => {
            const { value } = event.target;
            setSelectedPayment(key);

            setPayData((prev) => ({
                ...prev,
                pay: {
                ...prev.pay,
                payType: value,
                },
            }));
        };

        const handleCardInput = (event) => {
            const { value } = event.target;
            setCreditCardNumber(value);

            setPayData((prev) => ({
                ...prev,
                pay: {
                ...prev.pay,
                card: {
                    ...prev.pay.card,
                    cardNum: value,
                },
                },
            }));
        };
    //處理付款方式資料

    //
    const handlePayData = async(id) => {
        try{
            const result = await dispatch(postPayData({order_id:id}));
            await dispatch(userDataDel());
            await dispatch(cartDataDel());
            await dispatch(orderIdDataDel());
            if (result.payload?.success) {
                console.log("準備跳轉");
                navigate("/CheckoutSuccess"); // ✅ 只在成功後導航
            }
        }catch(error){
            console.error("付款資料傳送失敗：", error);
        }
    }

    const cardData = [
        {   
            id:"現金支付",
            title:"現金支付"
        },
        {   
            id:"信用卡支付",
            title:"信用卡支付"
        },
        {   
            id:"LINE Pay",
            title:"LINE Pay"
        },
    ]

    return(
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                    <nav className="navbar navbar-expand-lg navbar-light px-0">
                        <a className="navbar-brand" href="./index.html">Navbar</a>
                        <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4 gap-60">
                            <li className="me-md-6 me-3 position-relative custom-step-line"><i className="fas fa-check-circle d-md-inline d-block text-center"></i> <span className="text-nowrap">付款者資訊</span></li>
                            <li className="me-md-6 me-3 position-relative custom-step-line"><i className="fas fa-check-circle d-md-inline d-block text-center"></i> <span className="text-nowrap">付款方式</span></li>
                            <li><i className="fas fa-dot-circle d-md-inline d-block text-center"></i> <span className="text-nowrap">付款完成</span></li>
                        </ul>
                    </nav>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h3 className="fw-bold mb-12 pt-3">付款確認</h3>
                    </div>
                </div>
                <div className="row flex-row-reverse justify-content-center pb-5">
                    <div className="col-md-4">
                        <div className="border p-12 mb-12 mb-md-0 d-flex flex-column" style={{minHeight:"250px", borderRadius:"12px",}}>
                            {
                                cartData?.map((item,index)=>(
                                    <div key={item.id} className={`d-flex ${index !== 1?("mt-2"):(null)}`}>
                                        <img    src={item.product.imageUrl} alt="" className="me-2" 
                                                style={{width: "48px", height: "48px", objectFit: "cover",borderRadius:"4px",flexShrink:"0",}} />
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between">
                                            <p className="mb-0 fw-bold">{item.product.title}</p>
                                            <p className="mb-0">NT${item.product.price}</p>
                                            </div>
                                            <p className="mb-0 fw-bold">x{item.qty}</p>
                                        </div>
                                    </div>
                                ))
                            }
                            <table className="table mt-auto border-top border-bottom text-muted">
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
                            <div className="d-flex justify-content-between mt-4">
                            <p className="mb-0 h4 fw-bold">Total</p>
                            <p className="mb-0 h4 fw-bold">NT${totalPrice}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <Form className="py-24 d-flex flex-column gap-12 mb-12" onSubmit={(e) => { e.preventDefault(); }}>
                            <h3>選擇付款方式</h3>
                            {
                                cardData?.map((item)=>{
                                    return(
                                        <>
                                            <div key={item.id} className="card rounded-0 border-0">
                                                <div
                                                    className="card-header bg-white border-0 py-3"
                                                    id="heading1"
                                                >
                                                    <input  id={item.id}
                                                            type="radio" 
                                                            name="payment" 
                                                            value={item.title}
                                                            checked={selectedPayment === item.title} 
                                                            onChange={(e)=>{handleInput(e,item.title)}}/>
                                                    <label htmlFor={item.id} className="mb-0 position-relative custom-checkout-label">
                                                        {item.title}
                                                    </label>
                                                </div>
                                            </div>
                                            {/* 條件渲染 Collapse，僅當選擇該付款方式且該選項是“信用卡支付” */}
                                            {selectedPayment === item.title && item.title === "信用卡支付" && (
                                            <Collapse in={true}>
                                                <div id="creditCardInputTest" className="card card-body mt-2 custom-collapse">
                                                <label htmlFor="creditCardNumber" className="form-label">
                                                    信用卡號碼
                                                </label>
                                                <input
                                                    type="text"
                                                    id="creditCardNumber"
                                                    name="creditCardNumber"
                                                    className="form-control"
                                                    value={creditCardNumber}
                                                    onChange={handleCardInput}
                                                    placeholder="請輸入信用卡號"
                                                />
                                                </div>
                                            </Collapse>
                                            )}
                                        </>
                                    )
                                })
                            }
                            <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                                <Link to="/ProductsPage" className='text-dark mt-md-0 mt-3'>
                                    <i className="fas fa-chevron-left me-2"></i>
                                    回購物車頁面
                                </Link>
                                <button type="submit" to="/CheckoutIn" className='btn btn-dark py-3 px-7' onClick={()=>{handlePayData(keyId)}}>
                                    確認付款
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CheckoutIn;