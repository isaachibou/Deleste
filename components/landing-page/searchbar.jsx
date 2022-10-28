import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function SearchBar(props) {
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
  //  console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log("ITEM", item)
    props.setTableData(current => [...current, item]) 
  }

  const handleOnFocus = () => {
    //console.log('Focused')
  }

  const formatResult = (item) => {
    //console.log(item)
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.Model}</span>
        <span style={{ display: 'block', textAlign: 'left' }}>id: {item._id}</span>
      </>
    )
  }

return (
	<div style={{ width: 400}}>
      <ReactSearchAutocomplete        
        items={props.items}
        fuseOptions={{ keys: ["_id", "Model"] }}
        resultStringKeyName="Model"
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        styling={
          {
            "backgroundColor": "rgb(85,96,116)",
            "opacity" : "0,3",
          }
        }
      />
    </div>
 );
}	