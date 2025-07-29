import { useEffect, useState } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import { getCartData, postCheckoutData, userDataUp } from "../slice/dataSlice";
import { useDispatch, useSelector } from "react-redux";



function Checkout (){

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

    //處理付款者資料送出保存
    const [userData,setUserData]=useState({
        data:{
            user:{
                name:"",
                email:"",
                tel:"",
                address:"預設住址",
            },
            message:"",
        },   
    })

    const handleInput = (event)=>{
        const{ value, name }= event.target;
        if(name === "message"){
            setUserData((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    message: value,
                }
            }));
        }else{
            setUserData((prev) => ({
                ...prev,
                data: {
                    ...prev.data,
                    user: {
                        ...prev.data.user,
                        [name]: value,
                    },
                }
            }))
        }
    }

    useEffect(()=>{
        console.log("付款者資料",userData);
    },[userData])

    const handlePayData = async(event)=>{
        if(userData.data.user.email === "" ){
            console.log("請輸入信箱資料");
            return;
        }else if(userData.data.user.name === "" || userData.data.user.tel === ""){
            console.log("請輸入付款者資料");
            return;
        }
        try{
            await dispatch(userDataUp(userData));
            const result = await dispatch(postCheckoutData({data:userData}));
            console.log("上傳付款者資料者");
            console.log("準備跳轉");
            navigate("/CheckoutIn");
        }catch(error){
            console.log("上傳付款者資料者失敗",error);
        }
    }
    //處理付款者資料送出保存

    

    return(
        <>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <nav className="navbar navbar-expand-lg navbar-light px-0">
                        <a className="navbar-brand" href="./index.html">Navbar</a>
                        <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4 gap-60">
                            <li className="position-relative custom-step-line">
                                <i className="fas fa-check-circle d-md-inline d-block text-center"></i> 
                                <span className="text-nowrap">付款者資訊</span>
                            </li>
                            <li className="position-relative custom-step-line">
                                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i> 
                                <span className="text-nowrap">付款方式</span>
                            </li>
                            <li>
                                <i className="fas fa-dot-circle d-md-inline d-block text-center"></i> 
                                <span className="text-nowrap">付款完成</span>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-10 mb-12">
                    <h3 className="fw-bold mb-4 pt-3">Checkout</h3>
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
                    <Form className="py-24 d-flex flex-column gap-12 mb-12" onSubmit={(e) => { e.preventDefault(); handlePayData(e); }}>
                        <p className="">Contact information</p>
                        <div className="">
                            <label for="ContactMail" className="text-muted mb-0">Email</label>
                            <input type="email" className="form-control" name="email" value={userData.data.user.email} id="ContactMail" aria-describedby="emailHelp" placeholder="example@gmail.com" onChange={handleInput} />
                        </div>
                        <p className="">Shipping address</p>
                        <div className="">
                            <label for="ContactName" className="text-muted mb-0">Name</label>
                            <input type="text" className="form-control" name="name" value={userData.data.user.name} id="ContactName" placeholder="Carmen A. Rose" 
                            onChange={handleInput}/>
                        </div>
                        <div className="">
                            <label for="ContactPhone" className="text-muted mb-0">Phone</label>
                            <input type="text" className="form-control" name="tel" value={userData.data.user.tel} id="ContactPhone" placeholder="Password" 
                            onChange={handleInput}/>
                        </div>
                        <div className="">
                            <label for="ContactMessage" className="text-muted mb-0">Message</label>
                            <textarea className="form-control" rows="3" name="message" value={userData.data.message} id="ContactMessage" placeholder="message ... "
                            onChange={handleInput}></textarea>
                        </div>
                    
                        <div className="d-flex flex-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                            <Link to="/ProductsPage" className='text-dark mt-md-0 mt-3'>
                                <i className="fas fa-chevron-left me-2"></i>
                                回購物車頁面
                            </Link>
                            <button type="submit" to="/CheckoutIn" className='btn btn-dark py-3 px-7'>
                                確認付款方式
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
            </div>
        </>
    )
}
export default Checkout;