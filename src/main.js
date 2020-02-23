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
		    }

	handleOnTableClick(id) {  this.setState( { selected_id : id } ); }

	componentDidMount()
	{
	    let res = [];
	    fetch('https://jsonplaceholder.typicode.com/users')
		.then( response => response.json() )
		.then( json => { 
				   
				   json.map( (r) => { res.push(
													{	user_id: r.id, 
														name: r.name,
														user_name: r.username,
														email: r.email,
														website: r.website
													}
							      			  );
						    		}
					   		);
				   this.setState( { rows: res } )
				}
				
		     )
		.catch( error => this.setState( { rows: [{ user_id: null, name: "Ошибка загрузки данных https://jsonplaceholder (" + error + ")", user_name: null, email: null, website: null }] } ) );

		ReactDOM.render(<FiltrPanel 
									onResetFiltrs={this.onResetFiltrs}  
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
		document.getElementById("filtr_by_name").label = "234234324";
		document.getElementById("filtr_by_web").value = "********";
	}		 
}

export default Main