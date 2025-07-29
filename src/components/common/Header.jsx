import './_Header.scss';
import { useEffect, useState } from 'react';
import { Navbar } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartDataGet, getCartData } from '../../slice/dataSlice';


function Header(){

    const [expanded, setExpanded] = useState(false);

    const dispatch = useDispatch();//使用中央函式

    const cartData = useSelector((state) => {//讀取中央資料
        return(
            state.data.cartData
        )
    });

    useEffect(()=>{
        handleGetCartData();
    },[])

    useEffect(()=>{
        console.log("取得購物車資料成功",cartData);
    },[cartData])

    const handleGetCartData = async()=>{
        try{
            await dispatch(getCartData());
            await dispatch(cartDataGet());
            
        }catch(error){
            console.log("取得購物車資料失敗",error);
        }
    }

    

    return(
        <>
            
            <div className="navbar-box">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="navbar navbar-expand-lg navbar-light">
                            <Link to="/" className='navbar-brand'>
                                Home
                            </Link>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                                <div className="navbar-nav">
                                <Link to="/" className='nav-item nav-link me-4'>
                                    Home
                                </Link>
                                <Link to="/ProductsPage" className='nav-item nav-link me-4'>
                                    Product
                                </Link>
                                <Link to="/CartPage" className='nav-item nav-link me-4'>
                                    <i className="fas fa-shopping-cart shopping-cart-icon">
                                        <span className="position-absolute navbar-icon-mark mark-20 inter badge d-flex justify-content-center align-items-center">
                                            {cartData?.length}
                                        </span>
                                    </i>
                                </Link>
                                </div>
                            </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}
export default Header;