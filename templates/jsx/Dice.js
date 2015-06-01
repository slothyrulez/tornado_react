/*** @jsx React.DOM */

var Dice = React.createClass({
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
            pips.push(<span className="pip"></span>);
        }
        if (this.props.data == 4) {
            return(
                <div className="dice">
                    <div className={dice_classname}>
                        <div className="column">
                            <span className="pip"></span>
                            <span className="pip"></span>
                        </div>
                        <div className="column">
                            <span className="pip"></span>
                            <span className="pip"></span>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.data == 6) {
            return(
                <div className="dice">
                    <div className={dice_classname}>
                        <div className="column">
                            <span className="pip"></span>
                            <span className="pip"></span>
                            <span className="pip"></span>
                        </div>
                        <div className="column">
                            <span className="pip"></span>
                            <span className="pip"></span>
                            <span className="pip"></span>
                        </div>
                    </div>
                </div>
            );
        } else if (this.props.data == 5) {
            return(
                <div className="dice">
                    <div className={dice_classname}>
                        <div className="column">
                            <span className="pip"></span>
                            <span className="pip"></span>
                        </div>
                        <div className="column">
                            <span className="pip"></span>
                        </div>
                        <div className="column">
                            <span className="pip"></span>
                            <span className="pip"></span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return(
                <div className="dice">
                    <div className={dice_classname}>
                        {pips}
                    </div>
                </div>
            );
        }
    }
});

var DiceBox = React.createClass({
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
            <div className="dice-box">
                <div className="dice-throw">
                    <button onClick={this.handleDiceThrow}>Throw dice!</button>
                </div>
                <Dice data={this.state.number} />
            </div>
        );
    }
});

React.render(
    <DiceBox url="api/dice" />,
    document.getElementById('diceBox')
)
