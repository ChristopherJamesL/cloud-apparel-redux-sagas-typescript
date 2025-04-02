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

// ===== Types =====
export type FetchCategoriesAsync<T = void> = Generator<
    CallEffect<T> | PutEffect<{ type: string; payload?: any }>,
    void,
    T
>

export type OnFetchCategories = Generator<ForkEffect<never>, void, never>;

export type CategoriesSaga = Generator<AllEffect<CallEffect<void>>, void, never>;

// ===== Functions =====
export function* fetchCategoriesAsync(): FetchCategoriesAsync<Category[]> {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments);
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error as Error));
    }
}

export function* onFetchCategories(): OnFetchCategories {
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga(): CategoriesSaga {
    yield all([call(onFetchCategories)]);
}