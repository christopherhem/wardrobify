import React from 'react';

class ShoeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bins: [],
      manufacturer: '',
      name: '',
      color: "",
      bin: ''
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleBinChange = this.handleBinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    const value = event.target.value;
    this.setState({ name: value })
  }

  handleManufacturerChange(event) {
    const value = event.target.value;
    this.setState({ manufacturer: value });
  }

  handleColorChange(event) {
    const value = event.target.value;
    this.setState({ color: value });
  }

  handleBinChange(event) {
    const value = event.target.value;
    this.setState({ bin: value })
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };
    delete data.bins;

    const shoeUrl = 'http://localhost:8080/api/shoes/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(shoeUrl, fetchConfig);
    if (response.ok) {
      this.state.submitted = true;

      const cleared = {
        manufacturer: '',
        name: '',
        bin: '',
      };
      this.setState(cleared);
    }
  }

  async componentDidMount() {
    const url = "http://localhost:8100/api/bins/";
    const response = await fetch(url);
    this.state = {
      bins: [],
    }
    if (response.ok) {
      const data = await response.json();
      this.setState({ bins: data.bins });
    }
  }


  render() {
    let spinnerClasses = 'd-flex justify-content-center mb-3';
    if (this.state.bins.length > 0) {
      spinnerClasses = 'd-flex justify-content-center mb-3 d-none';
    }

    let alertClasses = "alert alert-success d-none mb-0";
    let formClasses = "";
    if (this.state.submitted === true) {
      alertClasses = "alert alert-success mb-0";
      formClasses = "d-none";
    }
    return (
      <div className="row">
        <div className="col col-sm-auto">
          <img width="300" alt="" className="bg-white rounded shadow d-block mx-auto mb-4" src="/logo.svg" />
        </div>
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <form onSubmit={this.handleSubmit} id="create-shoe-form" className={formClasses}>
                <h1 className="card-title">It's Shoe Time!</h1>
                <p className="mb-3">
                  Please create a shoe.
                </p>
                <div className={spinnerClasses} id="loading-bins-spinner">
                  <div className="spinner-grow text-secondary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
                <p className="mb-3">
                  See if its working
                </p>
                <div className="row">
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleNameChange} value={this.state.name} placeholder="Your shoe name"  required type="text" id="name" name="name"
                        className="form-control" />
                      <label htmlFor="name">Your shoe name</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleColorChange} value={this.state.color} placeholder="Your shoe color"  required type="text" id="color" name="color"
                        className="form-control" />
                      <label htmlFor="name">Your shoe color</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating mb-3">
                      <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} required placeholder="Manufacturer" type="text" id="manufacturer" name="manufacturer"
                        className="form-control" />
                      <label htmlFor="manufacturer">Manufacturer</label>
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                        <select onChange={this.handleBinChange} value={this.state.bin} required id="bin" name="bin" className="form-select">
                        <option value="">Choose a closet</option>
                        {this.state.bins.map(bin => {
                            return(
                                <option value={bin.href} key={bin.href}>
                                    {bin.closet_name}
                                </option>
                            )
                        })}
                        </select>
                    </div>
                </div>
                <button className="btn btn-lg btn-primary">Submit!</button>
              </form>
              <div className={alertClasses} id="success-message">
                Congratulations! Your shoe is created!
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ShoeForm;
