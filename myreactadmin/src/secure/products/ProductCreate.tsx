import React, { Component, SyntheticEvent } from 'react'
import Wrapper from '../Wrapper'
import axios from 'axios'
import { Navigate } from 'react-router-dom';
import ImageUpload from '../components/ImageUpload';

export default class ProductCreate extends Component {

    state={
        image : '',
        redirect: false
    }

    title ='';
    description ='';
    image = '';
    price = 0;


    submit = async (e: SyntheticEvent) =>{
        e.preventDefault();

        await axios.post('products',{
            title : this.title,
            description : this.description,
            image : this.image,
            price : this.price
        });
        
        this.setState({
            redirect : true
        })
        
    }

    imageChanged = (image : string) => {
        // if ( files === null) return;

        // const data = new FormData();
        // data.append('image', files[0]);

        // const response = await axios.post('upload', data);
        
        // this.image = response.data.url;

        this.image = image;

        this.setState({
            image : this.image
        })

    }

  render() {

    if(this.state.redirect){
        return <Navigate replace to = '/products'/>;
    }

    return (
        <Wrapper>
        <form onSubmit={this.submit}>
            <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title"
                 onChange={e => this.title = e.target.value}      
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" name="description"
                 onChange={e => this.description = e.target.value}         
                ></textarea>
            </div>
            <div className="form-group">
                <label>Image</label>
                <ImageUpload stateImage={this.state.image} imageChanged={this.imageChanged}/>
                
                {/* <div className='input-group'>
                    <input type='text' className='form-control' name='image'
                    value={this.image = this.state.image}
                    onChange={e => this.image = e.target.value}/>

                    <div className='input-group-append'>
                        <label className='btn btn-primary'>
                            Upload <input type='file' hidden 
                            onChange={e =>this.upload(e.target.files)}/>
                        </label>
                    </div>
                </div> */}
                
            </div>
            <div className="form-group">
                <label>Price</label>
                <input type="number" className="form-control" name="email"
                onChange={e => this.price = parseFloat(e.target.value)}   
                />
            </div>

            <button className="btn btn-outline-secondary">Save</button>
        </form>
    </Wrapper>
    )
  }
}
