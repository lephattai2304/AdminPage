import React, { SyntheticEvent } from 'react'
import axios from 'axios'
import Wrapper from '../Wrapper';
import withRouter from '../../withRouter';
import { Order } from '../../classes/oder';
import { OrderItem } from '../../classes/order_item';

class OrderItems extends React.Component {

    state = {
       order_items : []
    }

    dataId: any; 
    id =0;
    

    componentDidMount = async () => {
        this.dataId = this.props;
        this.id = this.dataId.params.id;

        const response = await axios.get(`orders/${this.id}`);
        const order: Order = response.data;
        
        this.setState({
            order_items :  order.order_items
        })
        console.log(this.state.order_items);
        
    }

    render() {
        
        return (
            <Wrapper>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.state.order_items.map(
                                (order_item : OrderItem) => {
                                    return(
                                        <tr key={order_item.id}>
                                        <td>{order_item.id}</td>
                                        <td>{order_item.product_title}</td>
                                        <td>{order_item.price}</td>
                                        <td>{order_item.quantity}</td>
                                    </tr>
                                    )
                                    
                                }
                            )}
                        </tbody>
                    </table>
                </div>
            </Wrapper>
        );
    }
}

export default withRouter(OrderItems);