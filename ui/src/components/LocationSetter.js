import React from 'react';

class LocationSetter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            location: null,
          }
          this.handleChange = this.handleChange.bind(this);  
          this.handleClick = this.handleClick.bind(this)
      }
  
  
    
    handleChange(e) {
        this.setState({ location: e.target.value });
    }

    handleClick(e) {
         
        this.props.onClick(this.state.location);
    }

    render(){
        // const [show, setShow] = useState(false);
    
        // const handleClose = () => setShow(false);
        // const handleShow = () => setShow(true);
    
        return (
            <div>
                <div className="input-group mb-3 col-md-6 offset-md-3">
                    <input className="form-control col-md-8"  id="locationField" type="text" onChange={ this.handleChange}></input>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#locationModal" onClick={this.handleClick}>
                                    Set Location
                                    </button>
                    </div>
                </div>
            
            
             
           
          </div>
        );
    }
}
  
export default LocationSetter;
 