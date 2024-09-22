import React ,{useState,useEffect}from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { path } from '../../constants/path';
import { showErrorMessage, showSuccessMessage } from '../../constants/alertMessages';
import { DeleteOutlined  } from '@ant-design/icons';
import productService from '../../service/productService';
import { Modal } from 'antd';

const { confirm } = Modal;

const Product = () => {
  const [windowHeight , setWindowHeight] = useState(window.innerHeight);
  const [windowWidth , setWindowWidth] = useState(window.innerWidth);

  const [loader, setLoader] = useState(true);

  const [products , setProducts] = useState([]);


  const getAllProducts= async()=>{
    try {
      const userId = window.localStorage.getItem("userId");
      const res = await productService.getProductByUserId(userId);

      if(res.status === 200){
        setProducts(res.data.product)
      }

    } catch (error) {
      showErrorMessage(error.response.data.message)   
     }
  }

  const initialLoad=async()=>{
    await getAllProducts()
    setLoader(false);

  }
  useEffect(()=>{
    initialLoad();
  },[])



  const handleSize =()=>{
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
}

useEffect(()=>{
    handleSize();
    window.addEventListener('resize',handleSize);

    return ()=> window.removeEventListener('resize',handleSize)
},[windowWidth])


const showDeleteConfirm = (product) => {
  confirm({
    title: 'Are you sure delete this product?',
    icon: <DeleteOutlined  />,
    content: `"${product.name}" will be deleted permanently.`,
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      deleteHandler(product)
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};


const deleteHandler=async(product)=>{
  try {
    const res = await productService.deleteProduct(product._id);
    if(res.status === 200){
      showSuccessMessage(res.data.message);
      initialLoad();
    }
  } catch (error) {
    showErrorMessage(error.response.data.message)   
  }
}


  return (
<>
     
    
<div style={{ width:windowWidth, height: windowHeight ,paddingTop:200}} className="row-top">
      {
        loader ? null:

        <div
        style={{
          height:"auto",
          width:windowWidth*3/4,
          backgroundColor: '#fff',
          boxShadow: '5px 1px 15px 0 gray',
          borderRadius:'10px',
          padding:10
        
        }}
      >
      
       <div style={{width:"100%",display:"flex",flexDirection:"row-reverse"}}>
       <a href={path.createProduct}>
       <Button variant="primary">Create Product</Button>
       </a>
 
       </div>
 {
  products.length === 0 ?
  <div>
  <div className='row-center' style={{paddingTop:10}}>
      <h2>No Data Found.</h2>
    </div>
    <div className='row-center' >
      <p>Add product by clicking create product button.</p>
    </div>
    </div>:

<Table responsive>
<thead>
  <tr>
    <th>SL No.</th>
    
      <th >Name</th>
      <th >Vendor</th>
      <th >Price</th>
      <th >Quantity</th>
      <th >Action</th>
  </tr>
</thead>
<tbody>
 {
   products.map((item,index)=>{
     return(
       <tr key={index}>
         <td>{index+1}</td>
         <td >{item.name}</td>
         <td >{item.vendor}</td>
         <td >₹ {parseFloat(item.price).toFixed(2)}</td>
         <td >{item.quantity}</td>
         <td >
         <a href={path.editProduct+`${item._id}`}>

         <Button className='btn-sm' variant="warning">Edit</Button>
         </a>
         <Button className='btn-sm  mx-2' variant="danger" onClick={()=>showDeleteConfirm(item)}>Delete</Button>
         </td>

     </tr>
     )
   })
 }
</tbody>
</Table>

 }
     
      </div>
        
      }
   
     </div>
</>
   
  )
}

export default Product