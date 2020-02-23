import React, {Component} from "react"
import ReactDOM from 'react-dom'; 
import MyTable from './table'
import FiltrPanel from './filtr_panel'


class Main extends Component 
{
	constructor()
			{
				super()
				this.state = {
								users_data: [],
								rows:   [
											{ 
												user_id: 333,
												name: 'Загрузка данных https://jsonplaceholder ...',
												user_name: '',
												email: '',
												website: ''
											}
										],
								selected_id: null,
								handleOnClick: this.handleOnTableClick
				     }
				this.handleOnTableClick = this.handleOnTableClick.bind(this)
				this.onResetFiltrs = this.onResetFiltrs.bind(this)
				this.onApplyFiltrs = this.onApplyFiltrs.bind(this)
				
		    }
		
	result_request = [];
	handleOnTableClick(id) {  this.setState( { selected_id : id } ); }
	

	componentDidMount()
	{
	    fetch('https://jsonplaceholder.typicode.com/users')
		.then( response => response.json() )
		.then( json => { 
				   
				   json.map( (r) => { return this.result_request.push(
													{	
														user_id: r.id, 
														name: r.name,
														user_name: r.username,
														email: r.email,
														website: r.website
													}
							      			  );
						    		}
					   		);
				   this.setState( { rows: this.result_request } )
				}
				
		     )
		.catch( error => this.setState( { rows: [{ user_id: null, name: "Ошибка загрузки данных https://jsonplaceholder (" + error + ")", user_name: null, email: null, website: null }] } ) );

		ReactDOM.render(<FiltrPanel 
									onResetFiltrs={this.onResetFiltrs}
									onApplyFiltrs={this.onApplyFiltrs}
																		/>, document.querySelector('#filtr'));
	}

	render()
		 {
			return (
						<MyTable 
							data={this.state}
							handleOnClick={this.handleOnTableClick}
						/>
				)
			 }
			 
	onResetFiltrs()
	{
		document.getElementById("filtr_by_name").value = "";
		document.getElementById("filtr_by_web").value = "";
		this.setState( { rows: this.result_request } )
	}
	onApplyFiltrs()
	{
		var filtrByName = document.getElementById("filtr_by_name").value.toLowerCase();
		var filtrBySite = document.getElementById("filtr_by_web").value.toLowerCase();
		/*if(!filtrByName && !filtrBySite)  
		{
			alert("необходимо указать фильтры!");
			return;
		}*/
		
		this.setState( { rows: this.result_request.filter( item => { return (!filtrByName || item.user_name.toLowerCase().indexOf(filtrByName) >=0 ) && 
																			(!filtrBySite || item.website.toLowerCase().indexOf(filtrBySite) >=0) 
																   }
														 ) 
					   } 
					 )
	}			 
}

export default Main