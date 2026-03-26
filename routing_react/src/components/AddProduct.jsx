import React, { use } from "react";
import data from "../data/db.json";

const AddProduct = () => {

    const [product, setProduct] = React.useState("");
    const [productPrice, setProductPrice] = React.useState("");
    const [productCategory, setProductCategory] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        data.data.push({
            id: data.data.length + 1,
            product: product,
            price: productPrice,
            category: productCategory
        });
        console.log(data);
        setProduct("");
        setProductPrice("");
        setProductCategory("");

    }

    
    return (

        <>
        <form onSubmit={handleSubmit}>

            <h1>Add Product</h1>
            <label htmlFor="product">Product Name:</label>
            <input type="text" id="product" placeholder="Product Name" value={product} onChange={(e) => setProduct(e.target.value)} />
            <br />
            <label htmlFor="productPrice">Product Price:</label>
            <input type="number" id="productPrice" placeholder="Product Price" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />
            <br />
            <label htmlFor="productCategory">Product Category:</label>
            <input type="text" id="productCategory" placeholder="Product Category" value={productCategory} onChange={(e) => setProductCategory(e.target.value)} />
            <br />
            <button type="submit" className="bg-green-900 rounded text-white py-2 px-4 ">Add Product</button>
        </form>
        </>

    )


}
export default AddProduct;