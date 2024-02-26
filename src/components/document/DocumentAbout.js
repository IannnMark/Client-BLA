import React from 'react';
import "./DocumentIndex.css";


const SchoolDocuments = () => {
  const documents = [
    { id: 1, name: 'Certificate of Honor', description: 'is a formal document or award presented to an individual or group in recognition of their outstanding achievements, exemplary behavior, or significant contributions. This type of certificate is often given as a token of appreciation, respect, or acknowledgment of someone dedication, hard work, or exceptional service in a particular field or context.' },
    { id: 2, name: 'Certificate of Enrollment', description: 'is a document issued by an educational institution to confirm that a student is currently enrolled in a specific program or course of study. It serves as official proof of a student\'s registration and can be used for various purposes, such as visa applications, insurance requirements, or verification of student status for academic or employment purposes.' },
    { id: 3, name: 'Certificate of Good Moral', description: ' is an official document issued by an organization, school, or authority that attests to an individual\'s positive ethical standing and behavior. This certificate is often required for various purposes, such as employment, education, professional licensing, and legal matters.' },
    { id: 4, name: 'Certificate of Grades', description: ' also known as a Grade Certificate or Academic Transcript, is an official document issued by an educational institution that provides a detailed record of a student\'s academic performance. This document typically includes a list of courses taken, grades received for each course, and other relevant academic information.' },
    { id: 5, name: 'Certificate of Form 137', description: '  is an official document issued by an educational institution, typically a high school, that provides a detailed record of a student\'s academic achievements and grades. The term "Form 137" is commonly used in the Philippines to refer to the Permanent Record of a student. This document contains essential information about a student\'s academic history throughout their high school years.' },
    { id: 6, name: 'Certificate of Unsettled Account', description: 'It typically includes details such as the total amount due, a breakdown of unpaid fees, and instructions on how to make the necessary payments. This document may be required for various purposes, including obtaining academic records or participating in graduation ceremonies.' },
    // Add more documents with descriptions as needed
  ];

  return (
    <div>

      <br />
      <h1 className='school-text'>School Documents Information</h1>
      <ul>
        {documents.map((document) => (
          <li key={document.id}>
            <strong>{document.name}</strong>
            <p>{document.description}</p>
          </li>
        ))}
      </ul>



    </div>
  );
};

export default SchoolDocuments;