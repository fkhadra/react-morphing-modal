import * as React from 'react';

const baseUrl = 'https://github.com/fkhadra/';

const Projects: React.FC = () => (
  <section className="projects">
    <article>
      <h2>React-Toastify</h2>
      <a href={baseUrl + 'react-toastify'} target="__blank">
        <img
          src="https://user-images.githubusercontent.com/5574267/35336500-e58f35b6-0118-11e8-800b-2da6594fc700.gif"
          alt="react-toastify"
        />
      </a>
    </article>
    <article>
      <h2>React-Contexify</h2>
      <a href={baseUrl + 'react-contexify'} target="__blank">
        <img
          src="https://user-images.githubusercontent.com/5574267/29753912-43c54008-8b7b-11e7-9627-258fde1ffddd.gif"
          alt="react-contexify"
        />
      </a>
    </article>
    <article>
      <h2>React-On-Screen</h2>
      <a href={baseUrl + 'react-on-screen'} target="__blank">
        <img
          src="https://user-images.githubusercontent.com/5574267/32147681-74918d80-bceb-11e7-98d4-1cbc04b29eb4.gif"
          alt="react-on-screen"
        />
      </a>
    </article>
  </section>
);

export { Projects };
