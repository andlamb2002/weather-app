import React, { useEffect, useState } from 'react'

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setData(data.message))
  });

  return (
    <div>
      {data}
    </div>
  )
}

export default App