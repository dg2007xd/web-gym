interface NavItem {
    label: string;
    url: string;
    icon: string;
}


export const navItems: NavItem[] = [
    { label: "home", url: "/", icon: "" },
    { label: "shop", url: "/tienda", icon: "" },
    { label: "categories", url: "/categories", icon: "" },
    { label: "sessions", url: "/sessions", icon: "" },///url: "/products"
    { label: "top-deals", url: "#", icon: "" },//url: "/top-deals"
    { label: "elements", url: "#", icon: "" },//url: "/elements"
    //{label: "clientes", url: "/clientes"}
]

export const navItemsRight: NavItem[] = [
    { label: "", url: "/search", icon: "bi-search" },
    { label: "", url: "/sesion", icon: "bi-person" },
    { label: "", url: "/favourites", icon: "bi-heart" },
    { label: "", url: "", icon: "bi-bag-dash" },
]
