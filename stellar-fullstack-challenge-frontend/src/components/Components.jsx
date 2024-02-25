const CancelButton = (handler) => (
  <button onClick={handler} type="reset" className="button-main">
    cancel
  </button>
);
const Button = (name, handler) => (
  <button onClick={handler} className="button-main">
    {name}
  </button>
);
export const components = { CancelButton, Button };
