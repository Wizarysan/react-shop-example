var PRODUCTS = [
  {category: 'PC Laptop', price: 379, img: 'toshi1.jpg', stocked: true, name: 'Toshiba - Satellite 15.6" Touch-Screen Laptop - Intel Core i3 - 6GB Memory - 1TB Hard Drive - Brushed Black', scrsize: '15.6', touch: true, hdmi: true, onsale: false},
  {category: 'PC Laptop', price: 279, img: 'hp1.jpg', stocked: true, name: 'HP - 15.6" Laptop - AMD A6-Series - 4GB Memory - 500GB Hard Drive - Black', scrsize: '15.6', touch: true, hdmi: true, onsale: false},
  {category: 'PC Laptop', price: 179, img: 'len1.jpg', stocked: true, name: 'Lenovo - 15.6" Laptop - AMD E1-Series - 4GB Memory - 500GB Hard Drive - Black', scrsize: '15.6', touch: true, hdmi: false, onsale: false},
  {category: 'PC Laptop', price: 229, img: 'dell1.jpg', stocked: false, name: 'Dell - Inspiron 14" Laptop - Intel Celeron - 2GB Memory - 32GB eMMC Flash Memory - Black', scrsize: '14', touch: false, hdmi: true, onsale: false},
  {category: 'PC Laptop', price: 426, img: 'asus1.jpg', stocked: true, name: 'Asus - 15.6" Laptop - Intel Core i5 - 6GB Memory - 1TB Hard Drive - Black/Silver', scrsize: '15.6', touch: true, hdmi: true, onsale: true},
  {category: 'PC Laptop', price: 399, img: 'hp2.jpg', stocked: false, name: 'HP - 17.3" Laptop - AMD A10-Series - 6GB Memory - 1TB Hard Drive - Black', scrsize: '17.3', touch: false, hdmi: false, onsale: true},
  {category: 'MacBooks', price: 999, img: 'mac1.jpg', stocked: true, name: 'Apple - MacBook® - 12" Display - Intel Core M - 8GB Memory - 256GB Flash Storage - Gold', scrsize: '12', touch: false, hdmi: true, onsale: false},
  {category: 'MacBooks', price: 949, img: 'mac1.jpg', stocked: true, name: 'Apple - MacBook Air® (Latest Model) - 13.3" Display - Intel Core i5 - 4GB Memory - 128GB Flash Storage - Silver', scrsize: '13.3', touch: true, hdmi: true, onsale: true},
  {category: 'MacBooks', price: 1999, img: 'mac2.jpg', stocked: true, name: 'Apple - MacBook® Pro - 15.4" Display - Intel Core i7 - 16GB Memory - 256GB Flash Storage - Silver', scrsize: '15.4', touch: true, hdmi: true, onsale: false},
  {category: 'MacBooks', price: 1799, img: 'mac2.jpg', stocked: true, name: 'Apple - MacBook Pro with Retina display (Latest Model) - 13.3" Display - 8GB Memory - 512GB Flash Storage - Silver', scrsize: '13.3', touch: true, hdmi: false, onsale: false},
  {category: 'MacBooks', price: 1499, img: 'mac1.jpg', stocked: false, name: 'Apple - MacBook Air® (Latest Model) - 13.3" Display - Intel Core i5 - 4GB Memory - 256GB Flash Storage - Silver', scrsize: '13.3', touch: false, hdmi: true, onsale: true}
];

var priceSlider = document.getElementById('price_slider'),
	priceMin = document.getElementById('price_slider__min'),
	priceMax = document.getElementById('price_slider__max'),
	maxPrice = PRODUCTS.map((product) => product.price).reduce((x,y) => (x > y) ? x : y);

noUiSlider.create(priceSlider, {
	start: [ 0, maxPrice ],
	connect: true,
	step: 1,
	range: {
		'min': 0,
		'max': maxPrice
	},
	format: {
	  to: function ( value ) {
		return value;
	  },
	  from: function ( value ) {
		return value;
	  }
	}
});

const Category = React.createClass ({
	render(){
		return (
			<h3 className="items__category">{this.props.category}</h3>
			);
	}
});    	

const Product = React.createClass ({
	render(){
		var stocked;
		var sale;
		if (!this.props.product.stocked) {
			stocked = <span className="product__stock">Out of stock</span>
		}
		if (this.props.product.onsale) {
			sale = <span className="product__sale">Sale!</span>;
		}
		return (
			<div className="product">
				<span className="product__name">{this.props.product.name}</span>
				<img className="product__img" src={"img/" + this.props.product.img} />
				<div className="product__priceblock">
					<span className="product__price">${this.props.product.price}</span>
					{sale}
					{stocked}	    					
				</div>
			</div>
		);    		
	}
});    	

const ProductList = React.createClass ({
	render(){
	    var rows = [];
	    var lastCategory = null;
        this.props.products.forEach(function(product) {
   	      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStock) 
   	      	|| (!product.onsale && this.props.onSale) || (product.price < this.props.minPrice || product.price > this.props.maxPrice)) {
	        return;
	      }
	      if (product.category !== lastCategory) {
	        rows.push(<Category category={product.category} key={product.category} />);
	      }
	      rows.push(<Product product={product} key={product.name} />);
	      lastCategory = product.category;
		}.bind(this));
		return (
			<div className="items">
				{rows}
			</div>
			);
	}
});    	

const SearchBar = React.createClass({
  handleChange() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked,
      this.refs.onSale.checked,
      parseInt(priceMin.value),
      parseInt(priceMax.value)
    );
  },
  componentDidMount() {
  	var componentThis = this;
	priceSlider.noUiSlider.on('update', function ( values, handle ) {
		if ( handle ) {
			priceMax.value = Math.round(values[handle]);
		} else {
			priceMin.value = Math.round(values[handle]);
		}
		componentThis.handleChange();				
	});
	//Цены влияют на слайдер
	priceMax.onchange = function (){				
			priceSlider.noUiSlider.set([null, this.value])
	};			
	priceMin.onchange = function (){
			priceSlider.noUiSlider.set([this.value, null])
	};

	document.getElementById('external_controls').appendChild(document.getElementById('price_slider_wrap'));
  },
  render() {
    return (
      <div className="controls">
      	<div id="external_controls"></div>
      	<span className="controls__caption">Search by name:</span>
        <input type="text" className="controls__search controls__textinput" placeholder="Search..." value={this.props.filterText} ref="filterTextInput"
  		onChange={this.handleChange}  />
  		<div className="filters">
  			<span className="controls__caption">Filters:</span>
  			<div className="filter">
	          <input className="filter__checkbox" id="filter__stock" type="checkbox" checked={this.props.inStock} ref="inStockOnlyInput"
      			onChange={this.handleChange}/>
	        	<label htmlFor="filter__stock">In stock</label>
	        </div>  
	        <div className="filter">  
	          <input className="filter__checkbox" id="filter__sale" type="checkbox" checked={this.props.onSale} ref="onSale"
      			onChange={this.handleChange}/>
      			<label htmlFor="filter__sale">Sale item</label>
	        </div>  
        </div>
      </div>
    );
  }
});

const FilterList = React.createClass ({
	getInitialState(){
		return {
			filterText: '',
			inStock: false,
			onSale: false,
			minPrice: 0,
			maxPrice: maxPrice
		};
	},
	handleUserInput(filterText, inStock, onSale, minPrice, maxPrice) {
	    this.setState({
	      filterText: filterText,
	      inStock: inStock,
	      onSale: onSale,
	      minPrice: minPrice,
	      maxPrice: maxPrice
	    });
	  },
	render(){
	    return (
	      <div>
	      	<SearchBar 
	        filterText={this.state.filterText}
  			inStock={this.state.inStock} 
  			onSale={this.state.onSale}
  			onUserInput={this.handleUserInput} />
	        <ProductList 
	        products={this.props.products} 
	        filterText={this.state.filterText}
	        inStock={this.state.inStock}
	        onSale={this.state.onSale}
	        minPrice={this.state.minPrice}
	        maxPrice={this.state.maxPrice} />
	      </div>
	    );
	}
});

ReactDOM.render(
  <FilterList products={PRODUCTS} />,
  document.getElementById('content')
);
