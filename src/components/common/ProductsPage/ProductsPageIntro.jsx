


function ProductsPageIntro (){

    return(
        <>
            <div className="position-relative d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                <div className="position-absolute" 
                        style={{
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundImage: 'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
                            backgroundPosition: 'center center',
                            opacity: 0.1,
                        }}>
                </div>
                <h2 className="fw-bold">精選潮流服飾</h2>
            </div>
        </>
    )
}
export default ProductsPageIntro;