import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../../css/product.css';
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
export default function Test3() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [image, setMainImage] = useState("");
    const [image1, setSubImage1] = useState("");
    const [image2, setSubImage2] = useState("");
    const [image3, setSubImage3] = useState("");

    const navigate = useNavigate();

    const { id } = useParams();
    useEffect(() => {
        getProductById();
    }, []);


    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5050/products/get/${id}`);
        setName(response.data.name);
        setPrice(response.data.price);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setMainImage(response.data.image);
        setSubImage1(response.data.image1);
        setSubImage2(response.data.image2);
        setSubImage3(response.data.image3);
        // alert(response.data.name);

    };

    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5050/products/update-product/${id}`, {
                name,
                price,
                description,
                category,
                image,
                image1,
                image2,
                image3,
            });
            navigate("/management");
            toast.success("Product updated successfully!")
            
        } catch (error) {
            console.log(error);
            toast.error(error.response.data);
        }
    };
    return (
        <div classNameName='container'>
            <form onSubmit={updateProduct}>
                <h3 classNameName='text-center mb-5'>Update Product</h3>
                <div className="row mb-4 mt-5">

                    <div className="col">

                        <div className="form-outline">
                            <label className="form-label " for="form3Example1">Product name</label>
                            <input type="text" id="form3Example1" className="form-control" onChange={(e) => setName(e.target.value)} value={name || ""} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form3Example2">Price</label>
                            <input type="text" id="form3Example2" className="form-control" onChange={(e) => setPrice(e.target.value)} value={price || ""} />
                        </div>
                    </div>
                </div>
                <div className="row mb-4 mt-5">
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label " for="form3Example1">Description</label>
                            <input type="text" id="form3Example1" className="form-control" onChange={(e) => setDescription(e.target.value)} value={description || ""} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form3Example2">Category</label>
                            <input type="text" id="form3Example2" className="form-control" onChange={(e) => setCategory(e.target.value)} value={category || ""} />
                        </div>
                    </div>
                </div>
                <div className="row mb-4 mt-5">
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label " for="form3Example1">Main Image</label>
                            <input type="text" id="form3Example1" className="form-control" onChange={(e) => setMainImage(e.target.value)} value={image || ""} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form3Example2">Sub Image 1</label>
                            <input type="text" id="form3Example2" className="form-control" onChange={(e) => setSubImage1(e.target.value)} value={image1 || ""} />
                        </div>
                    </div>
                </div>
                <div className="row mb-4 mt-5">
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label " for="form3Example1">Sub Image 2</label>
                            <input type="text" id="form3Example1" className="form-control" onChange={(e) => setSubImage2(e.target.value)} value={image2 || ""} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-outline">
                            <label className="form-label" for="form3Example2">Sub Image 3</label>
                            <input type="text" id="form3Example2" className="form-control" onChange={(e) => setSubImage3(e.target.value)} value={image3 || ""} />
                        </div>
                    </div>
                </div>
                <div class="px-5 py-4">
                    <input type="submit" class="btn btn-primary btn-lg update-product-btn" value="Update Product" />
                </div>
            </form>
            <ToastContainer/>
        </div>
    )
}
