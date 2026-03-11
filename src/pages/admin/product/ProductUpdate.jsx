import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ADMIN_ROUTE } from "../../../constant/RoutesConstant";
import { productUpdate } from "../../../redux/actions/ProductActions";
import { uploadImage } from "../../../helper/UploadImage";

function ProductUpdate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const products = useSelector((state) => state.products.list);

    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null
    });

    useEffect(() => {
        const existingProduct = products.find((p) => p.id === id);

        if (existingProduct) {
            setProduct(existingProduct);
        }
    }, [id, products]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "image") {
            setProduct({ ...product, image: files[0] });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageURL = product.image;

        if (typeof product.image !== "string" && product.image) {
            imageURL = await uploadImage(product.image);
        }

        const payload = {
            ...product,
            image: imageURL,
            updatedAt: new Date().toLocaleString()
        };

        dispatch(productUpdate(payload, id));

        navigate(ADMIN_ROUTE.PRODUCT_LIST);
    };

    return (
        <main>
            <div className="row justify-content-center">
                <div className="col-10">
                    <form onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-header text-center p-3">
                                <h3 className="mb-0">Update Product</h3>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <label className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={product.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        className="form-control"
                                        value={product.price}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        className="form-control"
                                        value={product.category}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        name="description"
                                        className="form-control"
                                        rows="3"
                                        value={product.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Product Image</label>
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className="card-footer text-center">
                                <button type="submit" className="btn btn-primary">
                                    Update Product
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default ProductUpdate;