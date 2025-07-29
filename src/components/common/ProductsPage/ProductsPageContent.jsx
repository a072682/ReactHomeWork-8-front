import { useEffect, useState } from "react";
import ReactPagination from "../ReactPagination";
import ReactPaginationBK from "../ReactPaginationBK";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';





function ProductsPageContent ({productsItemsData,allProductsData}){

    const navigate = useNavigate();//頁面跳轉宣告

    //處理愛心icon資料
        const [favoriteIds, setFavoriteIds] = useState([]);//紀錄已收藏商品的 id 陣列

        //從localStorage取得已收藏商品的 id 陣列(重新整理後也能記憶)
            useEffect(()=>{
                const results = JSON.parse(localStorage.getItem('favoriteIds'));
                setFavoriteIds(results || []);
                console.log("測試",results);
            },[])
        //從localStorage取得已收藏商品的 id 陣列

        //從localStorage取得已收藏商品的 id 陣列(重新整理後也能記憶)
            useEffect(() => {
                const interval = setInterval(() => {
                    const currentUrl = location.href;
                    if (!currentUrl.startsWith("http://localhost:5173/#/")) {
                        //如果網址開頭不是
                        localStorage.removeItem('favoriteIds');
                        setFavoriteIds([]);
                        clearInterval(interval); // 清除偵測
                        console.log("清除陣列");
                    }
                }, 1000); // 每秒檢查一次

                return () => clearInterval(interval); // 元件卸載時清除 interval
            }, []);
        //從localStorage取得已收藏商品的 id 陣列



        //判斷陣列中是否有產品在內部的函式
        //點擊icon時觸發
        const toggleFavorite = (productId) => {
            const results = favoriteIds?.includes(productId)? (favoriteIds.filter((id) => id !== productId)): ([...favoriteIds, productId])
            localStorage.setItem('favoriteIds', JSON.stringify(results));
            setFavoriteIds(results) ;
            console.log("陣列結果",results);
            //prev.includes(productId)判斷陣列中是否有包含產品id
            //prev.filter((id) => id !== productId 把productId以外的資料都移除組成新陣列(同等於刪除productId)
            //[...prev, productId] 將productId加入陣列
        };
        //判斷陣列中是否有產品在內部的函式
    //處理愛心icon資料

    useEffect(()=>{
        handleProductsData(allProductsData,"所有產品");
    },[allProductsData])

    const [productsData,setProductsData] = useState(null);

    //處理過濾後產品資料
    //點擊item時觸發
    const handleProductsData = (input,key)=>{
        input?.filter((item)=>{
            if(key === "所有產品"){
                // return true; 
                // 保留所有項目
                setProductsData(input);
            }else if (key === "收藏"){
                const filtered = input.filter((item) => favoriteIds.includes(item.id));
                //從源頭陣列中找出包括favoriteIds陣列的資料並放入filtered陣列中
                setProductsData(filtered);
            }else{
                //return item.category === key; 
                // 篩選符合的類別
                const filtered = input.filter((item) => item.category === key);
                setProductsData(filtered);
            }
        })
    }
    //處理過濾後產品資料

    //處理案件函式+寫入產品資料
    const handleItemBtnClick = (key)=>{
        handleProductsData(allProductsData,key);
    }
    //處理案件函式+寫入產品資料

    useEffect(()=>{
        console.log("過濾後的資料:",productsData);
    },[productsData])


    const [currentPage, setCurrentPage] = useState(1);//頁碼狀態
    // const totalItems = allThemeData?.length;
    const itemsPerPage = 8;//上限
    const totalPages = productsData && productsData.length > 0 ? Math.ceil(productsData.length / itemsPerPage): 1;//Math.ceil無條件進位
    //總頁數

    const indexOfLastItem = currentPage * itemsPerPage;//算出當前頁面的資料顯示範圍 
    // 例如:currentPage(第幾頁) = 1，itemsPerPage = 8，那 indexOfLastItem = 1 * 8 = 8
    //「第1頁」的資料範圍會是 第0筆~第7筆（共8筆）

    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //取得索引的前部分數字
    //indexOfLastItem = 8 itemsPerPage = 8 所以indexOfFirstItem = 8 - 8 = 0
    const newProductsData = productsData?.slice(indexOfFirstItem, indexOfLastItem);
    // console.log("過濾後的資料02",newProductsData);
    //因此allThemeData.slice(0, 8) 取出0~7筆資料顯示

    // 切換頁數時執行的動作
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        // console.log("切換到第", newPage, "頁");
        // 可以在這裡載入對應頁碼的資料
    };

    

    

    return(
        <>
            <div className="container mt-md-5 mt-3 mb-7">
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-24" id="accordionExample">
                            <div className="card border-0">
                                <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h4 className="mb-0">
                                            產品類別
                                        </h4>
                                        <i className="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                    <div className="card-body p-0">
                                        <ul className="list-unstyled mb-0">
                                            {
                                                productsItemsData?.map((item)=>{
                                                    return(
                                                        <>
                                                            <li key={item.id}>
                                                                <button href="#" 
                                                                        className="py-2 d-block text-muted border-0" 
                                                                        onClick={()=>{handleItemBtnClick(item.category)}}
                                                                        style={{backgroundColor:"transparent",}}>
                                                                        {item.category}
                                                                </button>
                                                            </li>
                                                        </>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                               
                            
                        </div>
                    </div>
                    <div className="col-lg-8 d-none d-lg-block">
                        <div className="row">
                            {
                                newProductsData?.map((item)=>{
                                    return(
                                        <>
                                            <div key={item.id} className="col-md-6">
                                                <div className="card border-0 p-0 mb-24 position-relative position-relative text-start">
                                                    <img src={item.imageUrl} className="card-img-top mb-12" alt="..." 
                                                            style={{aspectRatio: "415 / 300",
                                                                    objectFit:"cover",
                                                                    objectPosition: 'center top',
                                                                    borderRadius:"12px",
                                                    }}/>
                                                    <i
                                                        className={`fa-heart text-danger position-absolute ${favoriteIds.includes(item.id) ? ('fas') : ('far') }`}
                                                        style={{ right: '16px', top: '16px', cursor: 'pointer' }}
                                                        onClick={(e) => {
                                                            e.preventDefault(); // 避免觸發跳轉
                                                            e.stopPropagation(); // 避免觸發 navigate
                                                            toggleFavorite(item.id);
                                                        }}
                                                        >
                                                    </i>

                                                    <div className="card-body p-3">
                                                    <button className="border-0 p-0" onClick={()=>{navigate(`/DetailPage/${item.id}`)}}>
                                                        <h4 className="mb-0 text-dark">{item.title}</h4>
                                                    </button>
                                                    <p className="card-text mb-0 mt-3">NT${item.price} <span className="text-muted "><del>NT${item.origin_price}</del></span></p>
                                                    <p className="text-muted mt-3"></p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div>
                        <ReactPaginationBK 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                    <div className="col-12 d-block d-lg-none">
                        <div className="swiper-box slide">
                            {
                                newProductsData && newProductsData.length > 0 && (
                                    <Swiper
                                        spaceBetween={24}
                                        loop={true}
                                        modules={[Navigation]}
                                        navigation={{
                                            prevEl: ".swiper-products02-prev",
                                            nextEl: ".swiper-products02-next",
                                        }}
                                        breakpoints={{
                                            0: {
                                            slidesPerView: 1, // 0px以上（手機）顯示1張
                                            },
                                            768: {
                                            slidesPerView: 1, // 992px以上（桌機）顯示3張
                                            },
                                        }}
                                    >

                                        {
                                            newProductsData?.map((item, index) => (   
                                                <SwiperSlide key={item.id}>
                                                    <div key={item.id} className="col">
                                                        <div className="card border-0 p-0 mb-24 position-relative position-relative text-start">
                                                            <img src={item.imageUrl} className="card-img-top mb-12" alt="..." 
                                                                    style={{aspectRatio: "415 / 300",
                                                                            objectFit:"cover",
                                                                            objectPosition: 'center top',
                                                                            borderRadius:"12px",
                                                            }}/>
                                                            <i
                                                                className={`fa-heart text-danger position-absolute ${favoriteIds.includes(item.id) ? ('fas') : ('far') }`}
                                                                style={{ right: '16px', top: '16px', cursor: 'pointer' }}
                                                                onClick={(e) => {
                                                                    e.preventDefault(); // 避免觸發跳轉
                                                                    e.stopPropagation(); // 避免觸發 navigate
                                                                    toggleFavorite(item.id);
                                                                }}
                                                                >
                                                            </i>

                                                            <div className="card-body p-3">
                                                            <button className="border-0 p-0" onClick={()=>{navigate(`/DetailPage/${item.id}`)}}>
                                                                <h4 className="mb-0 text-dark">{item.title}</h4>
                                                            </button>
                                                            <p className="card-text mb-0 mt-3">NT${item.price} <span className="text-muted "><del>NT${item.origin_price}</del></span></p>
                                                            <p className="text-muted mt-3"></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }
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
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductsPageContent;