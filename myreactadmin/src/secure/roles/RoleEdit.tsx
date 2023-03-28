import React, { SyntheticEvent } from 'react'
import axios from 'axios'
import Wrapper from '../Wrapper';
import { Navigate } from 'react-router-dom';
import { Role } from '../../classes/role';
import withRouter from '../../withRouter';
import { Permission } from '../../classes/permission';

class RoleEdit extends React.Component {
    state = {
        permissions: [],
        name : '',
        selected : [],
        redirect: false
    }
    dataId: any; 
    id =0;
    name = '';
    selected : number[] =[];
    

    componentDidMount = async () => {
        this.dataId = this.props;
        this.id = this.dataId.params.id;

        const permissionsCall = await axios.get('permissions');

        const roleCall = await axios.get(`roles/${this.id}`);

        const role: Role = roleCall.data.data;
        this.selected = role.permission.map((p: Permission)=>p.id)

        this.setState({
            permissions : permissionsCall.data.data,
            name : role.name,
            selected : this.selected

        })
    }
    isChecked = (id:number) => {
        return (this.state.selected.filter(s => s === id).length>0)
    }
    check = (id: number) => {
        if(this.selected.filter(s => s ===id).length > 0){
            this.selected = this.selected.filter(s => s!==id);
            return;
        }

        this.selected.push(id);
    }

    submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.put(`roles/${this.id}`, {
            name : this.name,
            permission : this.selected
        });

        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate replace to='/roles'/>;
        }

        return (
            <Wrapper>
                <form onSubmit={this.submit}>
                    <div className="form-group row">
                        <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" name="name" id="name"
                            defaultValue={this.name = this.state.name}
                              onChange={e => this.name = e.target.value}     
                            />
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Permissions</label>
                        <div className="col-sm-10">
                            {this.state.permissions.map(
                                (p: Permission) => {
                                    return (
                                        <div className="form-check form-check-inline col-3" key={p.id}>
                                            <input className="form-check-input" type="checkbox" value={p.id}
                                                   defaultChecked={this.isChecked(p.id)}
                                                   onChange={e => this.check(p.id)}
                                            />
                                            <label className="form-check-label">{p.name}</label>
                                        </div>
                                    )
                                }
                            )}
                        </div>
                    </div>

                    <button className="btn btn-outline-secondary">Save</button>
                </form>
            </Wrapper>
        );
    }
}

export default withRouter(RoleEdit);