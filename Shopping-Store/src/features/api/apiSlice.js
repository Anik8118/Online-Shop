import {createApi, fakeBaseQuery} from "@reduxjs/toolkit/query/react";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc} from "firebase/firestore";
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
                try{
                    await addDoc(collection(db, "products"), product);
                    return {data: product}
                }catch(error){
                    return {error}
                }
            },
            invalidatesTags: ["products"],
        }),

        editProduct: builder.mutation({
            queryFn: async (product) => {
                try {
                    const docRef = doc(db, "products", product.id);
                    const { id, ...updateData } = product;
                    
                    edit = await updateDoc(docRef, updateData);
        
                    return { data: edit};
                } catch (error) {
                    return { error: error.message }; 
                }
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
    useRemoveProductMutation,
    useEditProductMutation
} = apiSlice;