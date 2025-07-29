import { useEffect, useState } from "react";
import IndexMainIntro from "../components/common/Index/IndexMainIntro";
import IndexProducts from "../components/common/Index/IndexProducts";

import { useDispatch, useSelector } from "react-redux";
import { getAllProductsData } from "../slice/dataSlice";
import IndexProducts02 from "../components/common/Index/IndexProducts02";



function Index (){

    const dispatch = useDispatch();//使用中央函式
    
    const allorigin = useSelector((state) => {//讀取中央資料
        return(
            state.data.allOriginData
        )
    });

    const[originalData,setOriginalData]=useState(null);
    

    useEffect(()=>{
        dispatch(getAllProductsData({}));
    },[]);

    useEffect(()=>{
        if(allorigin && allorigin.length >= 1){
            setOriginalData(allorigin);
            handleIndexProductsData(allorigin);
        }
    },[allorigin]);

    useEffect(()=>{
        if(originalData && originalData.length >= 1){
            console.log("目前資料",originalData);
        }
    },[originalData]);

    useEffect(()=>{
        if(originalData && originalData.length >= 1){
            console.log("原始資料",originalData);
        }
    },[originalData]);

    const [indexProductsData,setIndexProductsData]=useState(null);

    useEffect(()=>{
        if(indexProductsData && indexProductsData.length >= 1){
            console.log("產品1頁面資料",indexProductsData);
        }
    },[indexProductsData]);

    const handleIndexProductsData = (input)=>{
        const results = [
            ...input.filter((item, index, self) =>index === self.findIndex((t) => t.category === item.category)
                //item為矩陣內的項目
                //index為索引值
                //self為矩陣本身
                //.findIndex從前到後找出第一個符合條件的元素，並回傳它的「索引值」(index)。如果都找不到，會回傳 -1
                //會回傳第一個 id 相同的物件索引
                //如果目前的索引就是第一個出現的那個，就保留；不是的話就過濾掉
            )
        ];
        setIndexProductsData(results);
    }


    return(
        <>
            <div className="position-relative">
                <div    className="position-absolute" 
                        style={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
                            backgroundPosition: 'center center',
                            opacity: 0.1,
                            position: 'absolute',
                            zIndex:"-1",
                        }}>
                </div>
                <IndexMainIntro />
            </div>
            <div className="IndexProducts">
                <IndexProducts indexProductsData={indexProductsData}/>  
            </div>
            
            <div className="IndexProducts02">
                <IndexProducts02 originalData={originalData}/>
            </div>          
        </>
    )
}
export default Index;