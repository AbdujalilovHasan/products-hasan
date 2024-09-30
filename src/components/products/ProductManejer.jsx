import { useState, useEffect } from 'react';
import { Button, InputGroup, Form as BootstrapForm, Table as BootstrapTable } from 'react-bootstrap';
import style from './ProductManejer.module.css'

function ProductManager() {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [editIndex, setEditIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(''); 
    const productsPerPage = 5;

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts) {
            setProducts(storedProducts);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    const addProduct = (e) => {
        e.preventDefault();
        const newProduct = { productName, price, category, quantity };
        if (editIndex !== null) {
            const updatedProducts = [...products];
            updatedProducts[editIndex] = newProduct;
            setProducts(updatedProducts);
            setEditIndex(null);
        } else {
            setProducts([...products, newProduct]);
        }
        setProductName('');
        setPrice('');
        setCategory('');
        setQuantity('');
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const editProduct = (index) => {
        const product = products[index];
        setProductName(product.productName);
        setPrice(product.price);
        setCategory(product.category);
        setQuantity(product.quantity);
        setEditIndex(index);
    };

    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const filteredProducts = products.filter(product => {
        const matchesSearchTerm = product.productName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
        return matchesSearchTerm && matchesCategory;
    });

    const totalProducts = filteredProducts.length;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);


    return (
        <div className={style["container"]}>
            <h1>Product Management</h1>
            <div className="row">
                <div className="col-md-6">
                    <BootstrapForm onSubmit={addProduct}>
                        <BootstrapForm.Group className="mb-3" controlId="formGroupName">
                            <BootstrapForm.Label>Product Name</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Product name"
                                style={{ border: '2px solid #bc93f1', background: '#dec8fa' }}
                            />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group className="mb-3" controlId="formGroupPrice">
                            <BootstrapForm.Label>Price</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Price"
                                style={{ border: '2px solid #bc93f1', background: '#dec8fa' }}
                            />
                        </BootstrapForm.Group>
                        <BootstrapForm.Group className="mb-3" controlId="formGroupCategory">
                            <BootstrapForm.Label>Category</BootstrapForm.Label>
                            <BootstrapForm.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ border: '2px solid #bc93f1', background: '#dec8fa', cursor: 'pointer' }}
                            >
                                <option value="">Select a category</option>
                                <option value="Dairy">Dairy</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Meats">Meats</option>
                                <option value="Fruits">Fruits</option>
                                <option value="Sweets">Sweets</option>
                                <option value="Flours">Flours</option>
                            </BootstrapForm.Select>
                        </BootstrapForm.Group>
                        <BootstrapForm.Group className="mb-3" controlId="formGroupQuantity">
                            <BootstrapForm.Label>Quantity</BootstrapForm.Label>
                            <BootstrapForm.Control
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="Quantity"
                                style={{ border: '2px solid #bc93f1', background: '#dec8fa' }}
                            />
                        </BootstrapForm.Group>

                        <Button style={{ border: '2px solid #e7b552 ', background: '#f0d092', color: '#fff' }} type="submit">{editIndex !== null ? 'Update Product' : 'Add Product'}</Button>
                    </BootstrapForm>
                </div>


                <div className="col-md-6">
                    <InputGroup className="mt-3 mb-3">
                        <InputGroup.Text style={{ background: '#64517d', color: '#fff' }}>Search</InputGroup.Text>
                        <BootstrapForm.Control
                            type="text"
                            value={searchTerm}
                            onChange={handleSearch}
                            placeholder="Search product name"
                            style={{ background: '#dec8fa' }}
                        />
                        <BootstrapForm.Select
                            className="ms-2"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            aria-label="Select category"
                            style={{ background: '#dec8fa', cursor: 'pointer' }}
                        >
                            <option value="">All Categories</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Meats">Meats</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Sweets">Sweets</option>
                            <option value="Flours">Flours</option>
                        </BootstrapForm.Select>
                    </InputGroup>

                    <BootstrapTable striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Quantity</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProducts.map((product, index) => (
                                <tr key={index}>
                                    <td>{(currentPage - 1) * productsPerPage + index + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.quantity}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => editProduct(index)}>Edit</Button>
                                        <Button variant="danger" onClick={() => deleteProduct(index)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </BootstrapTable>
                    <div className="mt-3 justify-content-end">
                        Total Products: {totalProducts}
                        <div>
                            Page {currentPage} of {totalPages}
                            {currentPage > 1 && (
                                <Button style={{ border: '2px solid #e7b552 ', background: '#f0d092', color: '#fff', marginLeft: '8px' }} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Button>
                            )}
                            {currentPage < totalPages && (
                                <Button style={{ border: '2px solid #e7b552 ', background: '#f0d092', color: '#fff', marginLeft: '8px' }} onClick={() => setCurrentPage(currentPage + 1)}>Next</Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductManager;