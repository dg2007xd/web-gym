interface NavItem {
    label: string;
    url: string;
    icon: string;
}


export const navItems: NavItem[] = [
    { label: "home", url: "/", icon: "" },
    { label: "shop", url: "/tienda", icon: "" },
    { label: "categories", url: "/categories", icon: "" },
    { label: "products", url: "/products", icon: "" },
    { label: "top-deals", url: "/top-deals", icon: "" },
    { label: "elements", url: "/elements", icon: "" },
    //{label: "clientes", url: "/clientes"}
]

export const navItemsRight: NavItem[] = [
    { label: "", url: "/search", icon: "bi-search" },
    { label: "", url: "/sesion", icon: "bi-person" },
    { label: "", url: "/favourites", icon: "bi-heart" },
    { label: "", url: "/cart", icon: "bi-bag-dash" },
]
