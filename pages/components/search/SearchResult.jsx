export const SearchResult = ({ name, symbol }) => {
  console.log(name);
  return (
    <div
      className="search-result "
      onClick={(e) => alert(`You selected ${name}!`)}
    >
      <div className="font-bold text-base">{name}</div>
      <p className="text-[14px]">{symbol}</p>
    </div>
  );
};
