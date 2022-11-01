import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import Image from "next/image"

export default function SearchBar(props) {
  const handleOnSearch = (string, results) => {
    // onSearch will have as the  first callback parameter
    // the string searched and for the second the results.
    //console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
  //  console.log(result)
  }

  const handleOnSelect = (item) => {
    // the item selected
    console.log("you selected ", item.Model)
    item.quantity = 1
    props.setTableData(current => [...current, item]) 
  }

  const handleOnFocus = () => {
    //console.log('Focused')
  }

  const formatResult = (item) => {
    //console.log(item)
    return (
      <div className="flex flex-row ">
        <Image className="mx-auto rounded-lg border-4 border-pata-500"
          src={item.Image}
          alt="Picture of the matos"
          width={50}
          height={50}
        />
        <div className="flex-column">
          <span className="block align-left ml-3 text-lg font-medium" /*style={{ display: 'block', textAlign: 'left' }}*/>{item.Model}</span>
          <span className="block align-left ml-3 flex-column leading-tight font-bold  ">{item["Weight (Metric)"]}</span>
        </div>
      </div>
    )
  }

return (
	<div className="first:pt-10 first:z-10" style={{ width: 500, /*margin: 'auto'*/}}>
      <ReactSearchAutocomplete        
        items={props.items}
        fuseOptions={{ keys: ["_id", "Model"] }}
        resultStringKeyName="Model"
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        disablePortal
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