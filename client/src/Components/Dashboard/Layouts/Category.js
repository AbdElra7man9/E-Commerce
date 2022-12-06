import React, { useState } from 'react'
import { useGetCategoryQuery } from '../../../Redux/APIs/CategoryApi';
const Category = (props) => {
    // eslint-disable-next-line
    const [subcategory, setSubCategory] = useState('')
    const { data: Category } = useGetCategoryQuery();

    return (
        <>
            <div className='grid grid-cols-2 gap-4'>
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">Select Category</label>
                    <select onChange={props.onChange} id="category" value={props.valuecat} name='category' className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                        <option value=''> --- Choose One --- </option>
                        {Category &&
                            Category?.map((cat) => (
                                <option key={cat._id} value={cat._id} onClick={() => setSubCategory(cat._id)}>{cat.category}</option>
                            ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm py-3 font-light font-serif text-gray-500">Select Sub Category</label>
                    <select onChange={props.onChange} id="category" value={props.valuesub} name='subcategory' className="bg-gray-50 border mt-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none">
                        <option value=''> --- Choose One --- </option>
                        {Category &&
                            Category?.map((cat) => (
                                //subcategory === cat._id &&
                                cat.subcategory?.map((child) => (
                                    <option key={child._id} value={child.nameOfSub}>{child.nameOfSub}</option>
                                ))
                            ))}
                    </select>
                </div>
            </div>
        </>
    )
}

export default Category
