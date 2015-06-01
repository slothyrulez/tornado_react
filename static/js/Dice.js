/*** @jsx React.DOM */

var Dice = React.createClass({displayName: "Dice",
    translate: function(){
        var _num2face = {
            1:"first-face",
            2:"second-face",
            3:"third-face",
            4:"fourth-face",
            5:"fifth-face",
            6:"sixth-face"
        }
        return _num2face[this.props.data];
    },
    render: function(){
        var dice_classname = this.translate();
        var pips = [];
        for (i=1;i<=this.props.data;i++){
            pips.push(React.createElement("span", {className: "pip"}));
        }
        if (this.props.data == 4) {
            return(
                React.createElement("div", {className: "dice"}, 
                    React.createElement("div", {className: dice_classname}, 
                        React.createElement("div", {className: "column"}, 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"})
                        ), 
                        React.createElement("div", {className: "column"}, 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"})
                        )
                    )
                )
            );
        } else if (this.props.data == 6) {
            return(
                React.createElement("div", {className: "dice"}, 
                    React.createElement("div", {className: dice_classname}, 
                        React.createElement("div", {className: "column"}, 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"})
                        ), 
                        React.createElement("div", {className: "column"}, 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"})
                        )
                    )
                )
            );
        } else if (this.props.data == 5) {
            return(
                React.createElement("div", {className: "dice"}, 
                    React.createElement("div", {className: dice_classname}, 
                        React.createElement("div", {className: "column"}, 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"})
                        ), 
                        React.createElement("div", {className: "column"}, 
                            React.createElement("span", {className: "pip"})
                        ), 
                        React.createElement("div", {className: "column"}, 
                            React.createElement("span", {className: "pip"}), 
                            React.createElement("span", {className: "pip"})
                        )
                    )
                )
            );
        } else {
            return(
                React.createElement("div", {className: "dice"}, 
                    React.createElement("div", {className: dice_classname}, 
                        pips
                    )
                )
            );
        }
    }
});

var DiceBox = React.createClass({displayName: "DiceBox",
    getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    getInitialState: function() {
        return { number: this.getRandomInt(1,7) };
    },
    handleDiceThrow: function() {
        this.loadThrowFromServer();
    },
    componentDidMount: function() {
        this.loadThrowFromServer();
    },
    loadThrowFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            contentType: "application/json",
            cache: false,
            success: function(data) {
                if (data.data == null){
                    data.data = 1;
                }
                this.setState({number: data.data});
                console.log(data);
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render : function() {
        return (
            React.createElement("div", {className: "dice-box"}, 
                React.createElement("div", {className: "dice-throw"}, 
                    React.createElement("button", {onClick: this.handleDiceThrow}, "Throw dice!")
                ), 
                React.createElement(Dice, {data: this.state.number})
            )
        );
    }
});

React.render(
    React.createElement(DiceBox, {url: "api/dice"}),
    document.getElementById('diceBox')
)
