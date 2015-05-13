/*** @jsx React.DOM */

var FilteredList = React.createClass({displayName: "FilteredList",
    filterList: function(event){
        var updatedList = this.state.initialItems;
        updatedList = updatedList.filter(function(item){
            return item.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({items: updatedList});
    },
    getInitialState: function(){
        return {
            initialItems: [
                "Sweden",
                "China",
                "Peru",
                "Czech Republic",
                "Bolivia",
                "Latvia",
                "Samoa",
                "Armenia",
                "Greenland",
                "Cuba",
                "Western Sahara",
                "Ethiopia",
                "Malaysia",
                "Argentina",
                "Uganda",
                "Chile",
                "Aruba",
                "Japan",
                "Trinidad and Tobago",
                "Italy",
                "Cambodia",
                "Iceland",
                "Dominican Republic",
                "Turkey",
                "Spain",
                "Poland",
                "Haiti"
            ],
            items:[]
        }
    },
    componentWillMount: function(){
        this.setState({ items: this.state.initialItems })
    },
    render: function(){
        return (
            React.createElement("div", {className: "filter-list"}, 
                React.createElement("input", {type: "text", placeholder: "Search", onChange: this.filterList}), 
            React.createElement(List, {items: this.state.items})
            )
        );
    }
});

var List = React.createClass({displayName: "List",
    render: function(){
        return (
            React.createElement("ul", null, 
                
                    this.props.items.map(function(item) {
                        return React.createElement("li", {key: item}, item)
                    })
                
            )
        )
    }
});
React.render(React.createElement(FilteredList, null), document.getElementById("search"));
