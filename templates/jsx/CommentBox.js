/*** @jsx React.DOM */

// COMMENT BOX
    // COMMENT LIST
        // COMMENT
    // COMMENT FORM

/*var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];*/

var Comment = React.createClass({
    render : function(){
        var rawMarkup = marked(this.props.children.toString(), {sanitize:true});
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
            </div>
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
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Your name" ref="author"/>
                <input type="text" placeholder="Say something..." ref="text"/>
                <input type="submit" value="Post" />
            </form>
        );
    }
});

var CommentList = React.createClass({displayName: "CommentList",
    render : function(){
        var commentNodes = this.props.data.map(function(comment){
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: []};
    },
    handleCommentSubmit: function(comment) {
        // TODO: submit to the server and refresh the list
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
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data}/>
                <CommentForm />
            </div>
        );
    }
});

React.render(
    <CommentBox url="api/comments" poll_interval={200}/>,
    document.getElementById('comments')
)



