import { Link } from "react-router-dom";



function CheckoutSuccess (){

    return(
        <>
            <div className="position-relative d-flex">
                <div className="container d-flex flex-column" style={{minHeight: "100vh",}}>
                    <nav className="navbar navbar-expand-lg navbar-light px-0">
                    <Link to="/" className='navbar-brand'>
                        Navbar
                    </Link>
                    </nav>
                    <div className="row my-auto pb-7">
                        <div className="col-md-4 d-flex flex-column">
                            <div className="my-auto d-flex flex-column gap-12">
                            <h2>付款成功</h2>
                            <p>希望您喜歡這次的選購體驗，別忘了回來看看最新上架的商品喔！</p>
                            <Link to="/" className='btn btn-dark mt-4 px-5'>
                                回到首頁
                            </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div    className="w-md-50 w-100 position-absolute opacity-1" 
                            style={{
                            zIndex: -1,
                            minHeight: '100vh',
                            right: 0,
                            backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
                            backgroundPosition: 'center center',
                        }}>
                </div>
            </div>
        </>
    )
}
export default CheckoutSuccess;