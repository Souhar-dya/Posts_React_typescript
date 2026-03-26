import { use, useEffect } from "react";
import data from "../data/db.json";

const ProductList = () => {

  


    return ( 
        <div>
            <h1>Product List</h1>
            <ul>
                {data.data.map((item, idx) => (
                    <li key={idx}>
                        <strong>{item.product}</strong>
                        <p>Price: ${item.price}</p>
                        <p>Category: {item.category}</p>
                    </li>
                ))}
            </ul>
        </div>
     );
}   


export default ProductList;