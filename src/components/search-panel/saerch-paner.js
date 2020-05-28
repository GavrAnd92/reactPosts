import React from 'react';


import './search-panel.css';


export default class SearchPanel extends React.Component {
    
    state = {
        tern:""
    }

    onUpdateSearch = (e)=>{
        const term = e.target.value;
        this.setState({term});
        this.props.onUpdateSearch(term);
    }

    render(){
        return (
            <input 
                className="form-control search-input"
                type="text"
                placeholder="Пошук по записам"
                onChange={this.onUpdateSearch}
            />
        )
    }
}
