var shortId = require('shortid');
var actions = require('../actions/CompareAction');

var i = 0;

function getLabelId(){
  i++;
  return 'addCompareBtn' + i;
}

var comp = React.createClass({

  getInitialState: function () {
    //console.log('getInitialState: '+ this.props.selected);
    return {defaultChecked: this.props.selected};
  },

  // componentWillMount: function() {
  //   //console.log('componentWillMount: '+ this.props.selected);
  //   this.setState({defaultChecked: this.props.selected});
  // },

  render: function() {
    var labelId = getLabelId();
    console.log('this.props.selected: ',this.props.selected);
    return (
      <div className="add-compare-btn">
        <input type="checkbox" className="css-checkbox addCompareBtn" name="addCompareBtn" id={labelId} checked={this.props.selected}  onChange={this.handleChange} />
        <label htmlFor={labelId} className="css-label">商品比較</label>
      </div>
    );
  },

  handleChange: function(event) {
    var item = this.props.prod;
    var selected = this.props.selected;

    console.log('item selected: ',item);
    this.setState({defaultChecked: event.target.checked});

    // 產生UID給array prop key 使用
    //item.uid = shortId.generate();
    //console.log(this.state.defaultChecked);
    if(event.target.checked){
      //item.selectedItem = item;
      actions.createItem( item );
    }else{
      //console.log('removeItem');
      //item.selectedItem = false;
      actions.removeItem( item );
    }
    //console.log('checked: ',evt.target.checked);
    //console.log(prod, 'selected: ' + selected);
  },

  noop: function(){}

});

module.exports = comp;