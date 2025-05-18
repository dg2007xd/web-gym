interface NavItem{
    label: string;
    url: string;
}

export const navItems: NavItem[] = [
    {label: "home", url: "/"},
    {label: "shop", url: "/tienda"},
    {label: "categories", url: "/categories"},
    {label: "products", url: "/products"},
    {label: "top-deals", url: "/top-deals"},
    {label: "elements", url: "/elements"},
    {label: "clientes", url: "/clientes"}
]
