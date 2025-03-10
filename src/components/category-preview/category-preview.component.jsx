import { Link } from 'react-router';
import { useSelector } from 'react-redux';

import { selectCategoriesIsLoading } from '../../store/categories/category.selector';

import ProductCard from '../product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <div className='category-preview-container' >
            <h2>
                <Link className='title' to={title} >{title.toUpperCase()}</Link>
            </h2>
            {isLoading ? (
                <Spinner />
            ) : (
                <div className='preview' >
                    {products
                        .filter((_, index) => index < 4)
                        .map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                </div>  
            )}
        </div>
    )
}

export default CategoryPreview;