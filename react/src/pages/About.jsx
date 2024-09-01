import React, { useState } from 'react'
import Layout from '../components/layout'
import { Calendar } from 'primereact/calendar'

const About = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  console.log(selectedDates[0])

  return (
<>
<Layout>
    <h1>i am about page</h1>
    <Calendar value={selectedDates} onChange={(e) => setSelectedDates(e.value)} selectionMode="range" readOnlyInput hideOnRangeSelection />
</Layout>

</>

)
}

export default About