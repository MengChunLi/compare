var React =  require('react');
var ReactDOM =  require('react-dom');
var Result = React.createFactory(require('./views/results/Result.jsx'));

ReactDOM.render( Result(), document.getElementById('container') );