import { useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';


function IndexProducts ({indexProductsData}){

    useEffect(()=>{},[indexProductsData])

    return(
        <>
            <div className="container">
                <div className="row mb-3">
                    <div className="col">
                        <div className="title-box mb-24">
                            <h3 className="title" style={{padding:"0px 12px",borderLeft:"5px solid #000000",}}>
                                人氣商品
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="swiper-box slide">
                    {
                        indexProductsData && indexProductsData.length > 0 && (
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
                                    slidesPerView: 3, // 992px以上（桌機）顯示3張
                                    },
                                }}
                            >

                                {
                                    indexProductsData?.map((item, index) => (   
                                        <SwiperSlide key={item.id}>
                                            <div key={item.id} className="col-md-4 w-100">
                                                <div className="card border-0">
                                                    <img
                                                    src={item.imageUrl}
                                                    className="card-img-top"
                                                    alt={item.title}
                                                    style={{
                                                    aspectRatio: "415 / 300",
                                                    objectFit:"cover",
                                                    borderRadius:"12px",
                                                    }} />
                                                    <div className="card-body text-center">
                                                        <h4>{item.title}</h4>
                                                        <div className="d-flex justify-content-between">
                                                            <p className="card-text text-muted mb-0">
                                                                {item.content}
                                                            </p>
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
                        )
                    }
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndexProducts;



