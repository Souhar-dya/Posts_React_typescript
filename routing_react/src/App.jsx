import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import LoginForm from './components/LoginForm.jsx'
import DepartmentForm from './components/DepartmentForm.jsx'
import SkillForm from './components/SkillForm.jsx'
import AddProduct from './components/AddProduct.jsx'
import ProductList from './components/ProductList.jsx'
import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

function App() {

  const [data, setData] = useState({ products: [] })
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    discountPercentage: '',
  })

  const fetchData = async () => {
    try {      
      const response = await axios.get(`${API_BASE_URL}/products`)
      const products = Array.isArray(response.data) ? response.data : response.data?.products || []
      setData({ products })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    
  }

  const addProduct = async (e) => {
    e.preventDefault()

    try {
      const newProduct = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        discountPercentage: Number(formData.discountPercentage),
      }

      if (!newProduct.title || !newProduct.description) return

      const response = await axios.post(`${API_BASE_URL}/products`, newProduct)
      setData((prev) => ({
        products: [...prev.products, response.data],
      }))
      setFormData({
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
      })
    } catch (error) {
      console.error('Error adding product:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }



  return (
    <>
      <button onClick={fetchData}>Fetch Data</button>
      <form onSubmit={addProduct}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        <input
          type="number"
          name="discountPercentage"
          placeholder="Discount %"
          value={formData.discountPercentage}
          onChange={handleChange}
          step="0.01"
          min="0"
          required
        />
        <button type="submit">Add Product</button>
      </form>
      <ol>
        {data?.products?.map((item, idx) => (
          <div key={item.id ?? idx}>
            <li>{item.title}</li>
            <li>{item.description}</li>
                  <li>${Number(item.price).toFixed(2)}</li>
            <li>{item.discountPercentage}% off</li>

          </div>
        ))}
      </ol>

        
        
      <nav >
          <div>
          <Link to="/">Home</Link>

          </div>
          <div>
          <Link to="/about">About</Link>

          </div>
          <div>
          <Link to="/contact">Contact</Link>
          </div>
          <div>
          <Link to="/login">Login</Link>
          </div>
          <div>
          <Link to="/department">Department</Link>
          </div>
          <div>
          <Link to="/skill">Skill</Link>
          </div>
          <div>
          <Link to="/products">Products</Link>
          </div>
            <div>
            <Link to="/add-product">Add Product</Link>
            </div>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home name="Souhardya" />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/department" element={<DepartmentForm />} />
          <Route path="/skill" element={<SkillForm />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="*" element={<><h1 className='bg-teal-900 text-xl'>404 - Page Not Found</h1></>} />
        </Routes>
     

    </>
  )
}

export default App
