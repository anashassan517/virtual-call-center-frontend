import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSpecificCase } from 'src/apis/cases';

const CaseDetailsPage = () => {
  const { id } = useParams();
  const [caseDetails, setCaseDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseDetails = async () => {
      try {
        const data = await getSpecificCase(id);
        setCaseDetails(data.case); // Assuming the case data is returned as "case" property
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {caseDetails && (
        <div>
          <h2>Case Details</h2>
          <p>Name: {caseDetails.name}</p>
          <p>City: {caseDetails.city}</p>
          <p>Engineering Field: {caseDetails.engineering_field}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default CaseDetailsPage;


// const CaseDetailsPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [caseDetails, setCaseDetails] = useState(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const response = await getspecificCase(id); // Fetch case details using the ID
//         setCaseDetails(response.data); // Update state with case details
//         console.log('response:', response);
//         console.log('Case details:', response.data);
//       } catch (error) {
//         console.error('Error fetching case details:', error);
//       }
//     };

//     if (id) {
//       fetchDetails(); // Fetch details when ID is available
//     }
//   }, [id]);

//   if (!caseDetails) {
//     return <div>Loading...</div>; // Render loading indicator while fetching details
//   }

//   return (
//     <div>
//       <h1>Case Details</h1>
//       <p>ID: {caseDetails.id}</p>
//       <p>Name: {caseDetails.name}</p>
//       {/* Render other details of the case */}
//     </div>
//   );
// };

// export default CaseDetailsPage;
