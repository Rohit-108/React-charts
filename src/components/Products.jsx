import { useState, useEffect } from "react";
import styled from "styled-components";
import { productList } from "../utills/contest";
import Shimmer from "./Shimmer";


const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 16px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const Select = styled.select`
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
    outline: none;
    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 16px;
`;

const Card = styled.div`
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 8px;
`;

const CardTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 600;
    margin-bottom: 8px;
`;

const Text = styled.p`
    color: ${(props) => props.color || "#333"};
    margin-bottom: ${(props) => props.mb || "8px"};
    font-size: ${(props) => props.size || "1rem"};
`;

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 16px;
`;

const PaginationButton = styled.button`
    padding: 8px 16px;
    margin: 0 4px;
    border: none;
    border-radius: 4px;
    background-color: ${(props) => (props.active ? "#007bff" : "#f0f0f0")};
    color: ${(props) => (props.active ? "#fff" : "#333")};
    cursor: pointer;
    &:hover {
        background-color: ${(props) => (props.active ? "#0056b3" : "#e0e0e0")};
    }
`;


const Products = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    const categories = ["All", ...new Set(productList.map((product) => product.category.name))];

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);


    const filteredProducts = productList
        .filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((product) => selectedCategory === "All" || product.category.name === selectedCategory);

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <Container>
            <Title>Products</Title>


            <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />


            <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </Select>

            {loading ? (
                <Shimmer />
            ) : (
                <>

                    <Grid>
                        {paginatedProducts.length > 0 ? (
                            paginatedProducts.map((product) => (
                                <Card key={product.id}>
                                    <Image src={product.mainImage} alt={product.title} />
                                    <CardTitle>{product.title}</CardTitle>
                                    <Text>{product.description}</Text>
                                    <Text color="#222" size="1.1rem" mb="4px">
                                        ${product.price}
                                    </Text>
                                    <Text size="0.9rem">Manufacturer: {product.manufacturer}</Text>
                                    <Text
                                        size="0.9rem"
                                        color={product.inStock ? "green" : "red"}
                                    >
                                        {product.inStock ? "In Stock" : "Out of Stock"}
                                    </Text>
                                    <Text size="0.8rem">Category: {product.category.name}</Text>
                                </Card>
                            ))
                        ) : (
                            <Text color="#999" size="1rem">
                                No products found matching your search or selected category.
                            </Text>
                        )}
                    </Grid>


                    {totalPages > 1 && (
                        <PaginationWrapper>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationButton
                                    key={index + 1}
                                    onClick={() => setCurrentPage(index + 1)}
                                    active={currentPage === index + 1}
                                >
                                    {index + 1}
                                </PaginationButton>
                            ))}
                        </PaginationWrapper>
                    )}
                </>
            )}
        </Container>
    );
};

export default Products;
