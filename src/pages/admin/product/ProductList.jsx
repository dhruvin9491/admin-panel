import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RestoreIcon from '@mui/icons-material/Restore';
import { productDelete, productHide, productRecover, productsGet, productShow } from '../../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../../../constant/RoutesConstant';
import Loader from '../../../components/admin/Loader';
import Alert from '../../../components/admin/Alert';
import NoData from '../../../components/admin/NoData';
import { SLICE_NAME } from '../../../constant/ActionConstant';

function ProductList() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { list, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(productsGet());
    }, []);

    return (
        <>
            {loading && <Loader />}
            {!loading && error && <Alert error={error} />}
            {!loading && !error && list.length === 0 && <NoData type={SLICE_NAME.PRODUCTS} />}

            {!loading && !error && list.length > 0 && (
                <div className='table-responsive bg-white p-3 rounded shadow'>
                    <table className='table table-bordered w-100 text-dark align-middle'>
                        <thead>
                            <tr>
                                <th>Created At</th>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {list.map((product, index) => (
                                <tr
                                    key={product.id || index}
                                    className={
                                        product.isDeleted ? "row-deleted"
                                            : product.isVisible ? "row-visible"
                                                : ""
                                    }
                                >
                                    <td>{product.createdAt || '-'}</td>
                                    <td>{product.image ?
                                        (<img src={product.image} alt="product" style={{ width: 36, height: 36 }} className='rounded-circle' />)
                                        : '-'}
                                    </td>
                                    <td>{product.name || '-'}</td>
                                    <td>{product.price || '-'}</td>
                                    <td>{product.category || '-'}</td>
                                    <td style={{ maxWidth: 200 }}>{product.description || '-'}</td>

                                    <td className='action'>
                                        <div className='btn-group'>
                                            <button type='button' className='btn btn-sm btn-primary' onClick={() => navigate(`${ADMIN_ROUTE.PRODUCT_UPDATE}/${product.id}`)} disabled={product.isDeleted || product.isVisible}>
                                                <EditIcon fontSize='small' />
                                            </button>

                                            {product.isDeleted ? (
                                                <button type="button" className="btn btn-sm btn-success" onClick={() => dispatch(productRecover(product.id))}>
                                                    <RestoreIcon fontSize="small" />
                                                </button>
                                            ) : (
                                                <button type='button' className='btn btn-sm btn-danger' onClick={() => dispatch(productDelete(product.id))}>
                                                    <DeleteIcon fontSize='small' />
                                                </button>
                                            )}

                                            {product.isVisible ? (
                                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => dispatch(productHide(product.id))}>
                                                    <VisibilityOffIcon fontSize="small" />
                                                </button>
                                            ) : (
                                                <button type="button" className="btn btn-sm btn-warning" onClick={() => dispatch(productShow(product.id))} disabled={product.isDeleted}>
                                                    <VisibilityIcon fontSize="small" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

        </>
    );
}

export default ProductList;