/*** @jsx React.DOM */

// COMMENT BOX
    // COMMENT LIST
        // COMMENT
    // COMMENT FORM

/*var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];*/

var Comment = React.createClass({displayName: "Comment",
    render : function(){
        var rawMarkup = marked(this.props.children.toString(), {sanitize:true});
        return (
            React.createElement("div", {className: "comment"}, 
                React.createElement("h2", {className: "commentAuthor"}, 
                    this.props.author
                ), 
                React.createElement("span", {dangerouslySetInnerHTML: {__html: rawMarkup}})
            )
        );
    }
});

var CommentForm = React.createClass({
    displayName: "CommentForm",
    handleSubmit : function(e){
        e.preventDefault();
        var author = React.findDOMNode(this.refs.author).value.trim();
        var text = React.findDOMNode(this.refs.text).value.trim();
        if ( !text || !author) {
            return;
        }
        console.log(this.refs, this);
        React.findDOMNode(this.refs.author).value = "";
        React.findDOMNode(this.refs.text).value = "";
        return;
    },
    render : function(){
        return (
            React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
                React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
                React.createElement("input", {type: "text", placeholder: "Say something...", ref: "text"}), 
                React.createElement("input", {type: "submit", value: "Post"})
            )
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render : function(){
        var commentNodes = this.props.data.map(function(comment){
            return (
                React.createElement(Comment, {author: comment.author}, 
                    comment.text
                )
            );
        });
        return (
            React.createElement("div", {className: "commentList"}, 
                commentNodes
            )
        );
    }
});

var CommentBox = React.createClass({displayName: "CommentBox",
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer(), this.props.poll_interval);
    },
    loadCommentsFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render : function() {
        return (
            React.createElement("div", {className: "commentBox"}, 
                React.createElement("h1", null, "Comments"), 
                React.createElement(CommentList, {data: this.state.data}), 
                React.createElement(CommentForm, null)
            )
        );
    }
});

React.render(
    React.createElement(CommentBox, {url: "api/comments", poll_interval: 200}),
    document.getElementById('comments')
)



