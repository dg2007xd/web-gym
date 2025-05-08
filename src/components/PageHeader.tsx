import './PageHeader.css'
interface PageHeaderProps {
    pageTitle: string;
}

function PageHeader(props: PageHeaderProps) {

    return (
        <header id="page-header">
            <div className="container">
                <p className='center'>Home / {props.pageTitle}</p>
                <h1 className='center'>{props.pageTitle}</h1>
            </div>
        </header>
    )
}

export default PageHeader