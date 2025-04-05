import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { selectCategoriesMap } from '../../store/categories/category.selector';
import { selectCategoriesIsLoading } from '../../store/categories/category.selector';

import { CategoryContainer, CategoryTitle } from './category.styles';

type CategoryRouteParams = {
    category: string;
};

const Category = () => {
    const { category } = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]); 
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <CategoryTitle >{category.toUpperCase()}</CategoryTitle>
            {isLoading ? (
                <Spinner />
            ) : (
                <CategoryContainer>
                    {products && products.map(product => {
                        return <ProductCard key={product.id} product={product} />
                    })}
                </CategoryContainer>
            )}
        </Fragment>
    )
}

export default Category;