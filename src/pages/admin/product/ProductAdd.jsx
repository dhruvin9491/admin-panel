import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ADMIN_ROUTE } from "../../../constant/RoutesConstant";
import { productAdd } from "../../../redux/actions/ProductActions";
import { generateUniqId } from "../../../helper/DataGeneratHelper";
import { uploadImage } from "../../../helper/UploadImage";

function ProductAdd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        description: "",
        image: null
    });

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
        console.log(product);

        let imageURL = null;

        if(product.image) {
            imageURL = await uploadImage(product.image);
        }


        let payload = {
            ...product,
            id: generateUniqId(),
            image: imageURL,
            isDeleted: false,
            isVisible: false,
            createdAt: new Date().toLocaleString(),
            updatedAt: new Date().toLocaleString(),
        }
        dispatch(productAdd(payload));

        navigate(ADMIN_ROUTE.PRODUCT_LIST);
    }

    return (
        <main>
            <div className="row justify-content-center">
                <div className="col-10">
                    <form onSubmit={handleSubmit}>
                        <div className="card">
                            <div className="card-header text-center p-3">
                                <h3 className="mb-0">Add Product</h3>
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
                                    Add Product
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default ProductAdd;