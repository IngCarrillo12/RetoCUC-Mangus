import React from 'react'
import { Timeline } from '../components/TimeLine'
import '../style/CourseDetail.css'
export const CourseDetail = () => {
  return (
    <div className='modal'>
        <div className='container-CourseDetail'>
            <div className='CourseDetail-header'>
                <h1>TITLE</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consequatur porro earum quasi, enim amet laboriosam, quo officiis blanditiis sit perspiciatis itaque facere quae eius corporis optio. Nulla, minus ducimus?</p>
            </div>
            <div className='CourseDetail-stat'>
                <ul className='stat-info'>
                    <li>Duracion</li>
                    <li>Unidades</li>
                    <li>Lecciones</li>
                </ul>
                <Timeline/>
            </div>
        </div>
    </div>
  )
}
