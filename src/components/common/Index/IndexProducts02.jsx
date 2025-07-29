import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import { useEffect } from 'react';
import './_IndexProducts02.scss';


function IndexProducts02 ({originalData}){

    useEffect(()=>{
        console.log("目標資料",originalData)
    },[originalData])
    

    return(
        <>
            <div className="bg-light">
                <div className="container">
                    <div className='row'>
                        <div className='col'>
                            <div className='title-box mb-24'>
                                <h3 className="title" style={{padding:"0px 12px",borderLeft:"5px solid #000000",}}>
                                    推薦商品
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="swiper-box slide">
                        <div className="swiper-inner">
                            <div className="swiper-item">
                                <div className="row py-3">
                                    <div className="col">
                                        {/* swiper不能接受來源為空不然其他配件無法抓取因此要加xxx && x.length > 0 的限制確保進來的資料是有數值得 */}
                                        {originalData && originalData.length > 0 && (
                                            <Swiper
                                                spaceBetween={24}
                                                slidesPerView={1}
                                                loop={true}
                                                modules={[Navigation]}
                                                navigation={{
                                                    prevEl:".swiper-products02-prev",
                                                    nextEl:".swiper-products02-next",
                                                }}
                                                   
                                            >
                                                {
                                                    originalData?.map((item, index) => (   
                                                        <SwiperSlide key={item.id}>
                                                            <div className="row">
                                                                <div className="col-12 col-lg-6">
                                                                    <img
                                                                        src={item.imageUrl}
                                                                        className="img"
                                                                        alt="avatar"
                                                                        style={{
                                                                        width:"100%",
                                                                        aspectRatio: "415 / 300",
                                                                        objectFit:"cover",
                                                                        borderRadius:"12px",
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-12 col-lg-6">
                                                                    <div className="d-flex flex-column justify-content-center align-items-start gap-2 p-3">
                                                                        <h5 className="fw-bold m-0">{item.title}</h5>
                                                                        <p className="text-muted m-0">
                                                                            {item.description}
                                                                        </p>
                                                                        <p className="text-muted m-0">
                                                                            {item.content}
                                                                        </p>
                                                                        <div className='d-flex justify-content-center align-items-end gap-3'>
                                                                            <p className="fs-24 mb-0">NT${item.price}</p>
                                                                            <p className="fs-20 mb-0"><del>NT${item.origin_price}</del></p>
                                                                        </div>
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
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndexProducts02;



