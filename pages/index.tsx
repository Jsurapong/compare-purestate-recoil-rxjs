import type { NextPage } from "next";
import { useEffect, useState } from "react";

import { User, initState } from "../modules/pureState/service/api";

const user = new User();

const Home: NextPage = () => {
  const [, setState] = useState(initState);

  useEffect(() => {
    user.init(setState);
    user.fetch(null);
  }, []);

  return (
    <div>
      <button onClick={() => user.form.selectedId(null)}>Create</button>

      <div style={{ padding: "0 0 50px 0" }}>
        <b>Form</b>
        <br />
        title:{" "}
        <input
          onChange={(e) => user.form.onChange("title", e.target.value)}
          value={user.state.form.data.title}
        />
        <br />
        author:{" "}
        <input
          onChange={(e) => user.form.onChange("author", e.target.value)}
          value={user.state.form.data.author}
        />
        <br />
        <button onClick={() => user.submit()}>Submit</button>
      </div>
      <table width="500px" style={{ border: "1px solid" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid" }}>Title</th>
            <th style={{ border: "1px solid" }}>Author</th>
            <th style={{ border: "1px solid" }}></th>
          </tr>
        </thead>
        <tbody>
          {user.state?.list?.map((item) => {
            return (
              <tr key={item?.id}>
                <td style={{ border: "1px solid" }}> {item?.title}</td>
                <td style={{ border: "1px solid" }}>{item?.author}</td>
                <td style={{ border: "1px solid" }}>
                  <button
                    onClick={() => {
                      user.form.selectedId(item?.id);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => user.delete(item?.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <pre style={{ width: 500 }}> {JSON.stringify(state, null, 2)}</pre> */}
    </div>
  );
};

export default Home;
