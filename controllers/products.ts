import {Product} from '../types.ts'
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

let products: Product[] = [
  { 
    id: "1",
    name: "product 1",
    description: "this is product 1",
    price: 29.99
  },
  { 
    id: "2",
    name: "product 2",
    description: "this is product 2",
    price: 23.99
  },
  { 
    id: "3",
    name: "product 3",
    description: "this is product 1",
    price: 49.99
  },
]

// ? @desc Get all products
// ? @route GET /api/v1/products
const getProducts = ({ response }: {  response: any }) => {
  response.body = {
    success: true,
    data: products
  }
}

// ? @desc Get single product
// ? @route GET /api/v1/products/:id
const getProduct = ({ response, params}: { params: { id: string }, response: any }) => {
  const product: Product | undefined = products.find(p => p.id === params.id)

  if(product) {
    response.status = 200
    response.body = {
      success: true,
      data:product
    }
  } else {
    response.status = 404 
    response.body = {
      success: false,
      msg: 'No product found'
    }
  }
}


// ? @desc add a product
// ? @route post /api/v1/products/
const addProduct = async ({ request, response}: { request:any, response: any }) => {
  const body = await request.body()
  if(!request.hasBody){
    response.status = 400
    response.body = {
      success: false,
      msg: 'No Data'
    }
  } else {
    const product: Product = body.value
    product.id = v4.generate()
    products.push(product)
    response.status = 201
    response.body = {
      success: true,
      data: product
    }
  }
}


// ? @desc update a product
// ? @route put /api/v1/products/:id
const updateProduct = async ({ params, request, response}: { params: { id: string }, request: any, response: any }) => {
  const product: Product | undefined = products.find(p => p.id === params.id)

  if(product) {
    const body = await request.body()
    const updateData: {name?: string; description?: string; price?: number } = body.value
    products = products.map(p => {
      return p.id === params.id ? { ...p, ...updateData } : p 
    })
    response.status = 200
    response.body = {
      success: true,
      data: products
    }
  } else {
    response.status = 404 
    response.body = {
      success: false,
      msg: 'No product found'
    }
  }

}
// ? @desc delete a product
// ? @route delete /api/v1/products/:id
const deleteProduct = ({ params, response}: { response: any, params: { id: string } }) => {
  products = products.filter(p => p.id !== params.id )
  response.body = {
    success: true,
    msg: 'Product removed'
  }

}

export { getProducts, getProduct, updateProduct, addProduct,deleteProduct }