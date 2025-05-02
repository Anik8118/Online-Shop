import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import { db } from "../../firebase";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fakeBaseQuery(),
    tagTypes: ["products"],
    endpoints: (builder) =>({
        getAllProducts: builder.query({
            async queryFn(){
                try{
                    const productsCollectionRef = collection(db, "products");
                    const data = await getDocs(productsCollectionRef);
                    const filteredData = data.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }));
                    return {data:filteredData}
                }catch(error){
                    return {error: "Failed to fetch products"};
                }
            },
            providesTags: ["products"]
        }),
        addProduct: builder.mutation({
            queryFn: async (product) =>{
                await addDoc(collection(db, "products"), product);
            },
            invalidatesTags: ["products"],
        }),
        removeProduct: builder.mutation({
            queryFn: async (id) =>{
                try{
                    await deleteDoc(doc(db, "products", id));
                    return {data: id}
                }catch(error){
                    return {error: "Failed to fetch products"};
                }
            },
            invalidatesTags: ["products"],
        })
    })
});

export const {
    useGetAllProductsQuery,
    useAddProductMutation,
    useRemoveProductMutation
} = apiSlice;