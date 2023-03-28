import React, { SyntheticEvent } from 'react'
import axios from 'axios'
import Wrapper from '../Wrapper';
import { Navigate } from 'react-router-dom';
import withRouter from '../../withRouter';
import ImageUpload from '../components/ImageUpload';
import { Product } from '../../classes/product';

class ProductEdit extends React.Component {

    state = {
        title : '',
        description : '',
        image : '',
        price : 0,
        redirect: false
    }

    dataId: any; 
    id =0;
    title ='';
    description ='';
    image = '';
    price = 0;

    componentDidMount = async () => {
        this.dataId = this.props;
        this.id = this.dataId.params.id;

        const response = await axios.get(`products/${this.id}`);
        const product: Product = response.data;
        
        this.setState({
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price
        })
    }

    submit = async (e: SyntheticEvent) =>{
        e.preventDefault();

        await axios.put(`products/${this.id}`,{
            title : this.state.title,
            description : this.state.description,
            image : this.state.image,
            price : this.state.price
        });
        
        this.setState({
            redirect : true
        })
        
    }

    imageChanged = (image : string) => {

        this.image = image;

        this.setState({
            image : this.image
        })

    }


    render() {
        if (this.state.redirect) {
            return <Navigate replace to='/products'/>;
        }

        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" className="form-control" name="title"
                        defaultValue={this.state.title}
                        onChange={e => this.setState({title : e.target.value})}      
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea className="form-control" name="description"
                        defaultValue={this.state.description}
                        onChange={e => this.setState({description: e.target.value})}         
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <ImageUpload stateImage={this.image = this.state.image} imageChanged={this.imageChanged}/>
                        
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input type="number" className="form-control" name="email"
                        value={this.price = this.state.price}
                        onChange={e => this.setState({price : e.target.value})}  

                        />
                    </div>

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        );
    }
}

export default withRouter(ProductEdit);