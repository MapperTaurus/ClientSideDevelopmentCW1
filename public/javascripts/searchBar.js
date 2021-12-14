
console.log("Script running JAVASCRIPT2 fiona...");


class SearchBar extends Component {
    handleFilterTextChange = (e) =>{
        this.props.onFilterTextChange(e.target.value)
    };
    render() {
        return (
            <form>
                <input
                className="form-control"
                style={{width:"50%"}}
                type="text"
                placeholder="Search..."
                value={this.props.filterText}
                onChange={this.handleFilterTextChange}
                />
            </form>
        );
    }
}
export default SearchBar