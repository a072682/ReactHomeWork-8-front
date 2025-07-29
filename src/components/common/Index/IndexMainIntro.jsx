import { useNavigate } from "react-router-dom";


function IndexMainIntro (){

    const navigate = useNavigate();//頁面跳轉宣告

    return(
        <>
            <div className="container d-flex flex-column" style={{ minHeight: 'calc(100vh - 56px)' }}>
                <div className="row justify-content-center my-auto">
                    <div className="col-md-6 text-center">
                        <h2 className="fw-bold">提升你的時尚品味</h2>
                        <p className="text-muted mb-0 mt-3">
                            精選高端服飾，融合現代剪裁與經典質感，為您的每一次出場增添自信與風采。
                        </p>
                        <button type="button" className="btn btn-dark mt-4" style={{borderRadius:"4px",}} onClick={()=>{navigate("/ProductsPage")}}>立即選購</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default IndexMainIntro;



