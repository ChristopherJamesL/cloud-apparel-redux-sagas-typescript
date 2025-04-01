import { 
    call, 
    put, 
    takeLatest, 
    all,
    CallEffect,
    PutEffect,
    AllEffect,
    ForkEffect
} from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';
import { Category } from './category.types';

export function* fetchCategoriesAsync(): Generator<
    | CallEffect<Category[]>
    | PutEffect<ReturnType<typeof fetchCategoriesSuccess>>
    | PutEffect<ReturnType<typeof fetchCategoriesFailed>>,
    void, 
    Category[]
> {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories(): Generator<
    ForkEffect<never>,
    void,
    never
> {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga(): Generator<
    AllEffect<CallEffect<void>>,
    void,
    never
> {
    yield all([call(onFetchCategories)]);

}