import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsData, getProductData, postCartData } from '../slice/dataSlice';
import ReactLoading from 'react-loading';
import './_DetailPage.scss';




function DetailPage (){

    const navigate = useNavigate();//頁面跳轉宣告

    const dispatch = useDispatch();//使用中央函式

    //負責取得更新id
        const { id_first } = useParams();//取得id

        useEffect(()=>{
            console.log("取得的id:",id_first);
        },[id_first])

        
    //負責取得更新id
    
    //負責取得更新產品資料
        const [productData,setProductData]=useState({});//儲存產品資料

        const Product = useSelector((state) => {//讀取中央資料
            return(
                state.data.ProductData
            )
        });
        
        useEffect(()=>{
            dispatch(getProductData({id:id_first}));
        },[id_first])

        // 同步 Redux 內容到本地 state
        useEffect(() => {
        if (Product) {
            setProductData(Product);
        }
        }, [Product]);
    
        // 清除空白圖片並更新狀態（只在第一次 Product 改變時清一次）
        useEffect(() => {
        if (productData && Array.isArray(productData.imagesUrl)) {
            const cleanedImages = productData.imagesUrl.filter(item => item.trim() !== "");

            // 只有在有空值時才需要更新，避免循環
            if (cleanedImages.length !== productData.imagesUrl.length) {
            setProductData(prev => ({
                ...prev,
                imagesUrl: cleanedImages
            }));
            }
        }
        console.log("修正過後的資料:",productData);
        }, [productData]);

        
    //負責取得更新產品資料

    //負責產品數量
        const[num,setNum]=useState(1);//紀錄產品數量

        const handleNumAdd = (num) => {
            if (num >= 1) {
                setNum( num + 1);
            }
        };

        const handleNumSub = (num) => {
            if (num === 0) {
                setNum( num === 1);
            }else if(num > 1){
                setNum( num -= 1);
            }
        };
        useEffect(()=>{},[num]);
    //負責產品數量

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

        // 同步 Redux 內容到本地 state
        useEffect(() => {
            if (otherProduct) {
                const newResults = otherProduct.filter(item => item.id !== id_first);
                const isDuplicate = otherProduct.some(item => item.id === id_first);
                if (otherProduct.length >=1 && isDuplicate) {
                    setOtherProductData(newResults);
                    console.log("產品資料重複進行修正:");
                }else if(otherProduct.length === 0){
                    console.log("目前無產品資料:");
                }
            }
        }, [otherProduct]);

        useEffect(() => {
            console.log("修正後的其他產品資料:",otherProductData)
        }, [otherProductData]);
    //處理其他產品資料

    //處理加入購物車
    const handlePostCart = async()=>{
        try{
            const result = await dispatch(postCartData({product_id:id_first,qty:num}));
            if (result.payload?.success) {
                console.log("準備跳轉");
                navigate("/CartPage"); // ✅ 只在成功後導航
            }
        }catch{
            console.log("加入購物車失敗");
        }
    }
    //處理加入購物車

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


    return(
        <>
            <div    className='DetailPage position-relative'
                    style={{
                        ...(mask ? {height: '100vh', overflow: 'hidden'} : {  }),
                    }}> 
                <div className={`position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center ${mask?(null):("d-none")}`} 
                style={{backgroundColor:"#ffffff",zIndex:"10",opacity:"0.8",}}>
                    <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
                </div>
                <div className="container">
                    
                    <div className="row align-items-center">
                        <div className="col-md-7">
                            <div className='mb-24'>
                                <nav className='d-blcok d-md-none mb-12' aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                                        <li className="breadcrumb-item">
                                            <Link className="text-muted" to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link className="text-muted" to="/ProductsPage">Product</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Detail
                                        </li>
                                    </ol>
                                </nav>
                                <div className="swiper-item mb-12">
                                    <img    src={productData.imageUrl} className="d-block w-100" alt="..." 
                                            style={{aspectRatio:"745 / 520",white:"100%",objectFit:"cover",objectPosition: 'center top',borderRadius:"12px",}}/>
                                </div>
                                <div className='content mb-12 mb-md-0'>
                                    <p>{productData.content}</p>
                                </div>
                                {/* <div className="swiper-box">
                                    <Swiper
                                        spaceBetween={24}
                                        slidesPerView={1}
                                        modules={[Navigation]}
                                        navigation={{
                                            nextEl: ".swiper-control-next",
                                            prevEl: ".swiper-control-prev",
                                        }}
                                        loop={true}
                                    >
                                        {productData?.imagesUrl?.map((item, index) => (
                                            
                                            <SwiperSlide key={item}>
                                                <div className="swiper-item">
                                                    <img    src={item} className="d-block w-100" alt="..." 
                                                            style={{aspectRatio:"745 / 520",white:"100%",objectFit:"cover",objectPosition: 'center top',borderRadius:"12px",}}/>
                                                </div>
                                            </SwiperSlide>
                                            
                                        ))}
                                    </Swiper>
                                    <button
                                        className="swiper-control-prev"
                                        type="button"
                                    >
                                        <span class="material-symbols-outlined swiper-control-prev-icon">
                                            arrow_back_ios
                                        </span>
                                    </button>

                                    <button
                                        className="swiper-control-next"
                                        type="button"
                                    >
                                        <span class="material-symbols-outlined swiper-control-prev-icon">
                                            arrow_forward_ios
                                        </span>
                                    </button>
                                </div> */}
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className='mb-24 mb-md-0'>
                                <nav className='d-none d-md-block' aria-label="breadcrumb">
                                    <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                                        <li className="breadcrumb-item">
                                            <Link className="text-muted" to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link className="text-muted" to="/ProductsPage">Product</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            Detail
                                        </li>
                                    </ol>
                                </nav>
                                <div className='d-flex flex-column gap-12'>
                                    <h2 className="fw-bold h1 mb-1">{productData.title}</h2>
                                    <div>
                                        <p className="mb-0 text-muted text-end"><del>NT${productData.origin_price}</del></p>
                                        <p className="h4 fw-bold text-end">NT${productData.price}</p>
                                    </div>
                                    
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                        <div className="input-group my-3 bg-light rounded">
                                            
                                            <button className="btn btn-outline-dark border-0 py-2" 
                                                    type="button"
                                                    onClick={()=>{handleNumSub(num);}}
                                                    disabled={num === 1}>
                                                        
                                                <i className="fas fa-minus"></i>
                                            </button>
                                            
                                            <div className="form-control border-0 text-center my-auto shadow-none bg-light">
                                                {num}
                                            </div>
                                        
                                            <button className="btn btn-outline-dark border-0 py-2" 
                                                    type="button"
                                                    onClick={()=>{handleNumAdd(num);}}>
                                                <i className="fas fa-plus"></i>
                                            </button>
                                            
                                        </div>
                                        </div>
                                        <div className="col-6">
                                            <button type="button" className="text-nowrap btn btn-dark w-100 py-2" onClick={()=>{handlePostCart();}}>加入購物車</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div>
                        <h3 className="fw-bold mb-24">其他商品</h3>
                    </div>
                    
                </div>

                <div className="swiper-container mt-4 mb-5">
                    <div className="swiper-box">
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
                                        <div className='mb-12'>
                                            <img
                                                src={item.imageUrl}
                                                className="card-img-top"
                                                alt={item.title}
                                                style={{width:"100%",aspectRatio:"292 / 195",objectFit:"cover",objectPosition: 'center top',borderRadius:"12px",}}
                                            />
                                        </div>
                                        <div className="card-body p-0">
                                            <h4 className="mb-0 mt-3">
                                                <button className='border-0 p-0 text-start mb-12' onClick={()=>{navigate(`/DetailPage/${item.id}`)}}>{item.title}</button>
                                            </h4>
                                            <p className="card-text mb-0">
                                                NT$ {item.price}{" "}
                                            <span className="text-muted">
                                                <del>NT${item.origin_price}</del>
                                            </span>
                                            </p>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <button
                                className="swiper-products02-prev"
                                type="button"
                            >
                                <span class="material-symbols-outlined swiper-control-prev-icon">
                                    arrow_back_ios_new
                                </span>
                            </button>
                            <button
                                className="swiper-products02-next"
                                type="button"
                            >
                                <span class="material-symbols-outlined swiper-control-prev-icon">
                                    arrow_forward_ios
                                </span>
                            </button>
                        </Swiper>
                    </div>
                </div>
            </div>
                
            
        </>
    )
}
export default DetailPage;