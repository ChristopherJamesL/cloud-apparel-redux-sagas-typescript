import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";
// import {  addCollectionAndDocuments } from "../utils/firebase/firebase.utils";

// import SHOP_DATA from '../shop-data';

export const CategoriesContext = createContext({
    categoriesMap: {},

});

export const CategoriesProvider = ({ children }) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        }
        getCategoriesMap();
    }, []);

    // This was used to write the SHOP_DATA to the firebase database on app load.  Then removed after
    // shop items were added successfully.
    // useEffect(() => {
    //     addCollectionAndDocuments('categories', SHOP_DATA);
    // }, []);

    const value = { categoriesMap };

    return (
        <CategoriesContext.Provider value={value} > {children} </CategoriesContext.Provider>
    )
}