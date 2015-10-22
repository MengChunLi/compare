var comp = React.createClass({
    getInitialState: function() {
        return {
          prodNm: '',
          travelDay: ''
        };
      },
    componentWillMount: function() {
        var prod = JSON.parse(document.getElementById('prodObj').getAttribute('data-prod'));
        console.log(prod);

        $.ajax({
          type: 'GET',
          url: prod[1].url,
          dataType: 'json', //specify jsonp
          success: function(data) {
            console.log(data);
            //var result = data[0];
            this.setState({
              username: data.prodNm,
              lastGistUrl: data.travelDay
            });
          }.bind(this),
          error: function(e) {
             console.log('error', e);
          }
        });

    },
    render: function() {
      return (
        <div className="left-side">
            <h1>{this.state.prodNm}</h1>
            <span>{this.state.travelDay}</span>
        </div>
      );
    }
});

module.exports = comp;
