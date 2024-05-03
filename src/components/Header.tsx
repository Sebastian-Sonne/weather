

const Header = () => {

    return (
        <div className="w-full h-12">
            <SearchBar />
        </div>
    );
}

export default Header

export const SearchBar = () => {

    const handleKeyDown = () => {

    }

    return (
        <div className="w-full lg:w-2/3 h-full mr-auto bg-primary rounded-xl">
            <input className="w-full h-full bg-transparent px-4 rounded-xl caret-white focus:outline-none" placeholder="Search for cities" onKeyDown={handleKeyDown} />
        </div>
    )
}