import React from 'react';


import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';

import './app.css';


export default class App extends React.Component {

    state = {
        data:[  
                {label:"Going to learn React", important:true, like:false, id:1},
                {label:"Going to learn JS", important:false, like:false, id:2},
                {label:"Going to learn Vue", important:false, like:false, id:3}
        ],
        term:"",
        filter:"all"
    }

    constructor(props){
        super(props);
        this.maxId = this.state.data.length+1;
    }

    deleteItem = (id) => {
        const index =  this.state.data.findIndex(elem => elem.id === id);
        this.setState( ({data})=>{
            const newArr = [...data.slice(0,index),...data.slice(index+1)];
            return {
                data: newArr
            }
        }); 
    }


    addItem = (text) =>{
        const newItem = {
            label: text,
            important: false,
            id: ++this.maxId
        }

        this.setState(({data})=>{
            const newArr = [...data, newItem];
            return {
                data:newArr
            }
        });
    }

    onToggleImportant = (id)=>{
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, important: !old.important};

            const newArr = [...data.slice(0,index), newItem,...data.slice(index+1)];

            return {
                data:newArr
            }
        });
    }

    onToggleLiked = (id)=>{
        this.setState(({data})=>{
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, like: !old.like};

            const newArr = [...data.slice(0,index), newItem,...data.slice(index+1)];

            return {
                data:newArr
            }
        });
    }


    searchPost = (items, term) =>{
        if(term.length ===0){
            return items
        }

        return items.filter((item)=>{
            return item.label.indexOf(term) > -1
        });
    }

    onUpdateSearch = (term) =>{
        this.setState({term});
    }


    filterPost = (items, filter)=>{
        if(filter === 'like'){
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onFilterSelect = (filter)=>{
        this.setState({filter});
    }

    render() {  

        const liked = this.state.data.filter(item => item.like).length;
        const allPosts = this.state.data.length;
        const visiblePost = this.filterPost(this.searchPost(this.state.data,this.state.term), this.state.filter)

                return (
                    <div className="app">
                        <AppHeader 
                            liked={liked}
                            allPosts={allPosts}
                        />
                        <div className="search-panel d-flex">
                            <SearchPanel
                                onUpdateSearch={this.onUpdateSearch}
                                
                            />
                            <PostStatusFilter
                                filter={this.state.filter}
                                onFilterSelect={this.onFilterSelect}
                            /> 
                        </div>
                        <PostList 
                        posts={visiblePost} 
                        onDelete={this.deleteItem}
                        onToggleImportant={this.onToggleImportant}   
                        onToggleLiked={this.onToggleLiked}   
                        />
                        <PostAddForm onAdd={this.addItem}/>
                    </div>
                )
            }
}

