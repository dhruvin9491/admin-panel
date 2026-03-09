import React from 'react';
import { useSelector } from 'react-redux';

function Products() {

    const products = useSelector((state => state.products));

    return (
        <main>
            <section className='py-5 text-center'>
                <h1 className='text-white'>Products</h1>

                <div className='container mt-4'>
                    <div className='row g-4 justify-content-center'>

                        {products.filter(p => p.isVisible && !p.isDeleted).map((product) => (
                            <div className='col-md-4 col-lg-3' key={product.id}>
                                <div className='card h-100 shadow-sm'>

                                    {product.image && (
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='card-img-top'
                                            style={{ height: 180, objectFit: 'cover' }}
                                        />
                                    )}

                                    <div className='card-body text-start'>
                                        <h5 className='card-title'>{product.name}</h5>

                                        <p className='text-muted mb-1'>
                                            {product.category}
                                        </p>

                                        <p className='card-text small'>
                                            {product.description}
                                        </p>

                                        <h6 className='fw-bold'>
                                            ₹ {product.price}
                                        </h6>
                                    </div>

                                </div>
                            </div>
                        ))}

                    </div>
                </div>

            </section>
        </main>
    );
}

export default Products;