import { ClientLoaderFunctionArgs, useLoaderData } from "@remix-run/react";
import { BE_PATH } from "constants";

export const clientLoader = async ({ params }: ClientLoaderFunctionArgs) => {
  // call the server loader
  const data = Number(params.count) ?? 100;
  // Return the data to expose through useLoaderData()
  return data;
};

const Page = () => {
  const count = useLoaderData<typeof clientLoader>();
  const url = new URL(`console/${count}`, BE_PATH).toString();

  function hundleClickGET() {
    console.log(url);
    fetch(url);
  }
  function hundleClickBeacon() {
    console.log(url);
    navigator.sendBeacon(url);
    window.location.href = `/count/${count + 1}`;

    // fetch(url);
  }

  function hundleClickfetch() {
    console.log(url);
    fetch(url);
    window.location.href = `/count/${count + 1}`;
  }

  function hundleClick() {
    window.location.href = `/count/${count + 1}`;
  }
  return (
    <div>
      <a href={`/count/${count + 1}`} onClick={() => fetch(url)}>
        aタグ
      </a>
      <button onClick={hundleClickBeacon}>Beacon</button>
      <br />
      <button onClick={hundleClickfetch}>FETCH</button>
      <br />
      <button onClick={hundleClickGET}>GET</button>
      <br />
      <button onClick={hundleClick}>push</button>
      <div>counter:{count}</div>
    </div>
  );
};

export default Page;
