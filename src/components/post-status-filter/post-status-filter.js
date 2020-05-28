import React from 'react';

import { Button } from 'reactstrap';


import './post-status-filter.css';


export default class PostStatusFilter extends React.Component {


    constructor(props){
        super(props);
        this.buttons = [
            {name: "all", label: 'Всі'},
            {name: "like", label: 'Сподобалося'}
        ]
    }
    
    render(){

        const buttons = this.buttons.map(({name, label})=>{
            const active = (this.props.filter === name);
            const clazz = active ? "info" : "secondary";
            return (
                <Button 
                    key={name} 
                    color={clazz}
                    onClick={()=>this.props.onFilterSelect(name)}>{label}</Button>
            )
        });

        return (
            <div className="btn-group">

                {buttons}
    
            </div>
        )
    }
}
