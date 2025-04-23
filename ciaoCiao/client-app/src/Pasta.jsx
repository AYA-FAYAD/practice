// const Pasta = (prob) => {
//     return React.createElement("div", {}, [
//       React.createElement("h1", {}, prob.name),
//       React.createElement("p", {}, prob.description),
//     ]);
//   };

const Pasta = (prob) => {
  return (
    <div className="pizza">
      <h1>{prob.name}</h1>
      <p>{prob.description}</p>
    </div>
  );
};
export default Pasta;
