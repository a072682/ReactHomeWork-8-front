import { useDispatch, useSelector } from "react-redux";
import ProductsPageContent from "../components/common/ProductsPage/ProductsPageContent";
import ProductsPageIntro from "../components/common/ProductsPage/ProductsPageIntro";
import { getAllProductsData } from "../slice/dataSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactLoading from 'react-loading';


function ProductsPage (){

    const navigate = useNavigate();//頁面跳轉宣告

    const dispatch = useDispatch();//使用中央函式
    
    const allProducts = useSelector((state) => {//讀取中央資料
        return(
            state.data.allOriginData
        )
    });

    const mask = useSelector((state) => {//遮罩
        return(
            state.data.ProductsMask
        )
    });

    useEffect(()=>{
        console.log("test",mask);
    },[mask])

    const [allProductsData,setAllProductsData] = useState([]);
    const [productsItemsData,setProductsItemsData] = useState([]);

    useEffect(()=>{
        dispatch(getAllProductsData());
    },[])

    useEffect(()=>{
        setAllProductsData(allProducts);
        handleProductsItemsData(allProducts);
    },[allProducts])

    useEffect(()=>{
        // console.log("取得所有產品資料:",allProductsData);
    },[allProductsData])

    useEffect(()=>{
        console.log("items資料:",productsItemsData);
    },[productsItemsData])


    //處理item資料
    const handleProductsItemsData = (input) => {
        const results = [
            {
                id: "all",
                category: "所有產品"
            },
            {
                id: "fav",
                category: "收藏"
            },
            ...input.filter((item, index, self) =>index === self.findIndex((t) => t.category === item.category)
                //item為矩陣內的項目
                //index為索引值
                //self為矩陣本身
                //.findIndex從前到後找出第一個符合條件的元素，並回傳它的「索引值」(index)。如果都找不到，會回傳 -1
                //會回傳第一個 id 相同的物件索引
                //如果目前的索引就是第一個出現的那個，就保留；不是的話就過濾掉
            )
        ];
        setProductsItemsData(results);
    };
    //處理item資料


    return(
        <>
            <div    className="position-relative"
                    style={{
                        ...(mask ? {height:'calc(100vh - 56px - 174px)', overflow: 'hidden', } : {  }),
                    }}>
                <div className={`position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center ${mask?(null):("d-none")}`} 
                style={{backgroundColor:"#ffffff",opacity:"0.8",zIndex:"10",backdropFilter:"blur(5px)",}}>
                    <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
                </div>
                <ProductsPageIntro />
                <ProductsPageContent productsItemsData={productsItemsData} allProductsData={allProductsData}/>
            </div>
            
        </>
    )
}
export default ProductsPage;