import React from 'react'
import { Table } from 'react-bootstrap'
const HomePage = () => {
  return (
    <div className='container flex-col'>
      <span className='primary-text'>
        Here are few tips to help you with the Markdown Syntax.
      </span>

      <table className='home-table'>
        <thead>
          <tr>
            <th>
              <span className='secondary-heading'>Element</span>
            </th>
            <th>
              <span className='secondary-heading'>Markdown Syntax</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <span className='primary-text'>Heading</span>
            </td>

            <td>
              <span className='primary-text'># H1 ## H2 ### H3</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Bold</span>
            </td>
            <td>
              <span className='primary-text'>**bold text**</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Italic</span>
            </td>
            <td>
              <span className='primary-text'>*italicized text*</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Blockquote</span>
            </td>
            <td>
              <span className='primary-text'> > blockquote</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Ordered List</span>
            </td>
            <td>
              <span className='primary-text'>
                1. First item <br /> 2. Second item
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Unordered List</span>
            </td>
            <td>
              <span className='primary-text'>
                - First item
                <br />- Second item
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Code</span>
            </td>
            <td>
              <span className='primary-text'>`code`</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Horizontal Rule</span>
            </td>
            <td>
              <span className='primary-text'>---</span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Link</span>
            </td>
            <td>
              <span className='primary-text'>
                [title](https://www.example.com)
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <span className='primary-text'>Image</span>
            </td>
            <td>
              <span className='primary-text'>![alt text](image.jpg)</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default HomePage
