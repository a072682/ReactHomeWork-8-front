


function Footer(){
    return(
        <>
            <div className="footer">
                <div className="bg-light py-36">
                    <div className="container">
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start gap-5">
                            <p className="mb-0 fw-bold" style={{width:"fit-content",flexShrink:"0",}}>訂閱我們的電子報，獲得最新商品與專屬優惠</p>
                            <div className="input-group mt-md-0 mt-3">
                                <input type="text" className="form-control rounded-0" placeholder="" />
                                <div className="input-group-append">
                                    <button className="btn btn-dark rounded-0" type="button" id="search">
                                        訂閱
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-dark py-36">
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
                            <Link to="/" className='text-white fs-24'>
                                <img src={`${import.meta.env.BASE_URL}images/mode-design.png`} alt="" />
                            </Link>
                            <ul className="d-flex list-unstyled mb-0 fs-24 gap-24">
                                <li><a href="#" className="text-white "><i className="fab fa-facebook"></i></a></li>
                                <li><a href="#" className="text-white "><i className="fab fa-instagram"></i></a></li>
                                <li><a href="#" className="text-white "><i className="fab fa-line"></i></a></li>
                            </ul>
                        </div>
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
                            <div className="mb-md-0 mb-1">
                                <p className="mb-0">02-3456-7890</p>
                                <p className="mb-0">service@mail.com</p>
                            </div>
                            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Footer;