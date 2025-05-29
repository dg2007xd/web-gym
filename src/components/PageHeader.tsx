import './PageHeader.css'
interface PageHeaderProps {
    pageTitle: string;
}

function PageHeader(props: PageHeaderProps) {

    return (
        <header id="page-header">
            <div className="container mt-4 mb-4">
                <p className='center before-header-style'>Home / {props.pageTitle}</p>
                <h1 className='center page-header-style'>{props.pageTitle}</h1>
            </div>
        </header>
    )
}

export default PageHeader