import React from 'react'
export default function Form() {
  return (
    <div className='container'>
    <form>
   
    <div class="row mb-4 mt-5">
    <h3 className='text-center mb-5'>Add Product</h3>
      <div class="col">
        
        <div class="form-outline">
          <label class="form-label " for="form3Example1">Product name</label>
          <input type="text" id="form3Example1" class="form-control" />
        </div>
      </div>
      <div class="col">
        <div class="form-outline">
          <label class="form-label" for="form3Example2">Price</label>
          <input type="text" id="form3Example2" class="form-control" />
        </div>
      </div>
    </div>
    <div class="row mb-4 mt-5">
      <div class="col">
        <div class="form-outline">
          <label class="form-label " for="form3Example1">Description</label>
          <input type="text" id="form3Example1" class="form-control" />
        </div>
      </div>
      <div class="col">
        <div class="form-outline">
          <label class="form-label" for="form3Example2">Category</label>
          <input type="text" id="form3Example2" class="form-control" />
        </div>
      </div>
    </div>
    <div class="row mb-4 mt-5">
      <div class="col">
        <div class="form-outline">
          <label class="form-label " for="form3Example1">Main Image</label>
          <input type="text" id="form3Example1" class="form-control" />
        </div>
      </div>
      <div class="col">
        <div class="form-outline">
          <label class="form-label" for="form3Example2">Sub Image 1</label>
          <input type="text" id="form3Example2" class="form-control" />
        </div>
      </div>
    </div>
    <div class="row mb-4 mt-5">
      <div class="col">
        <div class="form-outline">
          <label class="form-label " for="form3Example1">Sub Image 2</label>
          <input type="text" id="form3Example1" class="form-control" />
        </div>
      </div>
      <div class="col">
        <div class="form-outline">
          <label class="form-label" for="form3Example2">Sub Image 3</label>
          <input type="text" id="form3Example2" class="form-control" />
        </div>
      </div>
    </div>

  
  
    <button type="submit" class="btn btn-primary btn-block mb-4">Add Product</button>
  
  </form>
  </div>
  )
}
