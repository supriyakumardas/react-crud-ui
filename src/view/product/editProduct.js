import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { error } from '../../constants/errorText';
import { showErrorMessage, showSuccessMessage } from '../../constants/alertMessages';
import { Puff } from 'react-loader-spinner'
import { path } from '../../constants/path';
import { Button, Input } from 'antd';
import productService from '../../service/productService';


const EditProduct = () => {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const [name, setName] = useState("");
  const [vendor, setVendor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");


  const [isError, setIsError] = useState(false);

  const [loader, setLoader] = useState(true);

  const { id } = useParams();


  const getProductDetails = async () => {
    try {
      const res = await productService.getProductDetails(id);

      if (res.status === 200) {
        console.log(res.data.product)
        setName(res.data.product.name);
        setVendor(res.data.product.vendor);
        setPrice(res.data.product.price);
        setQuantity(res.data.product.quantity);

      }

    } catch (error) {
      showErrorMessage(error.response.data.message)
    }
  }

  const initialLoad = async () => {
    await getProductDetails()
    setLoader(false);

  }
  useEffect(() => {
    initialLoad();
  },[])


  const navigate = useNavigate();

  const handleSize = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }

  useEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);

    return () => window.removeEventListener('resize', handleSize)
  }, [windowWidth])

  const clearFields = () => {
    setName("");
    setVendor("");
    setPrice("");
    setQuantity("");
  }

  const updateHandler = async () => {
    try {
      if (!name || name.trim() === "") {
        setIsError(true)
        return;
      }
      if (!vendor || vendor.trim() === "") {
        setIsError(true)
        return;
      }
      if (!price) {
        setIsError(true)
        return;
      }
      if (!quantity) {
        setIsError(true)
        return;
      }

      setLoader(true);

      const userId = window.localStorage.getItem("userId");
      const payload = {}
      payload.name = name;
      payload.vendor = vendor;
      payload.price = price;
      payload.quantity = quantity;
      payload.userId = userId;

      const res = await productService.updateProduct(id,payload)

      if (res.status === 200) {
        showSuccessMessage(res.data.message)
        setTimeout(() => {
          navigate(path.product);
          clearFields();
          setLoader(false)
        }, 100);

      }

    } catch (error) {
      showErrorMessage(error.response.data.message)
      setLoader(false)
    }
  };


  return (
    <>
      <div style={{ width: windowWidth, height: windowHeight }} className="row-center">
        <div
          style={{
            height: 500,
            width: 500,
            backgroundColor: '#fff',
            boxShadow: '5px 1px 15px 0 gray',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'row',
          }}
        >

          <div style={{ width: '100%', height: '100%' }}>

            <div style={{ height: '15%', width: '100%' }} className="row-bottom">
              <div style={{ fontWeight: 'bolder', color: '#000', fontSize: '28px' }}>Update Product</div>
            </div>
            <div style={{ height: '85%', width: '100%', paddingTop: 50 }} className="row-top">
              <div style={{ width: '75%' }}>
                <div>
                  <Input
                    className="input-field"
                    type="text" name="name"
                    placeholder="Enter Name"

                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  {
                    isError && (!name || name.trim() === "") ?
                      <div className="error-text">{error.name}</div> :
                      null
                  }

                </div>
                <div>
                  <Input
                    className="input-field"
                    type="text" name="vendor"
                    placeholder="Enter Vendor"
                    value={vendor}
                    onChange={(e) => setVendor(e.target.value)}
                  />

                  {
                    isError && (!vendor || vendor.trim() === "") ?
                      <div className="error-text">{error.vendor}</div> :
                      null
                  }


                </div>
                <div>
                  <Input
                    className="input-field"
                    type="number" name="price"
                    placeholder="Enter Price"

                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />

                  {
                    isError && (!price) ?
                      <div className="error-text">{error.price}</div> :
                      null
                  }

                </div>
                <div>
                  <Input
                    className="input-field"
                    type="number" name="quantity"
                    placeholder="Enter Quantity"

                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />

                  {
                    isError && (!quantity) ?
                      <div className="error-text">{error.quantity}</div> :
                      null
                  }

                </div>


                <Button type='primary' block onClick={updateHandler}>
                  {loader ?
                    <div className='row-center'>
                      <Puff
                        visible={true}
                        height="25"
                        width="25"
                        color="#fff"
                        ariaLabel="puff-loading"
                      />
                    </div> :

                    "Update"}
                </Button>
                <div style={{ marginTop: 10 }}>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};




export default EditProduct