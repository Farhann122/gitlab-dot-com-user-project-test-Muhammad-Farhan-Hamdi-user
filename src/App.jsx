import React from 'react';
import Header from './Component/Header';
import Banner from './Component/Banner';
import PostList from './Component/PostList';

function App() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Banner />
        <PostList />
      </main>
    </>
  );
}

export default App;
