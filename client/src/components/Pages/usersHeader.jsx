import React from 'react'
import{Link} from 'react-router-dom'

export default function userHeader() {
  return (
    <div>
      
      <nav class="nav nav-pills nav-fill  pink">
  <Link class="nav-item nav-link btn btn-outline" to="#">Home</Link >
  <Link class="nav-item nav-link btn btn-outline" to="/projects">Project Topics</Link >
  <Link  class="nav-item nav-link btn btn-outline" to={`/dashboard`}>Dashboard</Link>
  <Link  class="nav-item nav-link btn btn-outline" to=''> Setting</Link>
</nav>

    </div>
  )
}
