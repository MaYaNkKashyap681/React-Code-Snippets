const NewComp = (props) => {
  return <>
   <div style = {{backgroundColor: "green"}}>{props.renderComponent({name: "Mayank"})}</div>
  </>;
};

function Hello2() {
  return (
    <>
      <NewComp
        renderComponent={({ name }) => (
          <div>
            <h1>Hello2 {name}</h1>
          </div>
        )}
      />
      <h1>Hello</h1>
    </>
  );
}

export default Hello2;
