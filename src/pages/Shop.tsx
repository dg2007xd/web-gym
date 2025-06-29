// ...otros imports...
import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductosItems from "../components/ProductosItems";
import { API_URL } from "../utils";
import { Categoria } from "../types/Categoria";
import './Shop.css'

function Shop() {
    const [listaCategorias, setListaCategorias] = useState<Categoria[]>([]);
    const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<Categoria[]>([]);
    const [totalGeneral, setTotalGeneral] = useState(0);

    const [mostrarCategorias, setMostrarCategorias] = useState(true);
    const [mostrarHighlight, setMostrarHighlight] = useState(true);
    const [mostrarColor, setMostrarColor] = useState(true);
    const [mostrarMaterial, setMostrarMaterial] = useState(true);
    const [mostrarSize, setMostrarSize] = useState(true);
    const [mostrarBrands, setMostrarBrands] = useState(true);
    const [mostrarPrice, setMostrarPrice] = useState(true);
    const [mostrarRating, setMostrarRating] = useState(true);

    const [totalFiltrado, setTotalFiltrado] = useState(0);



    useEffect(() => {

    }, [categoriasSeleccionadas]);

    useEffect(() => {
        leerServicio();
        // Obtener el total general de productos
        fetch(API_URL + "productos.php?total=1")
            .then(res => res.json())
            .then(data => setTotalGeneral(data.total));
    }, []);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        fetch(API_URL + "categoria.php")
            .then(response => response.json())
            .then((data: Categoria[]) => {
                setListaCategorias(data);
            })
            .catch((error) => {
                console.error("Error consultando datos:", error);
            });
    };

    const dibujarCategorias = () => (
        <div className="d-grid gap-2">
            {listaCategorias.map(item => {
                const seleccionada = categoriasSeleccionadas.some(cat => cat.idcategoria === item.idcategoria);
                return (
                    <div className="form-check" key={item.idcategoria}>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`cat-${item.idcategoria}`}
                            checked={seleccionada}
                            onChange={() => toggleCategoria(item)}
                        />
                        <label className="form-check-label capitalize" htmlFor={`cat-${item.idcategoria}`}>
                            {item.nombrecategoria} ({item.total})
                        </label>
                    </div>
                );
            })}
        </div>
    );

    const toggleCategoria = (item: Categoria) => {
        setCategoriasSeleccionadas(prev => {
            if (prev.some(cat => cat.idcategoria === item.idcategoria)) {
                return prev.filter(cat => cat.idcategoria !== item.idcategoria);
            } else {
                return [...prev, item];
            }
        });
    };
    

    return (
        <>
            <PageHeader pageTitle="Shop" />
            <section id="store" className='padded padded-inverso-shop'>
                <div className="container">
                    <div className="row">
                        <div className="col-3">
                            <div className="category-box mb-4 p-3">
                                {/* ...SHOP BY CATEGORIES... */}
                                <div
                                    className="d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarCategorias(prev => !prev)}
                                >
                                    <span className="header-filter">
                                        SHOP BY CATEGORIES
                                    </span>
                                    <span style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarCategorias ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div
                                    className={`mt-2 filtro-animado${mostrarCategorias ? " show" : ""}`}
                                    style={{ overflow: "hidden" }}
                                >
                                    {dibujarCategorias()}
                                </div>
                            </div>

                            {/* ...HIGHLIGHT... */}
                            <div className="filter-box mb-4 p-3">
                                <div className="filter-title d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarHighlight(prev => !prev)}>
                                    <span className="header-filter">HIGHLIGHT</span>
                                    <span className="filter-toggle" style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarHighlight ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div className={`filtro-animado${mostrarHighlight ? " show" : ""}`}>
                                    <ul className="filter-list mb-2">
                                        <li className="filter-link text-color2">All Products</li>
                                        <li className="filter-link">Best Seller</li>
                                        <li className="filter-link">New Arrivals</li>
                                        <li className="filter-link">Sale</li>
                                        <li className="filter-link">Hot Items</li>
                                    </ul>
                                </div>
                            </div>

                            {/* ...FILTER BY COLOR... */}
                            <div className="filter-box mb-4 p-3">
                                <div className="filter-title d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarColor(prev => !prev)}>
                                    <span className="header-filter">FILTER BY COLOR</span>
                                    <span className="filter-toggle" style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarColor ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div className={`filtro-animado${mostrarColor ? " show" : ""}`}>
                                    <div className="filter-colors d-flex align-items-center gap-2 mb-2">
                                        <span className="color-circle color-black"></span>
                                        <span className="color-circle color-gray"></span>
                                        <span className="color-circle color-gold"></span>
                                        <span className="color-circle color-lightgray"></span>
                                        <span className="color-circle color-silver"></span>
                                        <span className="color-circle color-white"></span>
                                    </div>
                                </div>
                            </div>

                            {/* ...FILTER BY MATERIAL... */}
                            <div className="filter-box mb-4 p-3">
                                <div className="filter-title d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarMaterial(prev => !prev)}>
                                    <span className="header-filter">FILTER BY MATERIAL</span>
                                    <span className="filter-toggle" style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarMaterial ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div className={`filtro-animado${mostrarMaterial ? " show" : ""}`}>
                                    <div className="filter-materials d-flex flex-wrap gap-2">
                                        <span className="material-chip">Brass (3)</span>
                                        <span className="material-chip">Bronze (5)</span>
                                        <span className="material-chip">Nickel (7)</span>
                                        <span className="material-chip">Stainless Steel (8)</span>
                                    </div>
                                </div>
                            </div>

                            {/* ...FILTER BY SIZE... */}
                            <div className="filter-box mb-4 p-3">
                                <div className="filter-title d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarSize(prev => !prev)}>
                                    <span className="header-filter">FILTER BY SIZE</span>
                                    <span className="filter-toggle" style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarSize ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div className={`filtro-animado${mostrarSize ? " show" : ""}`}>
                                    <div className="filter-sizes d-flex flex-wrap gap-2">
                                        <span className="material-chip">Small (1)</span>
                                        <span className="material-chip">Medium (1)</span>
                                        <span className="material-chip">Large (1)</span>
                                    </div>
                                </div>
                            </div>

                            {/* ...BRANDS... */}
                            <div className="filter-box mb-4 p-3">
                                <div className="filter-title d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarBrands(prev => !prev)}>
                                    <span className="header-filter">BRANDS</span>
                                    <span className="filter-toggle" style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarBrands ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div className={`filtro-animado${mostrarBrands ? " show" : ""}`}>
                                    <div className="filter-brands">
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand1" />
                                            <label className="form-check-label" htmlFor="brand1">Cartify (2)</label>
                                        </div>
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand2" />
                                            <label className="form-check-label" htmlFor="brand2">EcomZone (3)</label>
                                        </div>
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand3" />
                                            <label className="form-check-label" htmlFor="brand3">EcoShop (1)</label>
                                        </div>
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand4" />
                                            <label className="form-check-label" htmlFor="brand4">MegaMart (2)</label>
                                        </div>
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand5" />
                                            <label className="form-check-label" htmlFor="brand5">QuickCart (2)</label>
                                        </div>
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand6" />
                                            <label className="form-check-label" htmlFor="brand6">SmartShop (2)</label>
                                        </div>
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand7" />
                                            <label className="form-check-label" htmlFor="brand7">StyleHub (1)</label>
                                        </div>
                                        <div className="form-check mb-1">
                                            <input className="form-check-input" type="checkbox" id="brand8" />
                                            <label className="form-check-label" htmlFor="brand8">TrendMart (2)</label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ...PRICE FILTER... */}
                            <div className="filter-box mb-4 p-3">
                                <div className="filter-title d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarPrice(prev => !prev)}>
                                    <span className="header-filter">PRICE FILTER</span>
                                    <span className="filter-toggle" style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarPrice ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div className={`filtro-animado${mostrarPrice ? " show" : ""}`}>
                                    <ul className="filter-list mb-2">
                                        <li className="filter-link text-color2">All</li>
                                        <li className="filter-link">$30–$40</li>
                                        <li className="filter-link">$40–$50</li>
                                        <li className="filter-link">$50+</li>
                                    </ul>
                                </div>
                            </div>

                            {/* ...AVERAGE RATING... */}
                            <div className="filter-box mb-4 p-3">
                                <div className="filter-title d-flex align-items-center justify-content-between"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => setMostrarRating(prev => !prev)}>
                                    <span className="header-filter">AVERAGE RATING</span>
                                    <span className="filter-toggle" style={{ fontSize: "2rem", lineHeight: "1" }}>
                                        {mostrarRating ? "−" : "+"}
                                    </span>
                                </div>
                                <hr className="my-2 linea-box" />
                                <div className={`filtro-animado${mostrarRating ? " show" : ""}`}>
                                    <ul className="filter-list mb-2">
                                        <li className="filter-link d-flex align-items-center mb-1" style={{ cursor: "pointer" }}>
                                            <span style={{ color: "#ffc107", fontSize: "1.1em" }}>
                                                ★★★★★
                                            </span>
                                            <span className="ms-2 negro">(10)</span>
                                        </li>
                                        <li className="filter-link d-flex align-items-center mb-1" style={{ cursor: "pointer" }}>
                                            <span style={{ color: "#ffc107", fontSize: "1.1em" }}>
                                                ★★★★☆
                                            </span>
                                            <span className="ms-2 negro">(14)</span>
                                        </li>
                                        <li className="filter-link d-flex align-items-center mb-1" style={{ cursor: "pointer" }}>
                                            <span style={{ color: "#ffc107", fontSize: "1.1em" }}>
                                                ★★★☆☆
                                            </span>
                                            <span className="ms-2 negro">(0)</span>
                                        </li>
                                        <li className="filter-link d-flex align-items-center mb-1" style={{ cursor: "pointer" }}>
                                            <span style={{ color: "#ffc107", fontSize: "1.1em" }}>
                                                ★★☆☆☆
                                            </span>
                                            <span className="ms-2 negro">(0)</span>
                                        </li>
                                        <li className="filter-link d-flex align-items-center mb-1" style={{ cursor: "pointer" }}>
                                            <span style={{ color: "#ffc107", fontSize: "1.1em" }}>
                                                ★☆☆☆☆
                                            </span>
                                            <span className="ms-2 negro">(0)</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <div className="d-flex d-inline"></div>
                            <h3 id="mostrando-shop">
                                {categoriasSeleccionadas.length === 1
                                    ? `Mostrando los ${totalFiltrado || totalGeneral} resultados`
                                    : `Mostrando 1–${Math.min(12, totalFiltrado || totalGeneral)} de ${totalFiltrado || totalGeneral} resultados`
                                }
                            </h3>
                            {/* Chips de categorías seleccionadas */}
                            {categoriasSeleccionadas.length > 0 && (
                                <div className="mb-3 d-flex align-items-center">
                                    <div>
                                        {categoriasSeleccionadas.map(cat => (
                                            <span
                                                key={cat.idcategoria}
                                                className="Categorie-tip me-2 mb-3"
                                                aria-label="Quitar"
                                                onClick={() => toggleCategoria(cat)}
                                                style={{
                                                    padding: "0.5em 1em",
                                                    display: "inline-flex"
                                                }}
                                            >
                                                <i className="bi bi-x X-tip me-1 center fw-bold"></i>
                                                {cat.nombrecategoria}
                                            </span>
                                        ))}
                                        <button
                                            className="btn btn-link clear-boton me-3 p-0"
                                            onClick={() => setCategoriasSeleccionadas([])}
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                </div>
                            )}
                            {/* Productos */}
                            <ProductosItems
                                codigosCategoria={categoriasSeleccionadas.map(cat => cat.idcategoria)}
                                mostrarPorDefecto={categoriasSeleccionadas.length === 0}
                                setTotalFiltrado={setTotalFiltrado}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Shop;